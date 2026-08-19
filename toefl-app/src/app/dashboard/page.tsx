import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  const fullName = user.user_metadata?.full_name || 'Student';
  const firstName = fullName.split(' ')[0];
  const targetScore = user.user_metadata?.target_score || '110';

  // Fetch all practice sessions
  const { data: sessions } = await supabase
    .from('practice_sessions')
    .select('id, task_type, score_value, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Calculate Averages
  let speakingSum = 0, speakingCount = 0;
  let writingSum = 0, writingCount = 0;

  const getScoreNumber = (score: string | null) => {
    if (!score) return 0;
    const match = score.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const speakingTasks = ['take-interview', 'listen-and-repeat'];
  const writingTasks = ['write-email', 'academic-discussion', 'build-a-sentence'];

  const todayStr = new Date().toISOString().split('T')[0];
  let todayCount = 0;
  const DAILY_GOAL = 3;

  const recentSessions = (sessions || []).slice(0, 5);

  (sessions || []).forEach(session => {
    const scoreNum = getScoreNumber(session.score_value);
    if (speakingTasks.includes(session.task_type)) {
      speakingSum += scoreNum;
      speakingCount++;
    } else if (writingTasks.includes(session.task_type)) {
      writingSum += scoreNum;
      writingCount++;
    }

    if (session.created_at.startsWith(todayStr)) {
      todayCount++;
    }
  });

  // Convert out of 5 to out of 30
  const speakingAvg = speakingCount > 0 ? Math.round((speakingSum / speakingCount) * 6) : 0;
  const writingAvg = writingCount > 0 ? Math.round((writingSum / writingCount) * 6) : 0;
  
  const dailyPercentage = Math.min(100, Math.round((todayCount / DAILY_GOAL) * 100));

  const formatTaskType = (type: string) => {
    return type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };
  
  const getTaskIcon = (type: string) => {
    if (speakingTasks.includes(type)) return 'record_voice_over';
    return 'edit_document';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return `Today, ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    }
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    }
    
    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  // Determine Next Step
  const nextStepLink = speakingCount < writingCount 
    ? "/practice/speaking/take-interview" 
    : "/practice/writing/academic-discussion";
  
  const nextStepTitle = speakingCount < writingCount 
    ? "Take an Interview" 
    : "Academic Discussion Writing";

  const nextStepDesc = speakingCount < writingCount 
    ? "Improve your verbal communication and quick thinking in a simulated interview."
    : "Focus on expressing and supporting your opinion clearly in a discussion board format.";

  return (
    <div className="max-w-[var(--spacing-container-max)] mx-auto space-y-8 pb-20">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="font-headline text-[32px] font-bold text-on-surface mb-2">Welcome back, {firstName}.</h2>
          <p className="text-[18px] text-on-surface-variant">You're on track for your target score of {targetScore}. Keep up the disciplined work.</p>
        </div>
        
        <div className="card p-4 rounded flex items-center gap-4 shrink-0">
          <div className="w-16 h-16 relative">
            <svg className="w-full h-full text-primary -rotate-90" viewBox="0 0 36 36">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle" strokeDasharray={`${dailyPercentage}, 100`} stroke="currentColor" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">Daily Goal</p>
            <p className="font-headline text-[24px] font-bold text-primary">{dailyPercentage}%</p>
            <p className="text-[12px] font-semibold text-on-surface-variant">{todayCount} / {DAILY_GOAL} tasks completed</p>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-6 rounded flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-primary">mic</span>
          </div>
          <div>
            <p className="text-[14px] text-on-surface-variant mb-1">Speaking Avg.</p>
            <div className="flex items-baseline gap-2">
              <h3 className="font-headline text-[32px] font-bold text-on-surface">{speakingAvg}</h3>
              <span className="text-[12px] font-semibold text-on-surface-variant">/30</span>
            </div>
          </div>
        </div>

        <div className="card p-6 rounded flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-primary">edit_note</span>
          </div>
          <div>
            <p className="text-[14px] text-on-surface-variant mb-1">Writing Avg.</p>
            <div className="flex items-baseline gap-2">
              <h3 className="font-headline text-[32px] font-bold text-on-surface">{writingAvg}</h3>
              <span className="text-[12px] font-semibold text-on-surface-variant">/30</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions & Recent */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recommended Next Step */}
        <div className="card p-6 rounded flex flex-col gap-4 h-fit">
          <h3 className="font-headline text-[24px] font-bold text-on-surface">Recommended Next Step</h3>
          <div className="bg-surface-container-low p-4 rounded-lg border border-surface-variant flex gap-4 items-start">
             <div className="bg-primary-container text-white p-2 rounded shrink-0">
               <span className="material-symbols-outlined">forum</span>
             </div>
             <div>
               <h4 className="text-[16px] font-medium text-on-surface">{nextStepTitle}</h4>
               <p className="text-[14px] text-on-surface-variant mt-1 mb-3">{nextStepDesc}</p>
               <Link href={nextStepLink} className="inline-block bg-primary text-white text-[14px] font-medium px-4 py-2 rounded hover:bg-primary-container transition-colors">Start Practice</Link>
             </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6 rounded flex flex-col gap-4">
          <h3 className="font-headline text-[24px] font-bold text-on-surface">Recent Activity</h3>
          {recentSessions.length === 0 ? (
            <p className="text-[14px] text-on-surface-variant">No recent activity yet. Start a practice task!</p>
          ) : (
            <ul className="space-y-4">
               {recentSessions.map((session: any, idx: number) => (
                 <li key={session.id} className={`flex justify-between items-center ${idx !== recentSessions.length - 1 ? 'border-b border-surface-variant pb-2' : ''}`}>
                   <div className="flex items-center gap-3">
                     <span className="material-symbols-outlined text-outline">{getTaskIcon(session.task_type)}</span>
                     <div>
                       <p className="text-[14px] font-medium text-on-surface">{formatTaskType(session.task_type)}</p>
                       <p className="text-[12px] text-on-surface-variant">{formatDate(session.created_at)}</p>
                     </div>
                   </div>
                   <span className="bg-primary-container/20 text-primary-container text-[12px] font-semibold px-2 py-1 rounded">
                     {session.score_value ? `Scored: ${session.score_value}` : 'Completed'}
                   </span>
                 </li>
               ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
