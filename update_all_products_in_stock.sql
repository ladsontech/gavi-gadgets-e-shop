-- SQL command to update all out-of-stock products to in-stock
-- This sets stock_quantity to a default value for products with 0 or NULL stock

-- Option 1: Set all out-of-stock products to have 1 item in stock
UPDATE public.products 
SET stock_quantity = 1,
    updated_at = now()
WHERE stock_quantity = 0 OR stock_quantity IS NULL;

-- Option 2: Set all out-of-stock products to have 5 items in stock
-- UPDATE public.products 
-- SET stock_quantity = 5,
--     updated_at = now()
-- WHERE stock_quantity = 0 OR stock_quantity IS NULL;

-- Option 3: Set all out-of-stock products to have 10 items in stock
-- UPDATE public.products 
-- SET stock_quantity = 10,
--     updated_at = now()
-- WHERE stock_quantity = 0 OR stock_quantity IS NULL;

-- Option 4: Set ALL products to have specific stock regardless of current value
-- UPDATE public.products 
-- SET stock_quantity = 5,
--     updated_at = now();

-- Verify the update - see how many products are now in stock
SELECT 
  COUNT(*) as total_products,
  SUM(CASE WHEN stock_quantity > 0 THEN 1 ELSE 0 END) as in_stock_count,
  SUM(CASE WHEN stock_quantity = 0 OR stock_quantity IS NULL THEN 1 ELSE 0 END) as out_of_stock_count
FROM public.products;

-- View all products with their new stock quantities
SELECT 
  name, 
  brand, 
  model, 
  stock_quantity,
  price
FROM public.products 
ORDER BY name;

