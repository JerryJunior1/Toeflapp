const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkTables() {
  const { data, error } = await supabase.from('practice_sessions').select('*').limit(1);
  if (error) {
    console.log("Error querying practice_sessions:", error);
  } else {
    console.log("Query succeeded, rows:", data.length);
  }
}
checkTables();
