-- SQL commands to insert iPhone 17 series and AirPods products
-- Prices are in the format provided (appears to be local currency without decimals)
-- iPhone 17 products are linked to the 'iphone' category and will appear under the "phones" category page
-- AirPods products will appear under "wearables" category page (filtered by frontend based on name)

-- ============================================================================
-- AirPods Products
-- ============================================================================

-- 1. AirPods Pro 3 (Brand New)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'AirPods Pro 3',
  'airpods-pro-3',
  1150000,
  NULL,
  'Apple',
  'AirPods Pro 3',
  'new',
  0,
  true
);

-- 2. AirPods 4 ANC (Brand New)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'AirPods 4 ANC',
  'airpods-4-anc',
  770000,
  NULL,
  'Apple',
  'AirPods 4 ANC',
  'new',
  0,
  true
);

-- 3. AirPods Pro 2 (Brand New)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'AirPods Pro 2',
  'airpods-pro-2',
  850000,
  NULL,
  'Apple',
  'AirPods Pro 2',
  'new',
  0,
  true
);

-- ============================================================================
-- iPhone 17 Series Products (Physical SIM) - Brand New
-- ============================================================================

-- 1. iPhone 17 (256GB) - Blue
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  color, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'iPhone 17 (256GB)',
  'iphone-17-256gb-blue',
  3580000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 17',
  '256GB',
  'Blue',
  'new',
  0,
  true,
  'Physical SIM'
);

-- 2. iPhone 17 Pro (256GB) - Orange
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  color, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'iPhone 17 Pro (256GB)',
  'iphone-17-pro-256gb-orange',
  4990000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 17 Pro',
  '256GB',
  'Orange',
  'new',
  0,
  true,
  'Physical SIM'
);

-- 3. iPhone 17 Pro (512GB) - White
-- NOTE: Marked as "Out of stock" - stock_quantity set to 0
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  color, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'iPhone 17 Pro (512GB)',
  'iphone-17-pro-512gb-white',
  0,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 17 Pro',
  '512GB',
  'White',
  'new',
  0,
  true,
  'Physical SIM - Out of stock'
);

-- 4. iPhone 17 Pro (512GB) - Orange
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  color, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'iPhone 17 Pro (512GB)',
  'iphone-17-pro-512gb-orange',
  5750000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 17 Pro',
  '512GB',
  'Orange',
  'new',
  0,
  true,
  'Physical SIM'
);

-- 5. iPhone 17 Pro Max (256GB) - Blue
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  color, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'iPhone 17 Pro Max (256GB)',
  'iphone-17-pro-max-256gb-blue',
  5880000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 17 Pro Max',
  '256GB',
  'Blue',
  'new',
  0,
  true,
  'Physical SIM'
);

-- 6. iPhone 17 Pro Max (256GB) - White
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  color, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'iPhone 17 Pro Max (256GB)',
  'iphone-17-pro-max-256gb-white',
  5950000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 17 Pro Max',
  '256GB',
  'White',
  'new',
  0,
  true,
  'Physical SIM'
);

-- 7. iPhone 17 Pro Max (256GB) - Orange
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  color, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'iPhone 17 Pro Max (256GB)',
  'iphone-17-pro-max-256gb-orange',
  5950000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 17 Pro Max',
  '256GB',
  'Orange',
  'new',
  0,
  true,
  'Physical SIM'
);

-- 8. iPhone 17 Pro Max (512GB) - Blue
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  color, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'iPhone 17 Pro Max (512GB)',
  'iphone-17-pro-max-512gb-blue',
  6810000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 17 Pro Max',
  '512GB',
  'Blue',
  'new',
  0,
  true,
  'Physical SIM'
);

-- 9. iPhone 17 Pro Max (512GB) - White
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  color, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'iPhone 17 Pro Max (512GB)',
  'iphone-17-pro-max-512gb-white',
  6910000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 17 Pro Max',
  '512GB',
  'White',
  'new',
  0,
  true,
  'Physical SIM'
);

-- 10. iPhone 17 Pro Max (512GB) - Orange
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  color, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'iPhone 17 Pro Max (512GB)',
  'iphone-17-pro-max-512gb-orange',
  6910000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 17 Pro Max',
  '512GB',
  'Orange',
  'new',
  0,
  true,
  'Physical SIM'
);

-- 11. iPhone 17 Pro Max (1TB) - Orange
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  color, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'iPhone 17 Pro Max (1TB)',
  'iphone-17-pro-max-1tb-orange',
  7750000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 17 Pro Max',
  '1TB',
  'Orange',
  'new',
  0,
  true,
  'Physical SIM'
);

-- 12. iPhone 17 Pro Max (1TB) - White
-- NOTE: Marked as "Out of stock" - stock_quantity set to 0
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  color, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'iPhone 17 Pro Max (1TB)',
  'iphone-17-pro-max-1tb-white',
  0,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 17 Pro Max',
  '1TB',
  'White',
  'new',
  0,
  true,
  'Physical SIM - Out of stock'
);

