-- Enable admins to read and manage orders
-- Drop existing restrictive policies and create proper ones

-- Orders table policies
DROP POLICY IF EXISTS "Allow public insert to orders" ON public.orders;

CREATE POLICY "Allow public insert to orders"
  ON public.orders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read orders"
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update orders"
  ON public.orders
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Order items table policies
DROP POLICY IF EXISTS "Allow public insert to order_items" ON public.order_items;

CREATE POLICY "Allow public insert to order_items"
  ON public.order_items
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read order_items"
  ON public.order_items
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update order_items"
  ON public.order_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);