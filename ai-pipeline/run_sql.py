import os
import psycopg2
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv

load_dotenv("../toefl-app/.env.local")

# We use port 5432 (direct connection) to avoid pooler tenant issues.
# Supabase direct connection user is always 'postgres'
password = "O0aZQHf8nxgLH11w" 
host = "aws-0-eu-central-1.pooler.supabase.com"
db_url = f"postgresql://postgres:{password}@{host}:5432/postgres"

print(f"Connecting to {host}:5432...")

try:
    conn = psycopg2.connect(db_url)
    conn.autocommit = True
    cur = conn.cursor()

    sql = """
    CREATE POLICY "Allow public insert access to email_tasks"
        ON public.email_tasks
        FOR INSERT
        WITH CHECK (true);
    """

    cur.execute(sql)
    print("Policy created successfully!")
    cur.close()
    conn.close()
except Exception as e:
    print("Error:", e)
