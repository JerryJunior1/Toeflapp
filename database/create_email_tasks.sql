CREATE TABLE public.email_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_category TEXT NOT NULL,
    task_title TEXT NOT NULL,
    prompt_scenario TEXT NOT NULL,
    prompt_instructions TEXT NOT NULL,
    model_response TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Set up RLS policies
ALTER TABLE public.email_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to email_tasks"
    ON public.email_tasks
    FOR SELECT
    USING (true);

CREATE POLICY "Allow public insert access to email_tasks"
    ON public.email_tasks
    FOR INSERT
    WITH CHECK (true);
