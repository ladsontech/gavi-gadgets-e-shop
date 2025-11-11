
-- Check for and drop any trigger that references profiles table
DO $$
DECLARE
  trigger_rec RECORD;
BEGIN
  -- Find all triggers on auth.users
  FOR trigger_rec IN 
    SELECT tgname 
    FROM pg_trigger t
    JOIN pg_class c ON t.tgrelid = c.oid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE n.nspname = 'auth' AND c.relname = 'users'
      AND tgname LIKE '%profile%'
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS %I ON auth.users', trigger_rec.tgname);
  END LOOP;
END $$;

-- Drop any functions that handle profile creation
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.create_profile_for_user() CASCADE;
