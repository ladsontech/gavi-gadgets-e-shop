-- SQL commands to insert iPhone 16 and iPhone 15 series products under the iPhone category
-- Prices are in the format provided (appears to be local currency without decimals)
-- All products are linked to the 'iphone' category and will appear under the "phones" category page

-- 1. iPhone 16E (128GB) - White / Black
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
  is_active
) VALUES (
  'iPhone 16E (128GB)',
  'iphone-16e-128gb',
  2200000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 16E',
  '128GB',
  'White / Black',
  'new',
  0,
  true
);

-- 2. iPhone 16 (128GB) - Black / Blue
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
  is_active
) VALUES (
  'iPhone 16 (128GB)',
  'iphone-16-128gb',
  2630000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 16',
  '128GB',
  'Black / Blue',
  'new',
  0,
  true
);

-- 3. iPhone 16 (256GB) - Black / White
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
  is_active
) VALUES (
  'iPhone 16 (256GB)',
  'iphone-16-256gb',
  2780000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 16',
  '256GB',
  'Black / White',
  'new',
  0,
  true
);

-- 4. iPhone 16 Plus (256GB) - Black / White
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
  is_active
) VALUES (
  'iPhone 16 Plus (256GB)',
  'iphone-16-plus-256gb',
  3350000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 16 Plus',
  '256GB',
  'Black / White',
  'new',
  0,
  true
);

-- 5. iPhone 16 Plus (128GB) - White / Black
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
  is_active
) VALUES (
  'iPhone 16 Plus (128GB)',
  'iphone-16-plus-128gb',
  3150000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 16 Plus',
  '128GB',
  'White / Black',
  'new',
  0,
  true
);

-- 6. iPhone 16 Pro (128GB) - White / Natural
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
  is_active
) VALUES (
  'iPhone 16 Pro (128GB)',
  'iphone-16-pro-128gb',
  3450000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 16 Pro',
  '128GB',
  'White / Natural',
  'new',
  0,
  true
);

-- 7. iPhone 16 Pro (256GB) - Natural / Black
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
  is_active
) VALUES (
  'iPhone 16 Pro (256GB)',
  'iphone-16-pro-256gb',
  3630000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 16 Pro',
  '256GB',
  'Natural / Black',
  'new',
  0,
  true
);

-- 8. iPhone 16 Pro (512GB) - Desert / Natural
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
  is_active
) VALUES (
  'iPhone 16 Pro (512GB)',
  'iphone-16-pro-512gb',
  3900000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 16 Pro',
  '512GB',
  'Desert / Natural',
  'new',
  0,
  true
);

-- 9. iPhone 16 Pro Max (256GB) - Desert / White
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
  is_active
) VALUES (
  'iPhone 16 Pro Max (256GB)',
  'iphone-16-pro-max-256gb',
  4000000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 16 Pro Max',
  '256GB',
  'Desert / White',
  'new',
  0,
  true
);

-- 10. iPhone 16 Pro Max (512GB) - Desert / White
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
  is_active
) VALUES (
  'iPhone 16 Pro Max (512GB)',
  'iphone-16-pro-max-512gb',
  4480000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 16 Pro Max',
  '512GB',
  'Desert / White',
  'new',
  0,
  true
);

-- 11. iPhone 16 Pro Max (1TB) - Natural (Single SIM)
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
  'iPhone 16 Pro Max (1TB)',
  'iphone-16-pro-max-1tb',
  4850000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 16 Pro Max',
  '1TB',
  'Natural',
  'new',
  0,
  true,
  'Single SIM'
);

-- ============================================================================
-- iPhone 15 Series Products
-- ============================================================================

-- 1. iPhone 15 (128GB) - Black / Blue / Pink
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
  is_active
) VALUES (
  'iPhone 15 (128GB)',
  'iphone-15-128gb',
  2180000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 15',
  '128GB',
  'Black / Blue / Pink',
  'new',
  0,
  true
);

-- 2. iPhone 15 (256GB) - Black / Green / Pink
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
  is_active
) VALUES (
  'iPhone 15 (256GB)',
  'iphone-15-256gb',
  2300000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 15',
  '256GB',
  'Black / Green / Pink',
  'new',
  0,
  true
);

-- 3. iPhone 15 (512GB) - Natural / Black / Blue
-- NOTE: Price marked as XXX in source - set to 0 as placeholder, UPDATE when price is available
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
  is_active
) VALUES (
  'iPhone 15 (512GB)',
  'iphone-15-512gb',
  0,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 15',
  '512GB',
  'Natural / Black / Blue',
  'new',
  0,
  true
);

-- 4. iPhone 15 Plus (128GB) - Pink / Black
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
  is_active
) VALUES (
  'iPhone 15 Plus (128GB)',
  'iphone-15-plus-128gb',
  2400000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 15 Plus',
  '128GB',
  'Pink / Black',
  'new',
  0,
  true
);

-- 5. iPhone 15 Plus (256GB) - Blue / Black
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
  is_active
) VALUES (
  'iPhone 15 Plus (256GB)',
  'iphone-15-plus-256gb',
  2550000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 15 Plus',
  '256GB',
  'Blue / Black',
  'new',
  0,
  true
);

-- 6. iPhone 15 Pro (128GB) - Blue / Natural
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
  is_active
) VALUES (
  'iPhone 15 Pro (128GB)',
  'iphone-15-pro-128gb',
  2730000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 15 Pro',
  '128GB',
  'Blue / Natural',
  'new',
  0,
  true
);

-- 7. iPhone 15 Pro (256GB) - Blue / Natural
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
  is_active
) VALUES (
  'iPhone 15 Pro (256GB)',
  'iphone-15-pro-256gb',
  2900000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 15 Pro',
  '256GB',
  'Blue / Natural',
  'new',
  0,
  true
);

-- 8. iPhone 15 Pro (512GB) - Natural / Black (Dual SIM)
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
  'iPhone 15 Pro (512GB)',
  'iphone-15-pro-512gb',
  3170000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 15 Pro',
  '512GB',
  'Natural / Black',
  'new',
  0,
  true,
  'Dual SIM'
);

-- 9. iPhone 15 Pro Max (256GB) - Natural (Single SIM)
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
  'iPhone 15 Pro Max (256GB)',
  'iphone-15-pro-max-256gb',
  3120000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 15 Pro Max',
  '256GB',
  'Natural',
  'new',
  0,
  true,
  'Single SIM'
);

-- 10. iPhone 15 Pro Max (512GB) - Natural / Blue
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
  is_active
) VALUES (
  'iPhone 15 Pro Max (512GB)',
  'iphone-15-pro-max-512gb',
  3350000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 15 Pro Max',
  '512GB',
  'Natural / Blue',
  'new',
  0,
  true
);

-- 11. iPhone 15 Pro Max (1TB) - Black / Blue (Single SIM)
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
  'iPhone 15 Pro Max (1TB)',
  'iphone-15-pro-max-1tb',
  3650000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 15 Pro Max',
  '1TB',
  'Black / Blue',
  'new',
  0,
  true,
  'Single SIM'
);

