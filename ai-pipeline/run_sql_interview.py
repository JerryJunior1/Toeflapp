import os
import psycopg2
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv

load_dotenv("../toefl-app/.env.local")

password = "O0aZQHf8nxgLH11w" 
host = "aws-0-eu-central-1.pooler.supabase.com"
db_url = f"postgresql://postgres.yeyczujtobwcrkwriiqr:{password}@{host}:6543/postgres"

print(f"Connecting to {host}:5432...")

try:
    conn = psycopg2.connect(db_url)
    conn.autocommit = True
    cur = conn.cursor()

    sql = """
    CREATE TABLE IF NOT EXISTS public.interview_tasks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        task_title TEXT NOT NULL,
        scenario_context TEXT NOT NULL,
        questions JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    ALTER TABLE public.interview_tasks ENABLE ROW LEVEL SECURITY;

    DO $$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'interview_tasks' AND policyname = 'Allow public read access to interview_tasks') THEN
            CREATE POLICY "Allow public read access to interview_tasks"
                ON public.interview_tasks
                FOR SELECT
                USING (true);
        END IF;
    END
    $$;

    DO $$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_policies WHERE tablename = 'interview_tasks' AND policyname = 'Allow public insert access to interview_tasks') THEN
            CREATE POLICY "Allow public insert access to interview_tasks"
                ON public.interview_tasks
                FOR INSERT
                WITH CHECK (true);
        END IF;
    END
    $$;
    """

    cur.execute(sql)
    print("Table and policies created successfully!")
    cur.close()
    conn.close()
except Exception as e:
    print("Error:", e)
