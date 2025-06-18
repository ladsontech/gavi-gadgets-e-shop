
-- Create updates table for storing poster images
CREATE TABLE IF NOT EXISTS public.updates (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title varchar(255) NOT NULL,
    image_url text NOT NULL,
    is_active boolean DEFAULT true,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_updates_active_order ON public.updates(is_active, display_order);

-- Enable RLS
ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON public.updates
    FOR SELECT USING (is_active = true);

CREATE POLICY "Enable all for authenticated users" ON public.updates
    FOR ALL USING (auth.role() = 'authenticated');
