import { environment } from 'src/environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js'


export const supabase = createClient(environment.supabaseUrl, environment.supabaseKey)