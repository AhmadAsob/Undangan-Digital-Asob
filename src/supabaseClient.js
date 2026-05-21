import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqkeykmxnbkbsmtjmnsv.supabase.co';
const supabaseKey = 'sb_publishable_twtLzFmfbqsPeU05myO_4Q_F2tqEgFu';

export const supabase = createClient(supabaseUrl, supabaseKey);
