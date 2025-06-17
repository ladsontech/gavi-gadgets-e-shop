
-- Add featured field to products table if it doesn't exist
-- (This is safe to run even if the column already exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'is_featured'
    ) THEN
        ALTER TABLE public.products ADD COLUMN is_featured boolean DEFAULT false;
    END IF;
END $$;

-- Update any existing refurbished products to "used"
UPDATE public.products 
SET condition = 'used' 
WHERE condition = 'refurbished';
