
-- Fix RLS policies for products table to allow admin operations
DROP POLICY IF EXISTS "Allow public read access to products" ON public.products;
DROP POLICY IF EXISTS "Allow public insert to products" ON public.products;
DROP POLICY IF EXISTS "Allow public update to products" ON public.products;
DROP POLICY IF EXISTS "Allow public delete to products" ON public.products;

-- Create permissive policies for products (since this is an admin-only interface)
CREATE POLICY "Enable read access for all users" ON public.products FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.products FOR DELETE USING (true);

-- Clear existing categories and create smartphone-focused ones
DELETE FROM public.categories;

-- Insert smartphone brand categories
INSERT INTO public.categories (name, slug, description) VALUES
('iPhone', 'iphone', 'Apple iPhone devices'),
('Samsung', 'samsung', 'Samsung Galaxy smartphones'),
('Huawei', 'huawei', 'Huawei smartphones and devices'),
('Xiaomi', 'xiaomi', 'Xiaomi and Redmi smartphones'),
('Oppo', 'oppo', 'Oppo smartphones'),
('Vivo', 'vivo', 'Vivo smartphones'),
('OnePlus', 'oneplus', 'OnePlus smartphones'),
('Google Pixel', 'google-pixel', 'Google Pixel smartphones'),
('Tecno', 'tecno', 'Tecno smartphones'),
('Infinix', 'infinix', 'Infinix smartphones');
