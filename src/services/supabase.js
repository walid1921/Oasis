import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gkntcihsazzmsyyjjfny.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrbnRjaWhzYXp6bXN5eWpqZm55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA5NDA3MjgsImV4cCI6MjAxNjUxNjcyOH0.i941XCFJY7AdJPMFC6abQ1G3V1VfaNYYRWuV9yVyvFQ";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
