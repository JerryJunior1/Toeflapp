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
          .select('score_details, score_value, task_id')
          .eq('user_id', user.id)
          .eq('task_type', 'take-interview');
          
        if (userSessions) {
          sessions = userSessions;
        }
      }
      
      const enhancedData = data.map(task => {
        // Find all sessions for this task and calculate the average score
        const taskSessions = sessions.filter(s => s.score_details?.taskId === task.id || s.task_id === task.id);
        let avgScore: string | null = null;
        if (taskSessions.length > 0) {
          const numerators = taskSessions
            .map(s => parseFloat(String(s.score_value).split('/')[0]))
            .filter(n => !isNaN(n));
          if (numerators.length > 0) {
            const avg = numerators.reduce((a, b) => a + b, 0) / numerators.length;
            avgScore = `${Math.round(avg * 10) / 10}/5`;
          }
        }
        return {
          ...task,
          lastScore: avgScore  // keep field name for UI compatibility
        };
      });
      
      return NextResponse.json(enhancedData);
    }

  } catch (error) {
    console.error("Error fetching interview tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}
