-- Create admin_users table to store authorized admin emails
CREATE TABLE public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies - only allow authenticated users to read
CREATE POLICY "Allow authenticated users to read admin_users" 
ON public.admin_users 
FOR SELECT 
TO authenticated
USING (true);

-- Function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin(user_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE email = user_email
  )
$$;

-- Insert a default admin email (you can change this later)
INSERT INTO public.admin_users (email) VALUES ('admin@gavitech.com');