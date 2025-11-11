
-- Drop the trigger that calls handle_new_user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the handle_new_user function (this should cascade and remove the trigger)
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
