-- SQL UPSERT commands to update speaker product names to include "Speaker" keyword
-- This ensures they display correctly on the speakers category page
-- The filter logic checks for products with "speaker" in the name

-- Update JBL Go 4 products
UPDATE public.products 
SET name = 'JBL Go 4 Bluetooth Speaker',
    updated_at = now()
WHERE slug = 'jbl-go-4-black';

UPDATE public.products 
SET name = 'JBL Go 4 Bluetooth Speaker',
    updated_at = now()
WHERE slug = 'jbl-go-4-blue';

-- Update JBL Clip 5 products
UPDATE public.products 
SET name = 'JBL Clip 5 Portable Speaker',
    updated_at = now()
WHERE slug = 'jbl-clip-5-black';

UPDATE public.products 
SET name = 'JBL Clip 5 Portable Speaker',
    updated_at = now()
WHERE slug = 'jbl-clip-5-blue';

UPDATE public.products 
SET name = 'JBL Clip 5 Portable Speaker',
    updated_at = now()
WHERE slug = 'jbl-clip-5-army';

-- Update JBL Flip 6 products
UPDATE public.products 
SET name = 'JBL Flip 6 Waterproof Speaker',
    updated_at = now()
WHERE slug = 'jbl-flip-6-blue';

UPDATE public.products 
SET name = 'JBL Flip 6 Waterproof Speaker',
    updated_at = now()
WHERE slug = 'jbl-flip-6-green';

UPDATE public.products 
SET name = 'JBL Flip 6 Waterproof Speaker',
    updated_at = now()
WHERE slug = 'jbl-flip-6-red';

UPDATE public.products 
SET name = 'JBL Flip 6 Waterproof Speaker',
    updated_at = now()
WHERE slug = 'jbl-flip-6-pink';

UPDATE public.products 
SET name = 'JBL Flip 6 Waterproof Speaker',
    updated_at = now()
WHERE slug = 'jbl-flip-6-black';

-- Update JBL Flip 7 products
UPDATE public.products 
SET name = 'JBL Flip 7 Waterproof Speaker',
    updated_at = now()
WHERE slug = 'jbl-flip-7-black';

UPDATE public.products 
SET name = 'JBL Flip 7 Waterproof Speaker',
    updated_at = now()
WHERE slug = 'jbl-flip-7-red';

UPDATE public.products 
SET name = 'JBL Flip 7 Waterproof Speaker',
    updated_at = now()
WHERE slug = 'jbl-flip-7-army';

-- Update JBL Charge 5 products
UPDATE public.products 
SET name = 'JBL Charge 5 Portable Speaker',
    updated_at = now()
WHERE slug = 'jbl-charge-5-black';

UPDATE public.products 
SET name = 'JBL Charge 5 Portable Speaker',
    updated_at = now()
WHERE slug = 'jbl-charge-5-blue';

-- Update JBL Charge 6
UPDATE public.products 
SET name = 'JBL Charge 6 Portable Speaker',
    updated_at = now()
WHERE slug = 'jbl-charge-6-black';

-- Update JBL Extreme 4 products
UPDATE public.products 
SET name = 'JBL Extreme 4 Rugged Speaker',
    updated_at = now()
WHERE slug = 'jbl-extreme-4-army';

UPDATE public.products 
SET name = 'JBL Extreme 4 Rugged Speaker',
    updated_at = now()
WHERE slug = 'jbl-extreme-4-blue';

-- Update JBL Studio 9
UPDATE public.products 
SET name = 'JBL Studio 9 Premium Speaker',
    updated_at = now()
WHERE slug = 'jbl-studio-9-black';

-- Update JBL Boom X3 products
UPDATE public.products 
SET name = 'JBL Boom X3 Party Speaker',
    updated_at = now()
WHERE slug = 'jbl-boom-x3-black';

UPDATE public.products 
SET name = 'JBL Boom X3 Party Speaker',
    updated_at = now()
WHERE slug = 'jbl-boom-x3-army';

-- Update JBL Wireless Microphone
UPDATE public.products 
SET name = 'JBL Wireless Microphone Speaker System (Pair of 2)',
    updated_at = now()
WHERE slug = 'jbl-wireless-microphone-pair-black';

-- Verify changes - select all updated speaker products
SELECT name, slug, price FROM public.products 
WHERE slug LIKE 'jbl-%' OR slug = 'sound-bar-21-deep-bass-mk2'
ORDER BY name;

