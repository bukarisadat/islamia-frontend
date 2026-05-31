-- Allow reading applications without Supabase auth (admin uses localStorage auth)
DROP POLICY IF EXISTS "Public can view applications" ON public.applications;
CREATE POLICY "Public can view applications"
  ON public.applications
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can update applications" ON public.applications;
CREATE POLICY "Public can update applications"
  ON public.applications
  FOR UPDATE
  USING (true);