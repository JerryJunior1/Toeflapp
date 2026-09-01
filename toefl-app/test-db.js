const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.yeyczujtobwcrkwriiqr:O0aZQHf8nxgLH11w@aws-0-eu-central-1.pooler.supabase.com:6543/postgres' });
client.connect().then(() => client.query("SELECT * FROM practice_sessions WHERE task_type = 'take-interview' LIMIT 10")).then(res => { console.log(JSON.stringify(res.rows, null, 2)); client.end(); }).catch(console.error);
