// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pcaplvrfswgtrtgkftif.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjYXBsdnJmc3dndHJ0Z2tmdGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NzU3OTQsImV4cCI6MjA1ODU1MTc5NH0.pE1IteCaYpPvuN2ZjlxoRLt-gbqVWZkSEr3zV-SYyKU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);