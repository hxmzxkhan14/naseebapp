import { createClient } from '@supabase/supabase-js';

console.log('[Supabase] Initializing Supabase client...');

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('[Supabase] URL:', supabaseUrl ? 'Loaded' : 'MISSING or empty');
console.log('[Supabase] Anon Key:', supabaseAnonKey ? 'Loaded' : 'MISSING or empty');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('[Supabase] CRITICAL: Supabase URL or Anon Key is missing. Ensure .env file is set up and EXPO_PUBLIC_ variables are used.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('[Supabase] Supabase client instance created.');
