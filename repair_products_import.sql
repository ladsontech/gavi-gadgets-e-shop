-- ============================================
-- GAVI GADGETS REPAIR PRODUCTS IMPORT
-- ============================================
-- This SQL script imports repair products for:
-- - LCD Screen Replacements
-- - Battery Replacements
-- - Camera Replacements
-- - Back Glass Replacements
-- ============================================

-- Step 1: Create Repair Categories (if they don't exist)
-- ============================================

DO $$
DECLARE
    lcd_category_id UUID;
    battery_category_id UUID;
    camera_category_id UUID;
    backglass_category_id UUID;
BEGIN
    -- Insert or get LCD Screens category
    INSERT INTO categories (name, slug, description, is_active)
    VALUES ('LCD Screens', 'lcd-screens', 'High-quality LCD screen replacements for all phone models', true)
    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO lcd_category_id;
    
    -- Insert or get Battery Replacement category
    INSERT INTO categories (name, slug, description, is_active)
    VALUES ('Battery Replacement', 'battery-replacement', 'Professional battery replacement services', true)
    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO battery_category_id;
    
    -- Insert or get Cameras category
    INSERT INTO categories (name, slug, description, is_active)
    VALUES ('Cameras', 'cameras', 'Front and back camera repairs and replacements', true)
    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO camera_category_id;
    
    -- Insert or get Back Glasses category
    INSERT INTO categories (name, slug, description, is_active)
    VALUES ('Back Glasses', 'back-glasses', 'Back glass replacement for damaged devices', true)
    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO backglass_category_id;
END $$;

-- Step 2: Insert LCD Screen Replacement Products
-- ============================================

-- iPhone XR LCD Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone XR LCD Screen Replacement Original',
    'iphone-xr-lcd-screen-replacement-original',
    'Apple',
    'iPhone XR',
    189000,
    NULL,
    'iPhone XR LCD Screen Replacement Original. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- iPhone 11 Pro Max Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone 11 Pro Max Screen Replacement Original LCD 6.5 INCH 3D Touch',
    'iphone-11-pro-max-screen-replacement-original-lcd-65-inch',
    'Apple',
    'iPhone 11 Pro Max',
    290000,
    NULL,
    'iPhone 11 Pro Max Screen Replacement Original LCD 6.5 INCH 3D touch and Display. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- iPhone 11 LCD Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone 11 LCD Screen Replacement Display 3D Touch 6.1 inch',
    'iphone-11-lcd-screen-replacement-display-3d-touch-61-inch',
    'Apple',
    'iPhone 11',
    165000,
    NULL,
    'iPhone 11 LCD Screen Replacement Display 3D Touch Digitizer Assembly 6.1 inch with true tone. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- Google Pixel 5 Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'Google Pixel 5 Original OLED LCD Screen Full Replacement',
    'google-pixel-5-original-oled-lcd-screen-full-replacement',
    'Google',
    'Pixel 5',
    300000,
    NULL,
    'Google Pixel 5 Original OLED LCD Screen Full Replacement. Eligible for Free Delivery. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- Google Pixel 6 Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'Google Pixel 6 OLED LCD Screen with Digitizer Full Replacement',
    'google-pixel-6-oled-lcd-screen-digitizer-full-replacement',
    'Google',
    'Pixel 6',
    650000,
    NULL,
    'Google Pixel 6 OLED LCD Screen with Digitizer Full Replacement. Eligible for Free Delivery. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    true,
    false
);

