-- SQL commands to insert iPhone 11, 12, 13, and 14 series products under the iPhone category
-- Prices are in the format provided (appears to be local currency without decimals)
-- All products are linked to the 'iphone' category and will appear under the "phones" category page

-- ============================================================================
-- iPhone 11 Series Products
-- ============================================================================

-- 1. iPhone 11 (128GB) - Black / Blue
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
  'iPhone 11 (128GB)',
  'iphone-11-128gb',
  1100000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 11',
  '128GB',
  'Black / Blue',
  'new',
  0,
  true
);

-- 2. iPhone 11 Pro (256GB) - Blue / Gold
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
  'iPhone 11 Pro (256GB)',
  'iphone-11-pro-256gb',
  1350000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 11 Pro',
  '256GB',
  'Blue / Gold',
  'new',
  0,
  true
);

-- 3. iPhone 11 Pro Max (256GB) - Blue
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
  'iPhone 11 Pro Max (256GB)',
  'iphone-11-pro-max-256gb',
  1550000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 11 Pro Max',
  '256GB',
  'Blue',
  'new',
  0,
  true
);

-- 4. iPhone 11 Pro Max (512GB) - Blue
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
  'iPhone 11 Pro Max (512GB)',
  'iphone-11-pro-max-512gb',
  1590000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 11 Pro Max',
  '512GB',
  'Blue',
  'new',
  0,
  true
);

-- ============================================================================
-- iPhone 12 Series Products
-- ============================================================================

-- 1. iPhone 12 (128GB) - Black / Blue
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
  'iPhone 12 (128GB)',
  'iphone-12-128gb',
  1280000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 12',
  '128GB',
  'Black / Blue',
  'new',
  0,
  true
);

-- 2. iPhone 12 Pro (128GB) - Blue / Black
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
  'iPhone 12 Pro (128GB)',
  'iphone-12-pro-128gb',
  1330000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 12 Pro',
  '128GB',
  'Blue / Black',
  'new',
  0,
  true
);

-- 3. iPhone 12 Pro (256GB) - Blue / Gold
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
  'iPhone 12 Pro (256GB)',
  'iphone-12-pro-256gb',
  1450000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 12 Pro',
  '256GB',
  'Blue / Gold',
  'new',
  0,
  true
);

-- 4. iPhone 12 Pro Max (256GB) - Blue
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
  'iPhone 12 Pro Max (256GB)',
  'iphone-12-pro-max-256gb',
  1750000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 12 Pro Max',
  '256GB',
  'Blue',
  'new',
  0,
  true
);

-- 5. iPhone 12 Pro Max (512GB) - Blue
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
  'iPhone 12 Pro Max (512GB)',
  'iphone-12-pro-max-512gb',
  1890000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 12 Pro Max',
  '512GB',
  'Blue',
  'new',
  0,
  true
);

-- ============================================================================
-- iPhone 13 Series Products
-- ============================================================================

-- 1. iPhone 13 (128GB) - Black / Blue / Pink
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
  'iPhone 13 (128GB)',
  'iphone-13-128gb',
  1380000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 13',
  '128GB',
  'Black / Blue / Pink',
  'new',
  0,
  true
);

-- 2. iPhone 13 (256GB) - Black / Green / Pink
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
  'iPhone 13 (256GB)',
  'iphone-13-256gb',
  1480000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 13',
  '256GB',
  'Black / Green / Pink',
  'new',
  0,
  true
);

-- 3. iPhone 13 Pro (128GB) - Blue / Black
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
  'iPhone 13 Pro (128GB)',
  'iphone-13-pro-128gb',
  1730000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 13 Pro',
  '128GB',
  'Blue / Black',
  'new',
  0,
  true
);

-- 4. iPhone 13 Pro (256GB) - Blue / Gold
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
  'iPhone 13 Pro (256GB)',
  'iphone-13-pro-256gb',
  1800000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 13 Pro',
  '256GB',
  'Blue / Gold',
  'new',
  0,
  true
);

