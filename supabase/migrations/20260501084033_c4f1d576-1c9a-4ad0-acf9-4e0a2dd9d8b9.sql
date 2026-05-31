-- Lock down SECURITY DEFINER helpers so they can only be called by triggers / service role
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.generate_index_number() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.enforce_single_admin() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM anon, authenticated, public;