-- iPhone X LCD Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone X LCD Screen Replacement Original',
    'iphone-x-lcd-screen-replacement-original',
    'Apple',
    'iPhone X',
    185000,
    NULL,
    'iPhone X LCD Screen Replacement Original. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- iPhone XS LCD Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone XS LCD Screen Replacement 5.8 Inch Original',
    'iphone-xs-lcd-screen-replacement-58-inch-original',
    'Apple',
    'iPhone XS',
    185000,
    NULL,
    'iPhone XS LCD Screen Replacement 5.8 Inch Original. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- iPhone XS Max LCD Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone XS Max LCD Screen Replacement 6.5 inch Original',
    'iphone-xs-max-lcd-screen-replacement-65-inch-original',
    'Apple',
    'iPhone XS Max',
    225000,
    NULL,
    'iPhone XS Max LCD Screen Replacement 6.5 inch Original. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- iPhone 11 Pro LCD Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone 11 Pro LCD Screen Replacement Original 5.8 inch',
    'iphone-11-pro-lcd-screen-replacement-original-58-inch',
    'Apple',
    'iPhone 11 Pro',
    225000,
    NULL,
    'iPhone 11 Pro LCD Screen Replacement Original 5.8 inch. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- iPhone 12 LCD Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone 12 LCD Screen Replacement 6.1 inches Original',
    'iphone-12-lcd-screen-replacement-61-inches-original',
    'Apple',
    'iPhone 12',
    255000,
    NULL,
    'iPhone 12 LCD Screen Replacement 6.1 inches Original. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- iPhone 12 Pro LCD Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone 12 Pro LCD Screen Replacement Original 6.1 inches',
    'iphone-12-pro-lcd-screen-replacement-original-61-inches',
    'Apple',
    'iPhone 12 Pro',
    225000,
    NULL,
    'iPhone 12 Pro LCD Screen Replacement Original 6.1 inches. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- iPhone 12 Pro Max LCD Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone 12 Pro Max LCD Screen Replacement 6.7 inch Original',
    'iphone-12-pro-max-lcd-screen-replacement-67-inch-original',
    'Apple',
    'iPhone 12 Pro Max',
    355000,
    NULL,
    'iPhone 12 Pro Max LCD Screen Replacement 6.7 inch Original. Eligible for Free Delivery. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- iPhone 13 LCD Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone 13 LCD Screen Replacement 6.1 inch Original',
    'iphone-13-lcd-screen-replacement-61-inch-original',
    'Apple',
    'iPhone 13',
    365000,
    NULL,
    'iPhone 13 LCD Screen Replacement 6.1 inch Original. Eligible for Free Delivery. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    true,
    false
);

-- iPhone 14 LCD Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone 14 LCD Screen Replacement 6.7 inch Original',
    'iphone-14-lcd-screen-replacement-67-inch-original',
    'Apple',
    'iPhone 14',
    395000,
    NULL,
    'iPhone 14 LCD Screen Replacement 6.7 inch Original. Eligible for Free Delivery. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    true,
    false
);

-- iPhone 7 LCD Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone 7 LCD Screen Replacement 4.7 inch Original',
    'iphone-7-lcd-screen-replacement-47-inch-original',
    'Apple',
    'iPhone 7',
    100000,
    NULL,
    'iPhone 7 LCD Screen Replacement 4.7 inch Original. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- iPhone 7 Plus LCD Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone 7 Plus LCD Screen Replacement 5.5 inch Original',
    'iphone-7-plus-lcd-screen-replacement-55-inch-original',
    'Apple',
    'iPhone 7 Plus',
    110000,
    NULL,
    'iPhone 7 Plus LCD Screen Replacement 5.5 inch Original. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- Google Pixel 6A LCD Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'Google Pixel 6A LCD Original Screen Replacement',
    'google-pixel-6a-lcd-original-screen-replacement',
    'Google',
    'Pixel 6A',
    500000,
    NULL,
    'Google Pixel 6A LCD Original Screen Replacement. Eligible for Free Delivery. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- Google Pixel 4a 5G Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'Google Pixel 4a 5G Original OLED LCD Screen Replacement',
    'google-pixel-4a-5g-original-oled-lcd-screen-replacement',
    'Google',
    'Pixel 4a 5G',
    270000,
    NULL,
    'Google Pixel 4a 5G Original OLED LCD Screen Replacement. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- Google Pixel 6 Pro Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'Google Pixel 6 Pro Original LCD AMOLED Screen Replacement',
    'google-pixel-6-pro-original-lcd-amoled-screen-replacement',
    'Google',
    'Pixel 6 Pro',
    750000,
    NULL,
    'Google Pixel 6 Pro Original LCD AMOLED Screen Replacement. Eligible for Free Delivery. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    true,
    false
);

