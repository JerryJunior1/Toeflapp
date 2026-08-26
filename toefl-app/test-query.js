const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkQuery() {
  const { data, error } = await supabase
    .from("practice_sessions")
    .select("task_id, score_value, created_at")
    .eq("task_type", "listen-and-repeat")
    .like("task_id", "tatiana-lr-test%");
    
  console.log("Error:", error);
}
checkQuery();
