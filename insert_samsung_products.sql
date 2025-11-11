-- SQL commands to insert Samsung Galaxy products
-- Prices are in the format provided (appears to be local currency without decimals)
-- All Samsung products are linked to the 'samsung' category (or NULL for frontend filtering)
-- Products will appear under the "phones" category page

-- ============================================================================
-- Samsung Galaxy S Ultra Series
-- ============================================================================

-- 1. S24 Ultra (512GB, Single SIM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'S24 Ultra (512GB)',
  's24-ultra-512gb-single-sim',
  3000000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy S24 Ultra',
  '512GB',
  'new',
  0,
  true,
  'Single SIM - Mix Colors'
);

-- 2. S24 Ultra (256GB, Single SIM)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'S24 Ultra (256GB)',
  's24-ultra-256gb-single-sim',
  2800000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy S24 Ultra',
  '256GB',
  'new',
  0,
  true,
  'Single SIM'
);

-- 3. S23 Ultra (256GB)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'S23 Ultra (256GB)',
  's23-ultra-256gb',
  2200000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy S23 Ultra',
  '256GB',
  'new',
  0,
  true
);

-- 4. S23 Ultra (512GB)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'S23 Ultra (512GB)',
  's23-ultra-512gb',
  2320000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy S23 Ultra',
  '512GB',
  'new',
  0,
  true
);

-- 5. S22 Ultra (256GB)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'S22 Ultra (256GB)',
  's22-ultra-256gb',
  1750000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy S22 Ultra',
  '256GB',
  'new',
  0,
  true
);

-- 6. S22 Ultra (512GB)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'S22 Ultra (512GB)',
  's22-ultra-512gb',
  1900000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy S22 Ultra',
  '512GB',
  'new',
  0,
  true
);

-- 7. S21 Ultra (256GB)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'S21 Ultra (256GB)',
  's21-ultra-256gb',
  1450000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy S21 Ultra',
  '256GB',
  'new',
  0,
  true
);

-- ============================================================================
-- Samsung Galaxy Fold Series
-- ============================================================================

-- 1. Fold 6 (512GB)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'Galaxy Z Fold 6 (512GB)',
  'galaxy-z-fold-6-512gb',
  3650000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy Z Fold 6',
  '512GB',
  'new',
  0,
  true
);

-- 2. Fold 6 (256GB)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'Galaxy Z Fold 6 (256GB)',
  'galaxy-z-fold-6-256gb',
  3450000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy Z Fold 6',
  '256GB',
  'new',
  0,
  true
);

-- 3. Fold 5 (512GB)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'Galaxy Z Fold 5 (512GB)',
  'galaxy-z-fold-5-512gb',
  2550000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy Z Fold 5',
  '512GB',
  'new',
  0,
  true
);

-- 4. Fold 5 (256GB)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'Galaxy Z Fold 5 (256GB)',
  'galaxy-z-fold-5-256gb',
  2350000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy Z Fold 5',
  '256GB',
  'new',
  0,
  true
);

-- 5. Fold 4 (512GB)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'Galaxy Z Fold 4 (512GB)',
  'galaxy-z-fold-4-512gb',
  2200000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy Z Fold 4',
  '512GB',
  'new',
  0,
  true
);

-- 6. Fold 4 (256GB)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'Galaxy Z Fold 4 (256GB)',
  'galaxy-z-fold-4-256gb',
  2100000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy Z Fold 4',
  '256GB',
  'new',
  0,
  true
);

-- ============================================================================
-- Samsung Galaxy A Series
-- ============================================================================

-- A56 5G Series
-- 1. A56 5G (256GB / 12GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A56 5G (256GB / 12GB RAM)',
  'galaxy-a56-5g-256gb-12gb-ram',
  1330000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A56 5G',
  '256GB',
  'new',
  0,
  true,
  '12GB RAM - Mix Colors'
);

-- 2. A56 5G (256GB / 8GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A56 5G (256GB / 8GB RAM)',
  'galaxy-a56-5g-256gb-8gb-ram',
  1260000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A56 5G',
  '256GB',
  'new',
  0,
  true,
  '8GB RAM - Mix Colors'
);

-- 3. A56 5G (128GB / 8GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A56 5G (128GB / 8GB RAM)',
  'galaxy-a56-5g-128gb-8gb-ram',
  1200000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A56 5G',
  '128GB',
  'new',
  0,
  true,
  '8GB RAM - Mix Colors'
);

-- A36 5G Series
-- 4. A36 5G (128GB / 8GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A36 5G (128GB / 8GB RAM)',
  'galaxy-a36-5g-128gb-8gb-ram',
  1020000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A36 5G',
  '128GB',
  'new',
  0,
  true,
  '8GB RAM - Mix Colors'
);

-- 5. A36 5G (256GB / 12GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A36 5G (256GB / 12GB RAM)',
  'galaxy-a36-5g-256gb-12gb-ram',
  1100000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A36 5G',
  '256GB',
  'new',
  0,
  true,
  '12GB RAM - Mix Colors'
);

