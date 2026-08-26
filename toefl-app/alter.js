const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function run() {
  const client = new Client({
    connectionString: process.env.SUPABASE_DB_URL
  });
  await client.connect();
  
  try {
    const res = await client.query(`
      ALTER TABLE practice_sessions ALTER COLUMN task_id TYPE text;
    `);
    console.log("Success:", res);
  } catch(e) {
    console.error("Error altering table:", e);
  }
  
  await client.end();
}
run();
