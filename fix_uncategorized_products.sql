-- SQL commands to fix uncategorized products by assigning them to proper categories
-- First, create missing categories if they don't exist

-- Insert categories that might be missing (will skip if they already exist due to UNIQUE constraint)
INSERT INTO public.categories (name, slug, description, is_active) 
VALUES 
  ('Speakers', 'speakers', 'Audio speakers and sound systems', true),
  ('Gaming', 'gaming', 'Gaming consoles and accessories', true),
  ('Accessories', 'accessories', 'Phone and tech accessories', true),
  ('Wearables', 'wearables', 'Smartwatches, earbuds, and wearable tech', true)
ON CONFLICT (slug) DO NOTHING;

-- Update JBL speakers to Speakers category
UPDATE public.products 
SET category_id = (SELECT id FROM categories WHERE slug = 'speakers'),
    updated_at = now()
WHERE (brand ILIKE '%JBL%' OR name ILIKE '%JBL%' OR name ILIKE '%speaker%' OR name ILIKE '%soundbar%')
  AND (category_id IS NULL OR category_id NOT IN (SELECT id FROM categories WHERE slug = 'speakers'));

-- Update PS5 gaming products to Gaming category
UPDATE public.products 
SET category_id = (SELECT id FROM categories WHERE slug = 'gaming'),
    updated_at = now()
WHERE (name ILIKE '%PS5%' OR name ILIKE '%playstation%' OR brand ILIKE '%sony%' AND name ILIKE '%controller%')
  AND (category_id IS NULL OR category_id NOT IN (SELECT id FROM categories WHERE slug = 'gaming'));

-- Update AirPods to Wearables category
UPDATE public.products 
SET category_id = (SELECT id FROM categories WHERE slug = 'wearables'),
    updated_at = now()
WHERE (name ILIKE '%airpods%' OR name ILIKE '%earbuds%')
  AND (category_id IS NULL OR category_id NOT IN (SELECT id FROM categories WHERE slug = 'wearables'));

-- Update accessories (cables, chargers, cases, bags) to Accessories category
UPDATE public.products 
SET category_id = (SELECT id FROM categories WHERE slug = 'accessories'),
    updated_at = now()
WHERE (name ILIKE '%cable%' OR name ILIKE '%charger%' OR name ILIKE '%case%' 
       OR name ILIKE '%adapter%' OR name ILIKE '%bag%' OR name ILIKE '%protector%')
  AND (category_id IS NULL OR category_id NOT IN (SELECT id FROM categories WHERE slug = 'accessories'));

-- Verify the fix - check for remaining uncategorized products
SELECT 
  COUNT(*) as total_uncategorized,
  STRING_AGG(DISTINCT name, ', ') as uncategorized_products
FROM public.products 
WHERE category_id IS NULL;

-- Show distribution after fix
SELECT 
  COALESCE(c.name, 'Uncategorized') as category_name,
  COUNT(p.id) as product_count
FROM public.products p
LEFT JOIN public.categories c ON p.category_id = c.id
GROUP BY c.name
ORDER BY product_count DESC;

