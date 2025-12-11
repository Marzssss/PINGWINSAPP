import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase env vars are missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