-- Samsung S20 Ultra 5G Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'S20 Ultra 5G Original Super AMOLED Screen Replacement',
    's20-ultra-5g-original-super-amoled-screen-replacement',
    'Samsung',
    'Galaxy S20 Ultra 5G',
    900000,
    NULL,
    'S20 Ultra 5G Original Super AMOLED Screen Replacement. Eligible for Free Delivery. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    true,
    false
);

-- Samsung S21 Ultra 5G Screen
INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'Galaxy S21 Ultra 5G Screen Replacement Original Super AMOLED LCD',
    'galaxy-s21-ultra-5g-screen-replacement-original-super-amoled-lcd',
    'Samsung',
    'Galaxy S21 Ultra 5G',
    1000000,
    NULL,
    'Galaxy S21 Ultra 5G Screen Replacement Original Super AMOLED LCD. Eligible for Free Delivery. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'lcd-screens'),
    ARRAY['/placeholder.svg'],
    true,
    true
);

-- Step 3: Insert Back Glass Products
-- ============================================

INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone 12 Pro Max Back Glass Cover Replacement',
    'iphone-12-pro-max-back-glass-cover-replacement',
    'Apple',
    'iPhone 12 Pro Max',
    150000,
    NULL,
    'iPhone 12 Pro Max Back Glass Cover Replacement. Professional installation available. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'back-glasses'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- Step 4: Insert Battery Products
-- ============================================

INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'Battery Replacement for iPhone X 2716mAh Li-ion',
    'battery-replacement-for-iphone-x-2716mah-li-ion',
    'Apple',
    'iPhone X',
    95000,
    NULL,
    'Battery Replacement for iPhone X 2716mAh Li-ion. Original quality battery with professional installation. Warranty protection policy applies for all UK-used products.',
    'new',
    10,
    true,
    (SELECT id FROM categories WHERE slug = 'battery-replacement'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- Step 5: Insert Camera Products
-- ============================================

INSERT INTO products (
    name, slug, brand, model, price, original_price,
    description, condition, stock_quantity, is_active,
    category_id, images, is_featured, is_weekly_offer
)
VALUES (
    'iPhone 12 Pro Max Original Back Facing Camera Replacement',
    'iphone-12-pro-max-original-back-facing-camera-replacement',
    'Apple',
    'iPhone 12 Pro Max',
    100000,
    NULL,
    'iPhone 12 Pro Max Original Back Facing Camera Replacement. Restore your camera functionality with original parts. Warranty protection policy applies for all UK-used products.',
    'new',
    5,
    true,
    (SELECT id FROM categories WHERE slug = 'cameras'),
    ARRAY['/placeholder.svg'],
    false,
    false
);

-- ============================================
-- SUMMARY
-- ============================================
-- Total Products Inserted: 24
-- Categories Created:
--   - LCD Screens (19 products)
--   - Battery Replacement (1 product)
--   - Cameras (1 product)
--   - Back Glasses (1 product)
--
-- Brands: Apple, Google, Samsung
-- Price Range: UGX 95,000 - UGX 1,000,000
--
-- Next Steps:
-- 1. Update product images
-- 2. Adjust stock quantities as needed
-- 3. Set featured products
-- 4. Configure weekly offers
-- ============================================

-- Verification Query
SELECT 
    c.name as category,
    COUNT(p.id) as product_count,
    MIN(p.price) as min_price,
    MAX(p.price) as max_price
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
WHERE c.slug IN ('lcd-screens', 'battery-replacement', 'cameras', 'back-glasses')
GROUP BY c.name
ORDER BY product_count DESC;

