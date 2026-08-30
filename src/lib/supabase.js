import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL in .env');
}

if (!supabasePublishableKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY in .env');
}

console.log('Supabase URL:', supabaseUrl);
console.log(
  'Supabase publishable key loaded:',
  supabasePublishableKey.startsWith('sb_publishable_')
);

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);