CREATE TABLE IF NOT EXISTS public.practice_sessions (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    task_id UUID NOT NULL,
    task_type TEXT NOT NULL,
    score_value TEXT,
    score_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own practice sessions" 
ON public.practice_sessions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own practice sessions" 
ON public.practice_sessions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own practice sessions" 
ON public.practice_sessions FOR UPDATE 
USING (auth.uid() = user_id);
