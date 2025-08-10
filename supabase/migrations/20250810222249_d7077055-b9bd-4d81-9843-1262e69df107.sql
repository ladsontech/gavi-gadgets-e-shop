
-- Add weekly offers column to products table
ALTER TABLE public.products 
ADD COLUMN is_weekly_offer boolean DEFAULT false,
ADD COLUMN offer_start_date timestamp with time zone,
ADD COLUMN offer_end_date timestamp with time zone;

-- Create index for better performance when querying weekly offers
CREATE INDEX idx_products_weekly_offers ON public.products(is_weekly_offer, offer_start_date, offer_end_date) WHERE is_weekly_offer = true;

-- Create function to automatically expire weekly offers
CREATE OR REPLACE FUNCTION expire_weekly_offers()
RETURNS void AS $$
BEGIN
  UPDATE public.products 
  SET is_weekly_offer = false,
      offer_start_date = NULL,
      offer_end_date = NULL
  WHERE is_weekly_offer = true 
    AND offer_end_date < now();
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically expire offers when queried
CREATE OR REPLACE FUNCTION check_offer_expiry()
RETURNS trigger AS $$
BEGIN
  -- Check if offer has expired on any read operation
  IF NEW.is_weekly_offer = true AND NEW.offer_end_date < now() THEN
    NEW.is_weekly_offer = false;
    NEW.offer_start_date = NULL;
    NEW.offer_end_date = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger on updates
CREATE TRIGGER trigger_check_offer_expiry
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION check_offer_expiry();
