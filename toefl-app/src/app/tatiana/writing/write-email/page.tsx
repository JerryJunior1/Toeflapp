"use client";

import { useState, useEffect, useRef } from "react";
import { tatianaTests } from "@/data/tatianaTests";
import { createBrowserClient } from "@supabase/ssr";

type Phase = "select" | "practice" | "grading" | "done";

export default function TatianaWriteEmail() {
  const [selectedTestNum, setSelectedTestNum] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("select");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [gradingResult, setGradingResult] = useState<any>(null);
  const [gradingError, setGradingError] = useState<string | null>(null);

  const selectedTest = tatianaTests.find((t) => t.testNumber === selectedTestNum);
  const emailTask = selectedTest?.writing?.writeEmail;

  const [avgScores, setAvgScores] = useState<Record<number, string | null>>({});

  const fetchAvgScores = async () => {
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data, error } = await supabase
        .from("practice_sessions")
        .select("score_details, score_value, created_at")
        .eq("task_type", "write-email")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("fetchAvgScores Supabase Error:", error);
        return;
      }
      if (!data) return;

      const groups: Record<number, number[]> = {};
      const seenTasks = new Set<string>();

      for (const row of data) {
        const taskId = row.score_details?.taskId;
        if (!taskId || !taskId.startsWith("tatiana-email-")) continue;

        const match = taskId.match(/tatiana-email-(\d+)/);
        if (!match) continue;
        
        const testNum = parseInt(match[1], 10);
        const scoreStr = row.score_value;
        const scoreNum = parseFloat(scoreStr ? scoreStr.split('/')[0] : "0");
        const score = isNaN(scoreNum) ? 0 : scoreNum;
        
        if (!groups[testNum]) groups[testNum] = [];
        groups[testNum].push(score);
      }

      const computed: Record<number, string | null> = {};
      for (const [testNum, scores] of Object.entries(groups)) {
        const avg = scores.reduce((a, b) => a + b, 0) / (scores.length || 1);
        computed[Number(testNum)] = avg.toFixed(1);
      }
      setAvgScores(computed);
    } catch (e) {
      console.error("fetchAvgScores failed", e);
    }
  };

  useEffect(() => {
    fetchAvgScores();
  }, []);

  const handleSubmit = async () => {
    if (!emailTask) return;
    setPhase("grading");
    if (timerRef.current) clearTimeout(timerRef.current);

    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: `tatiana-email-${selectedTestNum}`,
          taskType: "write-email",
          promptData: emailTask,
          userResponse: userInput,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to grade response");

      setGradingResult(data.data);
      setPhase("done");
    } catch (err: any) {
      setGradingError(err.message);
      setPhase("practice");
    }
  };

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0 && phase === "practice") {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0 && phase === "practice") {
      handleSubmit();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, phase]);

  const startPractice = (testNum: number) => {
    setSelectedTestNum(testNum);
    setUserInput("");
    setPhase("practice");
    setTimeLeft(420); // 7 minutes
    setGradingResult(null);
    setGradingError(null);
  };

  const handleRestart = () => {
    setSelectedTestNum(null);
    setPhase("select");
    fetchAvgScores();
  };



  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // ── SELECT ───────────────────────────────────────────────────────────────
  if (phase === "select") {
    const validTests = tatianaTests.filter((t) => t.writing?.writeEmail);
    return (
      <div className="w-full max-w-[900px] mx-auto flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]">school</span>
            Tatiana — Writing
          </div>
          <h1 className="font-headline text-[32px] font-bold text-on-surface">Write an Email</h1>
          <p className="text-[16px] text-on-surface-variant mt-2">
            Respond to the email prompt within the 7-minute time limit. Your response will be graded by AI based on standard TOEFL rubrics.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {validTests.map((test) => (
            <button
              key={test.testNumber}
              onClick={() => startPractice(test.testNumber)}
              className="card rounded-xl p-5 text-left hover:border-primary hover:shadow-md transition-all border border-surface-variant flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[18px]">mail</span>
                </div>
                <div className="flex items-center gap-2">
                  {avgScores[test.testNumber] != null && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        parseFloat(avgScores[test.testNumber]!) >= 4
                          ? "bg-[#0d7a5f]/10 text-[#0d7a5f]"
                          : parseFloat(avgScores[test.testNumber]!) >= 2.5
                          ? "bg-[#c2790a]/10 text-[#c2790a]"
                          : "bg-error/10 text-error"
                      }`}
                    >
                      ★ {avgScores[test.testNumber]}/5
                    </span>
                  )}
                  <span className="text-[13px] font-bold text-primary uppercase tracking-wider">Test {test.testNumber}</span>
                </div>
              </div>
              <p className="text-[14px] font-semibold text-on-surface leading-snug">{test.title}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── PRACTICE & GRADING ───────────────────────────────────────────────────
  if (phase === "practice" || phase === "grading") {
    return (
      <div className="w-full max-w-[1200px] mx-auto h-[calc(100vh-140px)] flex gap-6">
        {/* Left Column: Prompt */}
        <div className="w-1/2 flex flex-col gap-4 h-full">
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={handleRestart} className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <p className="text-[12px] font-bold text-on-surface-variant uppercase tracking-wider">Test {selectedTestNum} — Write an Email</p>
              <h1 className="font-headline text-[22px] font-bold text-on-surface">{selectedTest?.title}</h1>
            </div>
          </div>

          <div className="card rounded-xl flex-1 overflow-y-auto border border-surface-variant bg-surface-container-low">
            <div className="p-6 border-b border-surface-variant flex items-center justify-between sticky top-0 bg-surface-container-low z-10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">description</span>
                <span className="font-bold text-on-surface">Prompt</span>
              </div>
              {timeLeft !== null && (
                <div className={`flex items-center gap-2 font-bold px-3 py-1.5 rounded-lg border ${timeLeft < 60 ? 'text-error border-error bg-error/10 animate-pulse' : 'text-primary border-primary/20 bg-primary/5'}`}>
                  <span className="material-symbols-outlined text-[18px]">timer</span>
                  {formatTime(timeLeft)}
                </div>
              )}
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">Situation</p>
                <p className="text-[15px] text-on-surface leading-relaxed">{emailTask?.situation}</p>
              </div>

              <div>
                <p className="text-[13px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">Task Requirements</p>
                <ul className="list-disc pl-5 space-y-2">
                  {emailTask?.task.map((t, i) => (
                    <li key={i} className="text-[15px] text-on-surface">{t}</li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-surface-variant/30 rounded-lg border border-surface-variant">
                 <p className="text-[14px] text-on-surface"><strong>To:</strong> {emailTask?.to}</p>
                 <p className="text-[14px] text-on-surface"><strong>Subject:</strong> {emailTask?.subject}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editor */}
        <div className="w-1/2 h-full flex flex-col gap-4">
          <div className="card rounded-xl flex-1 border border-surface-variant flex flex-col overflow-hidden">
            <div className="p-4 border-b border-surface-variant bg-surface-container-lowest flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="text-[14px] font-bold text-on-surface-variant">Your Response</span>
                <span className={`text-[12px] font-bold px-2 py-1 rounded ${userInput.trim().split(/\s+/).length < 50 ? 'bg-error/10 text-error' : 'bg-[#0d7a5f]/10 text-[#0d7a5f]'}`}>
                  {userInput.trim() === '' ? 0 : userInput.trim().split(/\s+/).length} words
                </span>
              </div>
              <button 
                onClick={handleSubmit} 
                disabled={phase === "grading" || userInput.trim().length === 0}
                className="bg-primary text-white font-bold text-[13px] px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {phase === "grading" ? (
                  <>
                    <span className="material-symbols-outlined text-[16px] animate-spin">sync</span> Grading...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">send</span> Submit
                  </>
                )}
              </button>
            </div>
            
            {gradingError && (
              <div className="mx-4 mt-4 p-3 bg-error/10 border border-error text-error rounded-lg text-[14px] font-medium flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{gradingError}</span>
              </div>
            )}
            
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={phase === "grading"}
              placeholder="Type your email here..."
              className="w-full flex-1 p-6 bg-surface-container-lowest text-on-surface resize-none focus:outline-none text-[15px] leading-relaxed disabled:opacity-60"
            />
          </div>
        </div>
      </div>
    );
  }

  // ── DONE ─────────────────────────────────────────────────────────────────
  if (phase === "done" && gradingResult) {
    return (
      <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
             <button onClick={handleRestart} className="text-on-surface-variant hover:text-primary transition-colors">
               <span className="material-symbols-outlined">arrow_back</span>
             </button>
             <div>
               <p className="text-[12px] font-bold text-on-surface-variant uppercase tracking-wider">Evaluation</p>
               <h1 className="font-headline text-[24px] font-bold text-on-surface">Test {selectedTestNum} — Write an Email</h1>
             </div>
           </div>
           <button onClick={handleRestart} className="bg-primary text-white font-bold text-[14px] px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
             <span className="material-symbols-outlined text-[18px]">list</span> Try Another
           </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Main Feedback */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="card rounded-xl p-6 border-l-4 border-l-primary flex gap-5 items-start">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                 <span className="font-headline text-[24px] font-bold text-primary">{gradingResult.score}</span>
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-on-surface mb-2">Overall Feedback</h3>
                <p className="text-[15px] text-on-surface leading-relaxed">{gradingResult.overallFeedback}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card rounded-xl p-5 border border-surface-variant bg-[#0d7a5f]/5">
                <div className="flex items-center gap-2 mb-3 text-[#0d7a5f]">
                  <span className="material-symbols-outlined">check_circle</span>
                  <h4 className="font-bold">Strengths</h4>
                </div>
                <ul className="space-y-2">
                  {gradingResult.strengths?.map((s: string, i: number) => (
                    <li key={i} className="text-[14px] text-on-surface flex items-start gap-2">
                      <span className="text-[#0d7a5f] mt-1">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card rounded-xl p-5 border border-surface-variant bg-error/5">
                <div className="flex items-center gap-2 mb-3 text-error">
                  <span className="material-symbols-outlined">trending_up</span>
                  <h4 className="font-bold">Areas to Improve</h4>
                </div>
                <ul className="space-y-2">
                  {gradingResult.weaknesses?.map((w: string, i: number) => (
                    <li key={i} className="text-[14px] text-on-surface flex items-start gap-2">
                      <span className="text-error mt-1">•</span> {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {gradingResult.grammarCorrections && gradingResult.grammarCorrections.length > 0 && (
              <div className="card rounded-xl p-6 border border-surface-variant">
                <h4 className="font-bold text-[18px] text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">edit_note</span> Corrections
                </h4>
                <div className="flex flex-col gap-4">
                  {gradingResult.grammarCorrections.map((correction: any, i: number) => (
                    <div key={i} className="bg-surface-container-low rounded-lg p-4 border border-surface-variant text-[14px]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="line-through text-error decoration-error font-medium">{correction.original}</span>
                        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">arrow_right_alt</span>
                        <span className="text-[#0d7a5f] font-bold">{correction.corrected}</span>
                      </div>
                      <p className="text-on-surface-variant text-[13px]">{correction.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="card rounded-xl p-6 border border-surface-variant bg-primary-container/20">
               <h4 className="font-bold text-[16px] text-on-surface mb-3 flex items-center gap-2">
                 <span className="material-symbols-outlined text-primary text-[18px]">lightbulb</span> Ideal Response
               </h4>
               <p className="text-[14px] text-on-surface leading-relaxed whitespace-pre-wrap">{gradingResult.idealResponse}</p>
            </div>
            
            <div className="card rounded-xl p-6 border border-surface-variant">
               <h4 className="font-bold text-[16px] text-on-surface mb-3 flex items-center gap-2">
                 <span className="material-symbols-outlined text-on-surface-variant text-[18px]">history_edu</span> Official Sample Answer
               </h4>
               <p className="text-[14px] text-on-surface leading-relaxed whitespace-pre-wrap">{emailTask?.sampleAnswer}</p>
            </div>
            
            <div className="card rounded-xl p-6 border border-surface-variant">
               <h4 className="font-bold text-[16px] text-on-surface mb-3 flex items-center gap-2">
                 <span className="material-symbols-outlined text-on-surface-variant text-[18px]">person</span> Your Original Response
               </h4>
               <p className="text-[14px] text-on-surface leading-relaxed whitespace-pre-wrap opacity-80">{userInput}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
