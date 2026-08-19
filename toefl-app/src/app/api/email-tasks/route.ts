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
        .from('email_tasks')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return NextResponse.json(data);
    } else {
      // Fetch all tasks for the list view
      const { data, error } = await supabase
        .from('email_tasks')
        .select('id, topic_category, task_title, created_at');
        
      if (error) throw error;

      // Sort tasks logically by number in the title
      data.sort((a, b) => {
        // Extract leading number if it exists (e.g., "1.", "10." or "Task 1")
        const aMatch = a.task_title.match(/(\d+)/);
        const bMatch = b.task_title.match(/(\d+)/);
        
        if (aMatch && bMatch) {
          return parseInt(aMatch[1]) - parseInt(bMatch[1]);
        }
        return a.task_title.localeCompare(b.task_title);
      });
      
      const { data: { user } } = await supabase.auth.getUser();
      let sessions: any[] = [];
      
      if (user) {
        const { data: userSessions } = await supabase
          .from('practice_sessions')
          .select('task_id, score_value')
          .eq('user_id', user.id)
          .eq('task_type', 'write-email')
          .order('created_at', { ascending: false });
          
        if (userSessions) {
          sessions = userSessions;
        }
      }
      
      const enhancedData = data.map(task => {
        const lastSession = sessions.find(s => s.task_id === task.id);
        return {
          ...task,
          lastScore: lastSession ? lastSession.score_value : null
        };
      });
      
      return NextResponse.json(enhancedData);
    }

  } catch (error) {
    console.error("Error fetching email tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}
