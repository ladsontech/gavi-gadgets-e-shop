
-- First delete all objects from storage buckets
DELETE FROM storage.objects WHERE bucket_id != 'system';

-- Then clear existing tables and their dependencies
DROP TABLE IF EXISTS public.likes CASCADE;
DROP TABLE IF EXISTS public.job_applications CASCADE;
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.posts CASCADE;
DROP TABLE IF EXISTS public.experiences CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.jobs CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.education_levels CASCADE;
DROP TABLE IF EXISTS public.fields_of_focus CASCADE;
DROP TABLE IF EXISTS public.fields_of_interest CASCADE;

-- Clear storage buckets after objects are deleted
DELETE FROM storage.buckets WHERE id != 'system';

-- Create categories table for phone brands
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create products table for phones
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  storage_capacity TEXT,
  color TEXT,
  condition TEXT DEFAULT 'new',
  stock_quantity INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create customers table for order management
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  whatsapp_number TEXT,
  address TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_whatsapp TEXT,
  customer_address TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT DEFAULT 'whatsapp',
  payment_status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Insert initial categories
INSERT INTO public.categories (name, slug, description) VALUES
('iPhone', 'iphone', 'Apple iPhone smartphones'),
('Pixel', 'pixel', 'Google Pixel smartphones'),
('Huawei', 'huawei', 'Huawei smartphones'),
('Samsung', 'samsung', 'Samsung Galaxy smartphones'),
('Aquos', 'aquos', 'Sharp Aquos smartphones'),
('Realme', 'realme', 'Realme smartphones'),
('Oppo', 'oppo', 'Oppo smartphones'),
('ZTE', 'zte', 'ZTE smartphones'),
('Spark', 'spark', 'Tecno Spark smartphones'),
('Camon', 'camon', 'Tecno Camon smartphones'),
('Others', 'others', 'Other smartphone brands');

-- Insert sample products
INSERT INTO public.products (name, slug, price, original_price, category_id, brand, model, storage_capacity, color, stock_quantity, description, is_featured) VALUES
('iPhone 15 Pro Max', 'iphone-15-pro-max', 1299.99, 1399.99, (SELECT id FROM categories WHERE slug = 'iphone'), 'Apple', 'iPhone 15 Pro Max', '256GB', 'Natural Titanium', 5, 'Latest iPhone with titanium design and advanced camera system', true),
('Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 1199.99, 1299.99, (SELECT id FROM categories WHERE slug = 'samsung'), 'Samsung', 'Galaxy S24 Ultra', '512GB', 'Titanium Black', 8, 'Premium Samsung flagship with S Pen and exceptional camera', true),
('Google Pixel 8 Pro', 'google-pixel-8-pro', 999.99, 1099.99, (SELECT id FROM categories WHERE slug = 'pixel'), 'Google', 'Pixel 8 Pro', '128GB', 'Obsidian', 6, 'Google flagship with advanced AI photography features', true),
('Huawei P60 Pro', 'huawei-p60-pro', 899.99, 999.99, (SELECT id FROM categories WHERE slug = 'huawei'), 'Huawei', 'P60 Pro', '256GB', 'Pearl White', 4, 'Huawei flagship with excellent camera and design', false),
('Realme GT 5', 'realme-gt-5', 599.99, 699.99, (SELECT id FROM categories WHERE slug = 'realme'), 'Realme', 'GT 5', '256GB', 'Racing Yellow', 10, 'High-performance gaming smartphone', false);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access for e-commerce
CREATE POLICY "Allow public read access to categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert to customers" ON public.customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to order_items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- Create storage policy for product images
CREATE POLICY "Allow public read access to product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Allow public upload to product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
