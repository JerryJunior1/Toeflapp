const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkSchema() {
  const { data, error } = await supabase.rpc('get_schema_info');
  // Since we don't have rpc, let's just insert a dummy row and see the error.
  const { error: insertError } = await supabase.from('practice_sessions').insert({
    user_id: '00000000-0000-0000-0000-000000000000',
    task_id: 'test',
    task_type: 'test',
    score_value: '4/5',
    score_details: {}
  });
  console.log("Insert error:", insertError);
}
checkSchema();
