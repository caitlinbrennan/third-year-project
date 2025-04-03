import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aoesmwcahajxuceweegh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvZXNtd2NhaGFqeHVjZXdlZWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NTUzNTIsImV4cCI6MjA1MzAzMTM1Mn0.5VS7oPNphGRA-naaxCcUSvocQ_5ozh4-R68m4Bxswqw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