-- A35 5G Series
-- 6. A35 5G (256GB / 8GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A35 5G (256GB / 8GB RAM)',
  'galaxy-a35-5g-256gb-8gb-ram',
  1050000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A35 5G',
  '256GB',
  'new',
  0,
  true,
  '8GB RAM - Mix Colors'
);

-- A26 5G Series
-- 7. A26 5G (128GB / 6GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A26 5G (128GB / 6GB RAM)',
  'galaxy-a26-5g-128gb-6gb-ram',
  810000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A26 5G',
  '128GB',
  'new',
  0,
  true,
  '6GB RAM - Mix Colors'
);

-- 8. A26 5G (256GB / 8GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A26 5G (256GB / 8GB RAM)',
  'galaxy-a26-5g-256gb-8gb-ram',
  910000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A26 5G',
  '256GB',
  'new',
  0,
  true,
  '8GB RAM - Mix Colors'
);

-- A17 Series
-- 9. A17 4G (128GB / 4GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A17 4G (128GB / 4GB RAM)',
  'galaxy-a17-4g-128gb-4gb-ram',
  630000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A17 4G',
  '128GB',
  'new',
  0,
  true,
  '4GB RAM - Mix Colors'
);

-- 10. A17 4G (128GB / 6GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A17 4G (128GB / 6GB RAM)',
  'galaxy-a17-4g-128gb-6gb-ram',
  680000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A17 4G',
  '128GB',
  'new',
  0,
  true,
  '6GB RAM - Mix Colors'
);

-- 11. A17 4G (256GB / 8GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A17 4G (256GB / 8GB RAM)',
  'galaxy-a17-4g-256gb-8gb-ram',
  750000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A17 4G',
  '256GB',
  'new',
  0,
  true,
  '8GB RAM - Mix Colors'
);

-- 12. A17 5G (128GB / 6GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A17 5G (128GB / 6GB RAM)',
  'galaxy-a17-5g-128gb-6gb-ram',
  750000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A17 5G',
  '128GB',
  'new',
  0,
  true,
  '6GB RAM - Mix Colors'
);

-- A16 Series
-- 13. A16 (128GB / 4GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A16 (128GB / 4GB RAM)',
  'galaxy-a16-128gb-4gb-ram',
  570000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A16',
  '128GB',
  'new',
  0,
  true,
  '4GB RAM - Mix Colors'
);

-- 14. A16 (128GB / 6GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A16 (128GB / 6GB RAM)',
  'galaxy-a16-128gb-6gb-ram',
  620000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A16',
  '128GB',
  'new',
  0,
  true,
  '6GB RAM - Mix Colors'
);

-- 15. A16 (256GB / 8GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A16 (256GB / 8GB RAM)',
  'galaxy-a16-256gb-8gb-ram',
  720000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A16',
  '256GB',
  'new',
  0,
  true,
  '8GB RAM - Mix Colors'
);

-- A07 Series
-- 16. A07 (128GB / 4GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A07 (128GB / 4GB RAM)',
  'galaxy-a07-128gb-4gb-ram',
  500000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A07',
  '128GB',
  'new',
  0,
  true,
  '4GB RAM - Mix Colors'
);

-- 17. A07 (64GB / 4GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A07 (64GB / 4GB RAM)',
  'galaxy-a07-64gb-4gb-ram',
  470000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A07',
  '64GB',
  'new',
  0,
  true,
  '4GB RAM - Mix Colors'
);

-- A06 Series
-- 18. A06 (128GB / 4GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A06 (128GB / 4GB RAM)',
  'galaxy-a06-128gb-4gb-ram',
  470000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A06',
  '128GB',
  'new',
  0,
  true,
  '4GB RAM - Mix Colors'
);

-- 19. A06 (64GB / 4GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy A06 (64GB / 4GB RAM)',
  'galaxy-a06-64gb-4gb-ram',
  420000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy A06',
  '64GB',
  'new',
  0,
  true,
  '4GB RAM - Mix Colors'
);

-- ============================================================================
-- Samsung Galaxy M Series
-- ============================================================================

-- 1. M16 5G (128GB / 6GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy M16 5G (128GB / 6GB RAM)',
  'galaxy-m16-5g-128gb-6gb-ram',
  650000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy M16 5G',
  '128GB',
  'new',
  0,
  true,
  '6GB RAM - Mix Colors'
);

-- 2. M35 5G (128GB / 6GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy M35 5G (128GB / 6GB RAM)',
  'galaxy-m35-5g-128gb-6gb-ram',
  730000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy M35 5G',
  '128GB',
  'new',
  0,
  true,
  '6GB RAM - Mix Colors'
);

-- 3. M36 5G (128GB / 6GB RAM, Mix)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  storage_capacity, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Galaxy M36 5G (128GB / 6GB RAM)',
  'galaxy-m36-5g-128gb-6gb-ram',
  790000,
  (SELECT id FROM categories WHERE slug = 'samsung'),
  'Samsung',
  'Galaxy M36 5G',
  '128GB',
  'new',
  0,
  true,
  '6GB RAM - Mix Colors'
);

