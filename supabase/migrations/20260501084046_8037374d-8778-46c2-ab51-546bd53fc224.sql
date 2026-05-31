ALTER FUNCTION public.has_role(UUID, app_role) SET search_path = public, pg_temp;
ALTER FUNCTION public.generate_index_number() SET search_path = public, pg_temp;
ALTER FUNCTION public.enforce_single_admin() SET search_path = public, pg_temp;
ALTER FUNCTION public.handle_new_user() SET search_path = public, pg_temp;
ALTER FUNCTION public.touch_updated_at() SET search_path = public, pg_temp;