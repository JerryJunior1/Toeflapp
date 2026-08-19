import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const taskTypeMap: Record<string, string> = {
  'write-email': 'Write an Email',
  'academic-discussion': 'Academic Discussion',
  'build-a-sentence': 'Build a Sentence',
  'take-interview': 'Take an Interview',
  'listen-and-repeat': 'Listen & Repeat',
};

export default async function ReviewPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  const { data: sessions } = await supabase
    .from('practice_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-primary mb-2">Review Past Practices</h1>
        <p className="text-on-surface-variant">
          Review your past practice sessions, AI feedback, and progress across all tasks.
        </p>
      </div>

      {(!sessions || sessions.length === 0) ? (
        <div className="bg-surface-container-low p-8 rounded-xl text-center border border-outline-variant">
          <p className="text-on-surface-variant font-medium">You have not completed any practice sessions yet.</p>
          <p className="text-sm mt-2 text-on-surface-variant/80">Complete a practice task from the sidebar to see your feedback here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <details key={session.id} className="group bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-sm">
              <summary className="cursor-pointer p-5 flex flex-col md:flex-row md:justify-between md:items-center hover:bg-surface-container-lowest transition-colors list-none gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined">
                      {session.task_type.includes('speaking') || session.task_type.includes('interview') || session.task_type.includes('listen') ? 'mic' : 'edit_document'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-on-surface">
                      {taskTypeMap[session.task_type] || session.task_type}
                    </h3>
                    <p className="text-sm text-on-surface-variant font-medium mt-0.5">
                      {new Date(session.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-0.5">Score</p>
                    <p className="text-xl font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg inline-block">
                      {session.score_value || 'N/A'}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform shrink-0">
                    expand_more
                  </span>
                </div>
              </summary>
              
              <div className="p-6 border-t border-outline-variant bg-surface-container-lowest">
                {session.score_details ? (
                  <div className="space-y-8">
                    {/* Transcript if speaking */}
                    {session.score_details.transcript && (
                      <div>
                        <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[20px]">transcribe</span>
                          Your Transcript
                        </h4>
                        <p className="text-on-surface bg-surface-container-low p-4 rounded-xl italic leading-relaxed text-[15px]">
                          "{session.score_details.transcript}"
                        </p>
                      </div>
                    )}
                    
                    {/* Overall Feedback */}
                    {session.score_details.overallFeedback && (
                      <div>
                        <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[20px]">feedback</span>
                          Overall Feedback
                        </h4>
                        <p className="text-on-surface leading-relaxed text-[15px]">{session.score_details.overallFeedback}</p>
                      </div>
                    )}
                    
                    {/* Strengths & Weaknesses */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {session.score_details.strengths && session.score_details.strengths.length > 0 && (
                        <div className="bg-success-container/30 border border-success/20 p-5 rounded-xl">
                          <h4 className="font-bold text-success flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                            Strengths
                          </h4>
                          <ul className="list-disc list-outside ml-4 text-[14px] text-on-surface-variant space-y-2">
                            {session.score_details.strengths.map((s: string, i: number) => <li key={i} className="pl-1">{s}</li>)}
                          </ul>
                        </div>
                      )}
                      
                      {session.score_details.weaknesses && session.score_details.weaknesses.length > 0 && (
                        <div className="bg-error-container/20 border border-error/20 p-5 rounded-xl">
                          <h4 className="font-bold text-error flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[18px]">trending_down</span>
                            Areas to Improve
                          </h4>
                          <ul className="list-disc list-outside ml-4 text-[14px] text-on-surface-variant space-y-2">
                            {session.score_details.weaknesses.map((w: string, i: number) => <li key={i} className="pl-1">{w}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {/* Grammar Corrections */}
                    {session.score_details.grammarCorrections && session.score_details.grammarCorrections.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[20px]">spellcheck</span>
                          Grammar & Usage Corrections
                        </h4>
                        <div className="space-y-4">
                          {session.score_details.grammarCorrections.map((g: any, i: number) => (
                            <div key={i} className="bg-surface-container-low p-4 rounded-xl text-sm border-l-4 border-warning shadow-sm">
                              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                                <p className="line-through text-error bg-error-container/20 px-2 py-1 rounded inline-block w-fit">
                                  {g.original}
                                </p>
                                <span className="hidden md:inline material-symbols-outlined text-outline-variant text-[16px]">arrow_forward</span>
                                <p className="text-success font-bold bg-success-container/30 px-2 py-1 rounded inline-block w-fit">
                                  {g.corrected}
                                </p>
                              </div>
                              <p className="text-on-surface-variant mt-2 text-[14px] bg-surface-container p-3 rounded-lg">
                                {g.explanation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Ideal Response */}
                    {session.score_details.idealResponse && (
                      <div>
                        <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[20px]">model_training</span>
                          Ideal Response (Model 5/5)
                        </h4>
                        <p className="text-on-surface bg-primary/5 border border-primary/10 p-5 rounded-xl leading-relaxed text-[15px]">
                          {session.score_details.idealResponse}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-on-surface-variant italic text-center py-4">No detailed AI feedback available for this session.</p>
                )}
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
