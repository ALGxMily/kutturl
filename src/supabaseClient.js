import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL ||
  "https://cors-anywhere.herokuapp.com/https://zekozunyhyoyljkqghmm.supabase.co";
const supabaseAnonKey =
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpla296dW55aHlveWxqa3FnaG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY5MDQ3MjIsImV4cCI6MTk4MjQ4MDcyMn0.Y6p3YmX4wgRL4D6Uja5rXRJu9xCfD2j4y9vLXLknr6I";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
