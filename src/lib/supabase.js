import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rnbexejsnwoxpgvcjsco.supabase.co';
const supabaseAnonKey = 'sb_publishable_PTHaDxMF4_t4MvD8xsEi4Q_hcuIYVLt';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
