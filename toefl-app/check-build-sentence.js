const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// We use the anon key but bypass RLS by just using Postgres directly? No, I can't.
// Let's check using pg client!
const { Client } = require('pg');
const client = new Client({ connectionString: process.env.SUPABASE_DB_URL });

async function main() {
  await client.connect();
  const res = await client.query("SELECT task_type, score_value, score_details FROM practice_sessions WHERE task_type = 'build-sentence'");
  console.log("Total build-sentence:", res.rows.length);
  console.log(res.rows.slice(0, 5));
  await client.end();
}

main().catch(console.error);