-- 5. iPhone 13 Pro Max (256GB) - Natural (Single SIM)
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
  'iPhone 13 Pro Max (256GB)',
  'iphone-13-pro-max-256gb',
  2000000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 13 Pro Max',
  '256GB',
  'Natural',
  'new',
  0,
  true,
  'Single SIM'
);

-- 6. iPhone 13 Pro Max (512GB) - Blue
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
  'iPhone 13 Pro Max (512GB)',
  'iphone-13-pro-max-512gb',
  2100000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 13 Pro Max',
  '512GB',
  'Blue',
  'new',
  0,
  true
);

-- 7. iPhone 13 Pro Max (1TB) - Black / Blue (Single SIM)
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
  'iPhone 13 Pro Max (1TB)',
  'iphone-13-pro-max-1tb',
  2200000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 13 Pro Max',
  '1TB',
  'Black / Blue',
  'new',
  0,
  true,
  'Single SIM'
);

-- ============================================================================
-- iPhone 14 Series Products
-- ============================================================================

-- 1. iPhone 14 (128GB) - Black / Blue / Pink
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
  'iPhone 14 (128GB)',
  'iphone-14-128gb',
  1780000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 14',
  '128GB',
  'Black / Blue / Pink',
  'new',
  0,
  true
);

-- 2. iPhone 14 (256GB) - Black / Green / Pink
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
  'iPhone 14 (256GB)',
  'iphone-14-256gb',
  1890000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 14',
  '256GB',
  'Black / Green / Pink',
  'new',
  0,
  true
);

-- 3. iPhone 14 Plus (128GB) - Blue / Black
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
  'iPhone 14 Plus (128GB)',
  'iphone-14-plus-128gb',
  2200000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 14 Plus',
  '128GB',
  'Blue / Black',
  'new',
  0,
  true
);

-- 4. iPhone 14 Plus (256GB) - Blue / Black
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
  'iPhone 14 Plus (256GB)',
  'iphone-14-plus-256gb',
  2500000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 14 Plus',
  '256GB',
  'Blue / Black',
  'new',
  0,
  true
);

-- 5. iPhone 14 Pro (128GB) - Purple / Gold
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
  'iPhone 14 Pro (128GB)',
  'iphone-14-pro-128gb',
  2130000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 14 Pro',
  '128GB',
  'Purple / Gold',
  'new',
  0,
  true
);

-- 6. iPhone 14 Pro (256GB) - Purple / Gold / Black
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
  'iPhone 14 Pro (256GB)',
  'iphone-14-pro-256gb',
  2300000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 14 Pro',
  '256GB',
  'Purple / Gold / Black',
  'new',
  0,
  true
);

-- 7. iPhone 14 Pro (512GB) - Black (Dual SIM)
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
  'iPhone 14 Pro (512GB)',
  'iphone-14-pro-512gb',
  2400000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 14 Pro',
  '512GB',
  'Black',
  'new',
  0,
  true,
  'Dual SIM'
);

-- 8. iPhone 14 Pro Max (256GB) - Gold / White / Black
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
  'iPhone 14 Pro Max (256GB)',
  'iphone-14-pro-max-256gb',
  2400000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 14 Pro Max',
  '256GB',
  'Gold / White / Black',
  'new',
  0,
  true
);

-- 9. iPhone 14 Pro Max (512GB) - Purple / Black
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
  'iPhone 14 Pro Max (512GB)',
  'iphone-14-pro-max-512gb',
  2650000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 14 Pro Max',
  '512GB',
  'Purple / Black',
  'new',
  0,
  true
);

-- 10. iPhone 14 Pro Max (1TB) - Black
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
  'iPhone 14 Pro Max (1TB)',
  'iphone-14-pro-max-1tb',
  2750000,
  (SELECT id FROM categories WHERE slug = 'iphone'),
  'Apple',
  'iPhone 14 Pro Max',
  '1TB',
  'Black',
  'new',
  0,
  true
);

