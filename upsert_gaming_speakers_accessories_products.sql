-- SQL UPSERT commands to insert or replace Gaming, Speakers, and Accessories products
-- Uses PostgreSQL ON CONFLICT ... DO UPDATE for upsert functionality
-- If a product with the same slug exists, it will be updated; otherwise, it will be inserted
-- Prices are in the format provided (appears to be local currency without decimals)

-- ============================================================================
-- GAMING PRODUCTS
-- ============================================================================

-- 1. PS5 Slim (1TB, UK Model)
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
  'PS5 Slim (1TB, UK Model)',
  'ps5-slim-1tb-uk-model',
  2200000,
  NULL,
  'Sony',
  'PlayStation 5 Slim',
  '1TB',
  'new',
  0,
  true,
  'UK Model'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  storage_capacity = EXCLUDED.storage_capacity,
  description = EXCLUDED.description,
  updated_at = now();

-- 2. PS5 Controller - Black
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'PS5 Controller',
  'ps5-controller-black',
  360000,
  NULL,
  'Sony',
  'DualSense',
  'Black',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 3. PS5 Controller - Blue
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'PS5 Controller',
  'ps5-controller-blue',
  360000,
  NULL,
  'Sony',
  'DualSense',
  'Blue',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 4. PS5 Controller - Purple
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'PS5 Controller',
  'ps5-controller-purple',
  360000,
  NULL,
  'Sony',
  'DualSense',
  'Purple',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 5. PS5 Controller - White
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'PS5 Controller',
  'ps5-controller-white',
  360000,
  NULL,
  'Sony',
  'DualSense',
  'White',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 6. PS5 Controller - Army
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'PS5 Controller',
  'ps5-controller-army',
  360000,
  NULL,
  'Sony',
  'DualSense',
  'Army',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- ============================================================================
-- SPEAKERS (JBL)
-- ============================================================================

