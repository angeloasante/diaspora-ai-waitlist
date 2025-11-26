import { createClient } from "@supabase/supabase-js";

// During build time, environment variables might not be available
// This creates a client that will work at runtime when env vars are present
export const supabase = createClient(
  process.env.SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_ANON_KEY || "placeholder-key"
);

// Runtime check for production usage
export function checkSupabaseConfig() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    throw new Error(
      "Missing required environment variables: SUPABASE_URL and SUPABASE_ANON_KEY"
    );
  }
}
