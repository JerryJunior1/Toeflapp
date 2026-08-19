import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const supabase = await createClient();

    if (id) {
      // Fetch specific task
      const { data, error } = await supabase
        .from('interview_tasks')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return NextResponse.json(data);
    } else {
      // Fetch all tasks for the list view
      const { data, error } = await supabase
        .from('interview_tasks')
        .select('id, task_title, scenario_context, category, created_at');
        
      if (error) throw error;
      
      const { data: { user } } = await supabase.auth.getUser();
      let sessions: any[] = [];
      
      if (user) {
        const { data: userSessions } = await supabase
          .from('practice_sessions')
          .select('task_id, score_value')
          .eq('user_id', user.id)
          .eq('task_type', 'take-interview')
          .order('created_at', { ascending: false });
          
        if (userSessions) {
          sessions = userSessions;
        }
      }
      
      const enhancedData = data.map(task => {
        // Find the first matching session (since they are ordered by created_at descending)
        const lastSession = sessions.find(s => s.task_id === task.id);
        return {
          ...task,
          lastScore: lastSession ? lastSession.score_value : null
        };
      });
      
      return NextResponse.json(enhancedData);
    }

  } catch (error) {
    console.error("Error fetching interview tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}
