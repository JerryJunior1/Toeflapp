"use client";

import { useState, useEffect, useRef } from 'react';

// Browser Speech Recognition Types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Question {
  question: string;
  model_response: string;
}

interface InterviewTaskData {
  id: string;
  task_title: string;
  scenario_context: string;
  category?: string;
  questions: Question[];
  lastScore?: string;
}

export default function TakeInterview() {
  const [tasksList, setTasksList] = useState<InterviewTaskData[]>([]);
  const [selectedTask, setSelectedTask] = useState<InterviewTaskData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Practice state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [audioMimeType, setAudioMimeType] = useState<string>('audio/webm');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(45);
  
  // Grading state (store an array of grading results matching the questions)
  const [gradingResults, setGradingResults] = useState<any[]>([]);
  const [gradingError, setGradingError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await fetch('/api/interview-tasks');
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

  // Audio capture is handled via MediaRecorder in startRecording

  const handleSelectTask = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/interview-tasks?id=${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to fetch task details');
      
      setSelectedTask(json);
      setCurrentQuestionIndex(0);
      setAudioBlobUrl(null);
      setAudioBase64(null);
      setGradingResults([]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedTask(null);
    setAudioBlobUrl(null);
    setAudioBase64(null);
    setCurrentQuestionIndex(0);
    setGradingResults([]);
    setGradingError(null);
    setTimeLeft(45);
    if (isRecording) stopRecording();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      let mimeType = '';
      if (MediaRecorder.isTypeSupported('audio/webm')) {
        mimeType = 'audio/webm';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      }
      
      const mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const actualMimeType = mediaRecorder.mimeType || mimeType || 'audio/webm';
        setAudioMimeType(actualMimeType);
        
        const audioBlob = new Blob(audioChunksRef.current, { type: actualMimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlobUrl(audioUrl);

        // Convert to Base64 for the API
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64String = reader.result as string;
          // Extract just the base64 part, removing "data:audio/webm;base64,"
          const base64Data = base64String.split(',')[1];
          setAudioBase64(base64Data);
        };

        // Stop all audio tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      setAudioBlobUrl(null);
      setAudioBase64(null);
      setTimeLeft(45);
      mediaRecorder.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access your microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSubmit = async () => {
    if (!audioBase64 || !selectedTask) return;
    
    setIsSubmitting(true);
    setGradingError(null);

    const currentQuestion = selectedTask.questions[currentQuestionIndex];

    try {
      const res = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: selectedTask.id,
          taskType: 'take-interview',
          promptData: {
            scenario_context: selectedTask.scenario_context,
            question: currentQuestion.question,
            modelResponse: currentQuestion.model_response
          },
          audioBase64: audioBase64,
          mimeType: audioMimeType
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to grade response');
      
      const newGradingResults = [...gradingResults];
      newGradingResults[currentQuestionIndex] = json.data;
      setGradingResults(newGradingResults);
    } catch (err: any) {
      setGradingError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedTask) return;
    if (currentQuestionIndex < selectedTask.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAudioBlobUrl(null);
      setAudioBase64(null);
      setTimeLeft(45);
    }
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
    const filteredTasks = tasksList.filter(t => 
      t.task_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.scenario_context.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="w-full max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-6">
        <div className="card rounded-xl p-8 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[24px]">mic</span>
            <span className="text-[16px] font-semibold text-primary uppercase tracking-wider">Speaking Practice</span>
          </div>
          <h1 className="font-headline text-[32px] font-bold text-on-surface">Take an Interview</h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <p className="text-[16px] text-on-surface-variant leading-relaxed max-w-lg">
              Practice realistic TOEFL speaking interview questions. Use your microphone to record your answers.
            </p>
            <div className="relative w-full md:w-72 shrink-0">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                type="text" 
                placeholder="Search topics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-surface-variant rounded-lg focus:outline-none focus:border-primary transition-colors text-[14px] text-on-surface"
              />
            </div>
          </div>
          
          {filteredTasks.length === 0 ? (
             <div className="p-8 text-center bg-surface-container-low rounded-xl border border-dashed border-surface-variant">
               <p className="text-on-surface-variant">No tasks found. Your database might be empty!</p>
             </div>
          ) : (
            <div className="flex flex-col gap-8">
              {/* Part 1: TOEFL Format */}
              {(() => {
                const part1Tasks = filteredTasks.filter(t => t.category === 'TOEFL Format' || !t.category);
                return (
                  <div>
                    <h2 className="text-[20px] font-bold text-on-surface mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[24px]">school</span>
                      Part 1: TOEFL Format <span className="text-[14px] text-on-surface-variant font-normal bg-surface-variant px-2 py-0.5 rounded-full ml-2">{part1Tasks.length} practices</span>
                    </h2>
                    {part1Tasks.length === 0 ? (
                      <p className="text-[14px] text-on-surface-variant italic">No tasks in this category yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {part1Tasks.map((task, index) => (
                          <div 
                            key={task.id} 
                            onClick={() => handleSelectTask(task.id)}
                            className="bg-surface-container-low border border-surface-variant rounded-xl p-6 cursor-pointer hover:border-primary hover:shadow-md transition-all group flex flex-col"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">forum</span>
                              </div>
                              <span className="text-[12px] font-bold text-on-surface-variant bg-surface-variant px-2 py-1 rounded">#{index + 1}</span>
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
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span> Start Interview
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Part 2: Just Interview */}
              {(() => {
                const part2Tasks = filteredTasks.filter(t => t.category === 'Just Interview');
                return (
                  <div>
                    <h2 className="text-[20px] font-bold text-on-surface mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[24px]">record_voice_over</span>
                      Part 2: Just Interview <span className="text-[14px] text-on-surface-variant font-normal bg-surface-variant px-2 py-0.5 rounded-full ml-2">{part2Tasks.length} practices</span>
                    </h2>
                    {part2Tasks.length === 0 ? (
                      <p className="text-[14px] text-on-surface-variant italic">No tasks in this category yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {part2Tasks.map((task, index) => (
                          <div 
                            key={task.id} 
                            onClick={() => handleSelectTask(task.id)}
                            className="bg-surface-container-low border border-surface-variant rounded-xl p-6 cursor-pointer hover:border-secondary hover:shadow-md transition-all group flex flex-col"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">forum</span>
                              </div>
                              <span className="text-[12px] font-bold text-on-surface-variant bg-surface-variant px-2 py-1 rounded">#{index + 1}</span>
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
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span> Start Interview
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- PRACTICE VIEW ---
  const currentQuestion = selectedTask.questions[currentQuestionIndex];
  const currentGrading = gradingResults[currentQuestionIndex];
  const isFinished = currentQuestionIndex >= selectedTask.questions.length - 1 && currentGrading;

  // Format timer (e.g. 45 -> "00:45")
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6">
        
        {/* Top Header & Progress */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
            <div>
                <h1 className="font-headline text-[32px] font-bold text-on-surface mb-2">Interview Simulation</h1>
                <p className="text-[16px] text-on-surface-variant">Scenario: {selectedTask.scenario_context}</p>
            </div>
            
            {/* Horizontal step progress tracker */}
            <div className="flex items-center gap-2 mb-1">
                {selectedTask.questions.map((_, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        {idx < currentQuestionIndex ? (
                            <span className="material-symbols-outlined text-[20px] text-primary">check_circle</span>
                        ) : idx === currentQuestionIndex ? (
                            <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary/20"></div>
                        ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-surface-variant"></div>
                        )}
                        {idx < selectedTask.questions.length - 1 && (
                            <div className={`w-8 h-px ${idx < currentQuestionIndex ? 'bg-primary' : 'bg-surface-variant'}`}></div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        <hr className="border-surface-variant" />

        {/* Main Recording Card */}
        <div className="card rounded-xl p-8 min-h-[500px] flex flex-col items-center relative">
            <button onClick={handleBack} className="absolute top-6 left-6 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>

            <div className="bg-surface-variant/30 text-on-surface-variant px-4 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-2 mb-8">
                <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
                Question {currentQuestionIndex + 1} of {selectedTask.questions.length}
            </div>
            
            <h2 className="font-headline text-[24px] md:text-[28px] font-bold text-on-surface text-center leading-relaxed max-w-2xl mb-12">
                "{currentQuestion.question}"
            </h2>

            {!currentGrading && (
                <div className="flex flex-col items-center gap-4 mb-12">
                    <div className="text-[48px] font-bold text-primary tracking-wider mb-2 font-mono">
                        {formatTime(timeLeft)}
                    </div>

                    <button 
                        onClick={toggleRecording}
                        disabled={!!audioBlobUrl}
                        className={`w-24 h-24 rounded-2xl flex items-center justify-center transition-all shadow-md ${
                            !!audioBlobUrl
                            ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed'
                            : isRecording 
                            ? 'bg-error text-white animate-pulse shadow-error/30' 
                            : 'bg-primary text-white hover:bg-primary-container hover:text-on-primary-container shadow-primary/20 hover:scale-105'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[40px]">{isRecording ? 'stop' : 'mic'}</span>
                    </button>
                    <p className="text-on-surface-variant font-medium mt-2">
                        {isRecording ? "Recording in progress..." : audioBlobUrl ? "Recording complete. Click Submit to continue." : "Click to start recording"}
                    </p>
                    
                    {audioBlobUrl && !isRecording && (
                        <div className="mt-4">
                            <audio src={audioBlobUrl} controls playsInline className="h-10" />
                        </div>
                    )}
                </div>
            )}

            {/* Actions Footer */}
            {!currentGrading && (
                <div className="w-full flex items-center justify-end gap-4 mt-auto border-t border-surface-variant pt-6">
                    <button 
                        onClick={handleNextQuestion}
                        className="px-6 py-2.5 rounded text-on-surface bg-surface-variant/50 hover:bg-surface-variant font-medium transition-colors"
                    >
                        Skip Question
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting || !audioBase64 || isRecording}
                        className="bg-primary text-white font-medium px-6 py-2.5 rounded hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        {isSubmitting ? (
                            <>Evaluating... <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span></>
                        ) : (
                            <>Submit & Next <span className="material-symbols-outlined text-[18px]">arrow_forward</span></>
                        )}
                    </button>
                </div>
            )}

            {/* Grading Results UI (Shown after submission) */}
            {gradingError && (
              <div className="w-full mt-8 p-4 bg-error-container text-on-error-container rounded-lg border border-error text-left">
                <span className="material-symbols-outlined mb-1">error</span>
                <p className="font-bold text-[14px]">Grading Failed</p>
                <p className="text-[14px]">{gradingError}</p>
              </div>
            )}

            {currentGrading && (
              <div className="w-full mt-4 animate-fade-in text-left">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-[28px]">verified</span>
                  <h2 className="font-headline text-[24px] font-bold text-on-surface">AI Evaluation</h2>
                  <div className="ml-auto bg-primary-container text-on-primary-container font-bold px-4 py-2 rounded-full text-[18px]">
                    Score: {currentGrading.score}
                  </div>
                </div>

                {currentGrading?.transcript && (
                  <div className="w-full mb-6 p-4 bg-surface border border-outline-variant rounded-lg">
                    <h4 className="text-[14px] font-bold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">transcribe</span> Verbatim Transcript
                    </h4>
                    <p className="text-[16px] text-on-surface leading-relaxed whitespace-pre-wrap italic opacity-80">{currentGrading.transcript}</p>
                  </div>
                )}

                <div className="bg-surface-container-low p-6 rounded-xl border border-surface-variant mb-6">
                  <p className="text-[16px] text-on-surface leading-relaxed">{currentGrading.overallFeedback}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-surface-container-low p-6 rounded-xl border border-surface-variant">
                    <h3 className="text-[16px] font-bold text-[#1a73e8] mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">thumb_up</span> Strengths
                    </h3>
                    <ul className="space-y-2">
                      {currentGrading.strengths?.map((s: string, i: number) => (
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
                      {currentGrading.weaknesses?.map((w: string, i: number) => (
                        <li key={i} className="text-[14px] text-on-surface-variant flex gap-2">
                          <span className="material-symbols-outlined text-error text-[16px] shrink-0 mt-0.5">warning</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {currentGrading.grammarCorrections?.length > 0 && (
                  <div className="bg-surface-container-low p-6 rounded-xl border border-surface-variant mb-6">
                    <h3 className="text-[16px] font-bold text-on-surface mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">spellcheck</span> Language Corrections
                    </h3>
                    <div className="space-y-4">
                      {currentGrading.grammarCorrections.map((corr: any, i: number) => (
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

                {currentGrading.idealResponse && (
                  <div className="bg-[#1a73e8]/5 p-6 rounded-xl border border-[#1a73e8]/20 mb-6">
                    <h3 className="text-[16px] font-bold text-[#1a73e8] mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">auto_awesome</span> Your Improved Answer (Score: 5/5)
                    </h3>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute text-[40px] text-[#1a73e8]/10 -top-2 -left-2">format_quote</span>
                      <div className="text-[15px] text-on-surface leading-relaxed relative z-10 pl-6 italic whitespace-pre-wrap">
                        {currentGrading.idealResponse}
                      </div>
                    </div>
                  </div>
                )}

                {currentQuestion.model_response && (
                  <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 mb-8">
                    <h3 className="text-[16px] font-bold text-primary mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">workspace_premium</span> Official Model Answer
                    </h3>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute text-[40px] text-primary/10 -top-2 -left-2">format_quote</span>
                      <div className="text-[15px] text-on-surface leading-relaxed relative z-10 pl-6 italic whitespace-pre-wrap">
                        {currentQuestion.model_response}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4 border-t border-surface-variant">
                    {isFinished ? (
                         <button 
                         onClick={handleBack}
                         className="bg-secondary text-white font-bold text-[14px] px-8 py-3 rounded hover:bg-secondary/90 transition-colors flex items-center gap-2 shadow-sm"
                       >
                         Finish Interview <span className="material-symbols-outlined text-[18px]">done_all</span>
                       </button>
                    ) : (
                        <button 
                        onClick={handleNextQuestion}
                        className="bg-primary text-white font-bold text-[14px] px-8 py-3 rounded hover:bg-primary-container transition-colors flex items-center gap-2 shadow-sm"
                      >
                        Next Question <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>
                    )}
                </div>
              </div>
            )}
        </div>
    </div>
  );
}
