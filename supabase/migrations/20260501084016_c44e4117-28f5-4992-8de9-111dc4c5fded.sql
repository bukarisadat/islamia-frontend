-- 1. ROLES ENUM + USER_ROLES TABLE (security best practice: roles in separate table)
CREATE TYPE public.app_role AS ENUM ('admin', 'student');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 2. ADMIN SINGLETON — enforces only ONE admin
CREATE TABLE public.admin_singleton (
  id INT PRIMARY KEY DEFAULT 1,
  admin_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  claimed_at TIMESTAMPTZ,
  CONSTRAINT only_one_row CHECK (id = 1)
);

INSERT INTO public.admin_singleton (id) VALUES (1);

ALTER TABLE public.admin_singleton ENABLE ROW LEVEL SECURITY;

-- Trigger: prevent assigning admin role if one already exists
CREATE OR REPLACE FUNCTION public.enforce_single_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  existing_admin UUID;
BEGIN
  IF NEW.role = 'admin' THEN
    SELECT admin_user_id INTO existing_admin FROM public.admin_singleton WHERE id = 1;
    IF existing_admin IS NOT NULL AND existing_admin <> NEW.user_id THEN
      RAISE EXCEPTION 'Admin role already claimed. Only one administrator is permitted.';
    END IF;
    UPDATE public.admin_singleton
      SET admin_user_id = NEW.user_id, claimed_at = now()
      WHERE id = 1 AND admin_user_id IS NULL;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_enforce_single_admin
  BEFORE INSERT OR UPDATE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_single_admin();

-- 3. PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  date_of_birth DATE,
  gender TEXT,
  country TEXT,
  city TEXT,
  index_number TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. APPLICATIONS
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  date_of_birth DATE,
  gender TEXT,
  country TEXT,
  city TEXT,
  previous_education TEXT,
  languages TEXT,
  arabic_level TEXT,
  semester TEXT,
  motivation TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  application_code TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- 5. PAYMENTS
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  application_id UUID REFERENCES public.applications(id) ON DELETE SET NULL,
  paystack_reference TEXT UNIQUE NOT NULL,
  amount_kobo INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'GHS',
  payment_type TEXT NOT NULL,
  channel TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- 6. INDEX NUMBER GENERATOR — AMI/26/001 format
CREATE OR REPLACE FUNCTION public.generate_index_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  yy TEXT := to_char(now(), 'YY');
  next_seq INT;
BEGIN
  SELECT COALESCE(MAX(
    CAST(split_part(index_number, '/', 3) AS INT)
  ), 0) + 1
  INTO next_seq
  FROM public.profiles
  WHERE index_number LIKE 'AMI/' || yy || '/%';

  RETURN 'AMI/' || yy || '/' || lpad(next_seq::TEXT, 3, '0');
END;
$$;

-- 7. AUTO-CREATE PROFILE ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, whatsapp)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'whatsapp'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_applications_updated BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============= RLS POLICIES =============

-- USER_ROLES
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));
-- Allow anyone authenticated to insert their OWN role (used for first-admin claim and student role)
CREATE POLICY "Users can claim own role" ON public.user_roles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ADMIN_SINGLETON (read-only for everyone — write via trigger only)
CREATE POLICY "Anyone can read singleton" ON public.admin_singleton
  FOR SELECT USING (true);

-- PROFILES
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can update all profiles" ON public.profiles
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- APPLICATIONS
CREATE POLICY "Anyone can submit application" ON public.applications
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own applications" ON public.applications
  FOR SELECT USING (auth.uid() = user_id OR (user_id IS NULL AND auth.email() = email));
CREATE POLICY "Admin can view all applications" ON public.applications
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can update applications" ON public.applications
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can delete applications" ON public.applications
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- PAYMENTS
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin can view all payments" ON public.payments
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
-- Inserts/updates only via edge function (service role bypasses RLS)