-- 1. JBL Go 4 - Black
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Go 4',
  'jbl-go-4-black',
  240000,
  NULL,
  'JBL',
  'Go 4',
  'Black',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 2. JBL Go 4 - Blue
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Go 4',
  'jbl-go-4-blue',
  240000,
  NULL,
  'JBL',
  'Go 4',
  'Blue',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 3. JBL Clip 5 - Black
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Clip 5',
  'jbl-clip-5-black',
  280000,
  NULL,
  'JBL',
  'Clip 5',
  'Black',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 4. JBL Clip 5 - Blue
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Clip 5',
  'jbl-clip-5-blue',
  280000,
  NULL,
  'JBL',
  'Clip 5',
  'Blue',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 5. JBL Clip 5 - Army
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Clip 5',
  'jbl-clip-5-army',
  280000,
  NULL,
  'JBL',
  'Clip 5',
  'Army',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 6. JBL Flip 6 - Blue
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Flip 6',
  'jbl-flip-6-blue',
  420000,
  NULL,
  'JBL',
  'Flip 6',
  'Blue',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 7. JBL Flip 6 - Green
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Flip 6',
  'jbl-flip-6-green',
  420000,
  NULL,
  'JBL',
  'Flip 6',
  'Green',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 8. JBL Flip 6 - Red
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Flip 6',
  'jbl-flip-6-red',
  420000,
  NULL,
  'JBL',
  'Flip 6',
  'Red',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 9. JBL Flip 6 - Pink
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Flip 6',
  'jbl-flip-6-pink',
  420000,
  NULL,
  'JBL',
  'Flip 6',
  'Pink',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 10. JBL Flip 6 - Black
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Flip 6',
  'jbl-flip-6-black',
  420000,
  NULL,
  'JBL',
  'Flip 6',
  'Black',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 11. JBL Flip 7 - Black
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Flip 7',
  'jbl-flip-7-black',
  480000,
  NULL,
  'JBL',
  'Flip 7',
  'Black',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 12. JBL Flip 7 - Red
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Flip 7',
  'jbl-flip-7-red',
  480000,
  NULL,
  'JBL',
  'Flip 7',
  'Red',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 13. JBL Flip 7 - Army
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Flip 7',
  'jbl-flip-7-army',
  480000,
  NULL,
  'JBL',
  'Flip 7',
  'Army',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 14. JBL Charge 5 - Black
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Charge 5',
  'jbl-charge-5-black',
  640000,
  NULL,
  'JBL',
  'Charge 5',
  'Black',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 15. JBL Charge 5 - Blue
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Charge 5',
  'jbl-charge-5-blue',
  640000,
  NULL,
  'JBL',
  'Charge 5',
  'Blue',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 16. JBL Charge 6 - Black
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Charge 6',
  'jbl-charge-6-black',
  780000,
  NULL,
  'JBL',
  'Charge 6',
  'Black',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 17. JBL Extreme 4 - Army
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Extreme 4',
  'jbl-extreme-4-army',
  1080000,
  NULL,
  'JBL',
  'Extreme 4',
  'Army',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 18. JBL Extreme 4 - Blue
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Extreme 4',
  'jbl-extreme-4-blue',
  1080000,
  NULL,
  'JBL',
  'Extreme 4',
  'Blue',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 19. JBL Studio 9 - Black
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Studio 9',
  'jbl-studio-9-black',
  920000,
  NULL,
  'JBL',
  'Studio 9',
  'Black',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 20. JBL Boom X3 - Black
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Boom X3',
  'jbl-boom-x3-black',
  1700000,
  NULL,
  'JBL',
  'Boom X3',
  'Black',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 21. JBL Boom X3 - Army
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active
) VALUES (
  'JBL Boom X3',
  'jbl-boom-x3-army',
  1700000,
  NULL,
  'JBL',
  'Boom X3',
  'Army',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  updated_at = now();

-- 22. JBL Wireless Microphone (Pair of 2) - Black
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  color, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'JBL Wireless Microphone (Pair of 2)',
  'jbl-wireless-microphone-pair-black',
  410000,
  NULL,
  'JBL',
  'Wireless Microphone',
  'Black',
  'new',
  0,
  true,
  'Pair of 2'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  color = EXCLUDED.color,
  description = EXCLUDED.description,
  updated_at = now();

-- 23. Sound Bar 2.1 Deep Bass MK2
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
  'Sound Bar 2.1 Deep Bass MK2',
  'sound-bar-21-deep-bass-mk2',
  1330000,
  NULL,
  'Generic',
  'Sound Bar 2.1 Deep Bass MK2',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  updated_at = now();

-- ============================================================================
-- ACCESSORIES
-- ============================================================================

-- 1. Original iPhone Type-C to Type-C Cable (For iPhone 15 & 16 Series)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Original iPhone Type-C to Type-C Cable',
  'original-iphone-typec-to-typec-cable',
  60000,
  NULL,
  'Apple',
  'Type-C to Type-C Cable',
  'new',
  0,
  true,
  'For iPhone 15 & 16 Series'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  updated_at = now();

-- 2. Original Adapter Type-C to Type-C
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
  'Original Adapter Type-C to Type-C',
  'original-adapter-typec-to-typec',
  70000,
  NULL,
  'Apple',
  'Type-C to Type-C Adapter',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  updated_at = now();

-- 3. Samsung Car Charger (Super Fast Charging Dual Port 25W + 15W)
INSERT INTO public.products (
  name, 
  slug, 
  price, 
  category_id, 
  brand, 
  model, 
  condition, 
  stock_quantity, 
  is_active,
  description
) VALUES (
  'Samsung Car Charger',
  'samsung-car-charger-dual-port',
  180000,
  NULL,
  'Samsung',
  'Car Charger',
  'new',
  0,
  true,
  'Super Fast Charging Dual Port 25W + 15W'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  updated_at = now();

-- 4. S22 Ultra Smart View Case
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
  'S22 Ultra Smart View Case',
  's22-ultra-smart-view-case',
  210000,
  NULL,
  'Samsung',
  'Smart View Case',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  updated_at = now();

-- 5. S23 Ultra Smart View Case
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
  'S23 Ultra Smart View Case',
  's23-ultra-smart-view-case',
  210000,
  NULL,
  'Samsung',
  'Smart View Case',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  updated_at = now();

-- 6. S25 Ultra Smart View Case
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
  'S25 Ultra Smart View Case',
  's25-ultra-smart-view-case',
  220000,
  NULL,
  'Samsung',
  'Smart View Case',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  updated_at = now();

-- 7. Galaxy Z Fold 6 S Pen Case
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
  'Galaxy Z Fold 6 S Pen Case',
  'galaxy-z-fold-6-s-pen-case',
  280000,
  NULL,
  'Samsung',
  'S Pen Case',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  updated_at = now();

-- 8. WiWU Travel Bag
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
  'WiWU Travel Bag',
  'wiwu-travel-bag',
  150000,
  NULL,
  'WiWU',
  'Travel Bag',
  'new',
  0,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  updated_at = now();

