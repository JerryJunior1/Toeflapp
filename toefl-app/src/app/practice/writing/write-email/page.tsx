"use client";

import { useState, useEffect, useRef } from 'react';

interface EmailTaskData {
  topicCategory: string;
  taskTitle: string;
  promptScenario: string;
  promptInstructions: string;
  modelResponse: string;
}

export default function WriteEmail() {
  const [tasksList, setTasksList] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<EmailTaskData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Practice state
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gradingResult, setGradingResult] = useState<any>(null);
  const [gradingError, setGradingError] = useState<string | null>(null);
  
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await fetch('/api/email-tasks');
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to fetch tasks');
        setTasksList(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchList();
  }, []);

  const handleSelectTask = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/email-tasks?id=${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to fetch task details');
      
      setSelectedTask({
        topicCategory: json.topic_category,
        taskTitle: json.task_title,
        promptScenario: json.prompt_scenario,
        promptInstructions: json.prompt_instructions,
        modelResponse: json.model_response,
      });
      setTimeLeft(420); // 7 minutes
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0 && !gradingResult && !isSubmitting) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0 && !gradingResult && !isSubmitting) {
      // Auto-submit when time runs out
      handleSubmit();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, gradingResult, isSubmitting]);

  const handleBack = () => {
    setSelectedTask(null);
    setResponse("");
    setGradingResult(null);
    setGradingError(null);
    setTimeLeft(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  if (loading && !selectedTask) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-12">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-on-surface-variant text-[16px] font-medium">Loading practice library...</p>
      </div>
    );
  }

  if (error && !selectedTask) {
    return (
      <div className="w-full p-8 text-center">
        <div className="inline-block p-4 bg-error-container text-on-error-container rounded-lg">
          <span className="material-symbols-outlined mb-2 text-[32px]">error</span>
          <p className="font-bold">Failed to load practice</p>
          <p className="text-[14px] mt-1">{error}</p>
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  if (!selectedTask) {
    return (
      <div className="w-full max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-6">
        <div className="card rounded-xl p-8 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[24px]">mail</span>
            <span className="text-[16px] font-semibold text-primary uppercase tracking-wider">Practice Library</span>
          </div>
          <h1 className="font-headline text-[32px] font-bold text-on-surface">Write an Email Tasks</h1>
          <p className="text-[16px] text-on-surface-variant leading-relaxed mb-6">
            Select an email scenario from the library below to begin your practice. The library is divided into two parts based on the official practice materials.
          </p>
          
          {tasksList.length === 0 ? (
             <div className="p-8 text-center bg-surface-container-low rounded-xl border border-dashed border-surface-variant">
               <p className="text-on-surface-variant">No tasks found. Your database might be empty!</p>
             </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-[20px] font-bold text-on-surface mb-4 border-b border-surface-variant pb-2">Part 1 (40 Tasks)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tasksList.filter(t => t.task_title.includes('of 40')).map((task) => (
                    <div 
                      key={task.id} 
                      onClick={() => handleSelectTask(task.id)}
                      className="bg-surface-container-low border border-surface-variant rounded-xl p-6 cursor-pointer hover:border-primary hover:shadow-md transition-all group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <span className="material-symbols-outlined">mail</span>
                        </div>
                        {task.topic_category && (
                          <span className="text-[10px] font-bold px-2 py-1 bg-surface-variant text-on-surface-variant rounded uppercase tracking-wider">
                            {task.topic_category}
                          </span>
                        )}
                      </div>
                      <h3 className="text-[18px] font-bold text-on-surface mb-2 line-clamp-2">{task.task_title}</h3>
                      <div className="mt-auto pt-4 flex flex-col gap-2">
                        {task.lastScore && (
                          <div className="text-[14px] text-primary font-medium bg-primary/10 w-fit px-2 py-0.5 rounded flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">star</span>
                            Last Score: {task.lastScore}
                          </div>
                        )}
                        <p className="text-[14px] text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span> Start Practice
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-[20px] font-bold text-on-surface mb-4 border-b border-surface-variant pb-2">Part 2 (35 Tasks)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tasksList.filter(t => !t.task_title.includes('of 40')).map((task) => (
                    <div 
                      key={task.id} 
                      onClick={() => handleSelectTask(task.id)}
                      className="bg-surface-container-low border border-surface-variant rounded-xl p-6 cursor-pointer hover:border-primary hover:shadow-md transition-all group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <span className="material-symbols-outlined">mail</span>
                        </div>
                        {task.topic_category && (
                          <span className="text-[10px] font-bold px-2 py-1 bg-surface-variant text-on-surface-variant rounded uppercase tracking-wider">
                            {task.topic_category}
                          </span>
                        )}
                      </div>
                      <h3 className="text-[18px] font-bold text-on-surface mb-2 line-clamp-2">{task.task_title}</h3>
                      <div className="mt-auto pt-4 flex flex-col gap-2">
                        {task.lastScore && (
                          <div className="text-[14px] text-primary font-medium bg-primary/10 w-fit px-2 py-0.5 rounded flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">star</span>
                            Last Score: {task.lastScore}
                          </div>
                        )}
                        <p className="text-[14px] text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span> Start Practice
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // --- PRACTICE VIEW ---
  const wordCount = response.trim() ? response.trim().split(/\s+/).length : 0;

  const handleSubmit = async () => {
    if (!response.trim() || wordCount < 10) return;
    
    setIsSubmitting(true);
    setGradingError(null);
    setGradingResult(null);

    try {
      const res = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType: 'write-email',
          promptData: selectedTask,
          userResponse: response
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to grade response');
      
      setGradingResult(json.data);
    } catch (err: any) {
      setGradingError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[var(--spacing-container-max)] mx-auto grid grid-cols-1 md:grid-cols-12 gap-[var(--spacing-gutter)]">
        
        {/* Left Column: Context & Task */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="card rounded-xl p-8 flex flex-col gap-4 sticky top-24">
            
            <button onClick={handleBack} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors w-fit mb-4">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              <span className="text-[14px] font-medium">Back to Library</span>
            </button>

            <div className="flex flex-col gap-1 mb-2">
              <span className="text-[12px] font-bold text-secondary uppercase tracking-wider">{selectedTask.topicCategory}</span>
              <h1 className="font-headline text-[28px] font-bold text-on-surface">{selectedTask.taskTitle}</h1>
            </div>
            
            <div className="mt-4 p-5 bg-surface-container-low rounded-lg border border-surface-variant">
              <h3 className="text-[14px] font-semibold text-on-surface mb-3 flex items-center gap-2 border-b border-surface-variant pb-2">
                <span className="material-symbols-outlined text-[16px]">info</span>
                Scenario
              </h3>
              <p className="text-[15px] text-on-surface-variant leading-relaxed">
                {selectedTask.promptScenario}
              </p>
            </div>

            <div className="mt-4 p-5 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="text-[14px] font-semibold text-primary mb-3 flex items-center gap-2 border-b border-primary/20 pb-2">
                <span className="material-symbols-outlined text-[16px]">task_alt</span>
                Your Task
              </h3>
              <div 
                className="text-[15px] text-on-surface-variant space-y-2 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedTask.promptInstructions.replace(/\n/g, '<br/>') }}
              />
            </div>
            
            <div className="mt-2 text-[12px] text-on-surface-variant italic text-center">
              Target Length: 120 – 150 words.
            </div>
          </div>
        </div>

        {/* Right Column: User Input */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="card rounded-xl p-8 min-h-[600px] flex flex-col">
            <h2 className="text-[14px] font-semibold text-secondary uppercase tracking-wider mb-6 border-b border-surface-variant pb-2 flex items-center gap-2">
              <span className="material-symbols-outlined">edit_square</span> Write Your Email
            </h2>
            
            {/* User Input Area */}
            <div className="flex-grow flex flex-col">
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="w-full flex-grow min-h-[350px] p-4 bg-surface border border-outline-variant rounded-lg text-[16px] text-on-surface focus:ring-2 focus:ring-primary focus:border-primary resize-y"
                placeholder="Start typing your email here... (e.g. Dear John,)"
              ></textarea>
              
              <div className="flex justify-between items-center mt-4">
              <div className="flex gap-4 items-center">
                <span className="text-[14px] text-on-surface-variant">Word count: <strong className={wordCount < 10 ? "text-error" : "text-primary"}>{wordCount}</strong></span>
                {timeLeft !== null && !gradingResult && (
                  <span className={`text-[14px] font-mono font-bold flex items-center gap-1 ${timeLeft < 60 ? "text-error" : "text-secondary"}`}>
                    <span className="material-symbols-outlined text-[18px]">timer</span>
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                )}
              </div>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !response.trim()}
                  className="bg-primary text-white font-medium text-[14px] px-8 py-3 rounded hover:bg-primary-container transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {isSubmitting ? (
                    <>Evaluating... <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span></>
                  ) : (
                    <>Submit Email <span className="material-symbols-outlined text-[18px]">send</span></>
                  )}
                </button>
              </div>
            </div>

            {/* Grading Results UI */}
            {gradingError && (
              <div className="mt-8 p-4 bg-error-container text-on-error-container rounded-lg border border-error">
                <span className="material-symbols-outlined mb-1">error</span>
                <p className="font-bold text-[14px]">Grading Failed</p>
                <p className="text-[14px]">{gradingError}</p>
              </div>
            )}

            {gradingResult && (
              <div className="mt-12 border-t border-surface-variant pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-[28px]">verified</span>
                  <h2 className="font-headline text-[24px] font-bold text-on-surface">AI Evaluation</h2>
                  <div className="ml-auto bg-primary-container text-on-primary-container font-bold px-4 py-2 rounded-full text-[18px]">
                    Score: {gradingResult.score}
                  </div>
                </div>

                <div className="bg-surface-container-low p-6 rounded-xl border border-surface-variant mb-6">
                  <p className="text-[16px] text-on-surface leading-relaxed">{gradingResult.overallFeedback}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-surface-container-low p-6 rounded-xl border border-surface-variant">
                    <h3 className="text-[16px] font-bold text-[#1a73e8] mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">thumb_up</span> Strengths
                    </h3>
                    <ul className="space-y-2">
                      {gradingResult.strengths?.map((s: string, i: number) => (
                        <li key={i} className="text-[14px] text-on-surface-variant flex gap-2">
                          <span className="material-symbols-outlined text-[#1a73e8] text-[16px] shrink-0 mt-0.5">check_circle</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-surface-container-low p-6 rounded-xl border border-surface-variant">
                    <h3 className="text-[16px] font-bold text-error mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">trending_down</span> Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {gradingResult.weaknesses?.map((w: string, i: number) => (
                        <li key={i} className="text-[14px] text-on-surface-variant flex gap-2">
                          <span className="material-symbols-outlined text-error text-[16px] shrink-0 mt-0.5">warning</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {gradingResult.grammarCorrections?.length > 0 && (
                  <div className="bg-surface-container-low p-6 rounded-xl border border-surface-variant">
                    <h3 className="text-[16px] font-bold text-on-surface mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">spellcheck</span> Grammar & Mechanics
                    </h3>
                    <div className="space-y-4">
                      {gradingResult.grammarCorrections.map((corr: any, i: number) => (
                        <div key={i} className="border-b border-surface-variant last:border-0 pb-4 last:pb-0">
                          <div className="flex flex-wrap gap-2 text-[14px] mb-2">
                            <span className="bg-error/10 text-error px-2 py-1 rounded line-through">{corr.original}</span>
                            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">arrow_forward</span>
                            <span className="bg-[#1a73e8]/10 text-[#1a73e8] px-2 py-1 rounded font-medium">{corr.corrected}</span>
                          </div>
                          <p className="text-[14px] text-on-surface-variant italic">"{corr.explanation}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {gradingResult.idealResponse && (
                  <div className="bg-[#1a73e8]/5 p-6 rounded-xl border border-[#1a73e8]/20 mt-6">
                    <h3 className="text-[16px] font-bold text-[#1a73e8] mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">auto_awesome</span> AI Corrected Version
                    </h3>
                    <p className="text-[14px] text-on-surface-variant mb-4 italic">
                      This is a 5/5 version of your email, based on your original ideas but with corrected grammar and improved vocabulary.
                    </p>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute text-[40px] text-[#1a73e8]/10 -top-2 -left-2">format_quote</span>
                      <div className="text-[15px] text-on-surface leading-relaxed relative z-10 pl-6 whitespace-pre-wrap">
                        {gradingResult.idealResponse}
                      </div>
                    </div>
                  </div>
                )}

                {/* Show the original PDF model response here */}
                {selectedTask.modelResponse && (
                  <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 mt-6">
                    <h3 className="text-[16px] font-bold text-primary mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">workspace_premium</span> Official Model Answer
                    </h3>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute text-[40px] text-primary/10 -top-2 -left-2">format_quote</span>
                      <div 
                        className="text-[15px] text-on-surface leading-relaxed relative z-10 pl-6 italic whitespace-pre-wrap"
                      >
                        {selectedTask.modelResponse}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
