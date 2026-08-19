CREATE TABLE public.interview_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_title TEXT NOT NULL,
    scenario_context TEXT NOT NULL,
    questions JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Set up RLS policies
ALTER TABLE public.interview_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to interview_tasks"
    ON public.interview_tasks
    FOR SELECT
    USING (true);

CREATE POLICY "Allow public insert access to interview_tasks"
    ON public.interview_tasks
    FOR INSERT
    WITH CHECK (true);
