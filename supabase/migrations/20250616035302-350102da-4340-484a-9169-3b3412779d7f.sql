
-- Clear existing sample products
DELETE FROM public.products;

-- Clear existing sample categories and recreate with more appropriate ones
DELETE FROM public.categories;

-- Insert more appropriate categories for a real gadgets store
INSERT INTO public.categories (name, slug, description) VALUES
('Smartphones', 'smartphones', 'Latest smartphones and mobile devices'),
('Laptops', 'laptops', 'Laptops and notebooks'),
('Tablets', 'tablets', 'Tablets and iPad devices'),
('Accessories', 'accessories', 'Phone and tech accessories'),
('Audio', 'audio', 'Headphones, speakers, and audio devices'),
('Gaming', 'gaming', 'Gaming consoles and accessories'),
('Cameras', 'cameras', 'Digital cameras and photography equipment'),
('Smart Home', 'smart-home', 'Smart home devices and IoT products');

-- Update the storage bucket name to be more appropriate
UPDATE storage.buckets SET id = 'products', name = 'products' WHERE id = 'product-images';

-- Create storage policy for the products bucket
CREATE POLICY "Allow public read access to products bucket" ON storage.objects 
FOR SELECT USING (bucket_id = 'products');

CREATE POLICY "Allow public upload to products bucket" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'products');

CREATE POLICY "Allow public delete from products bucket" ON storage.objects 
FOR DELETE USING (bucket_id = 'products');
