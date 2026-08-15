import { createClient } from '@supabase/supabase-js';

const URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Without this guard a missing variable throws from deep inside supabase-js
// with no hint that the real problem is a missing .env file.
if (!URL || !API_KEY) {
  throw new Error(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Copy .env.example to .env, fill in your Supabase project values, then restart the dev server.',
  );
}

export const supabase = createClient(URL, API_KEY);
