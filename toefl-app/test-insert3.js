const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkSchema() {
  const { error: insertError } = await supabase.from('practice_sessions').insert({
    user_id: '00000000-0000-0000-0000-000000000000',
    task_type: 'listen-and-repeat',
    score_value: '4/5',
    score_details: { taskId: 'tatiana-lr-test1-s1' }
  });
  console.log("Insert error without task_id:", insertError);
}
checkSchema();
