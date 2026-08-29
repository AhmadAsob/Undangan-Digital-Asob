import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tmfbbtbcrvnkqxaxibos.supabase.co';
const supabaseKey = 'sb_publishable_Rddb0yoyMBEBu2IrArsShw_syYSHnkO';

export const supabase = createClient(supabaseUrl, supabaseKey);
