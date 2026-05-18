import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rnbexejsnwoxpgvcjsco.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_PTHaDxMF4_t4MvD8xsEi4Q_hcuIYVLt';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

