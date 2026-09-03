"use client";

import { useState, useEffect, useRef } from "react";
import { tatianaTests } from "@/data/tatianaTests";
import { createBrowserClient } from "@supabase/ssr";

type Phase = "select" | "practice" | "done";

interface WordItem {
  id: string;
  word: string;
}

export default function TatianaBuildSentence() {
  const [selectedTestNum, setSelectedTestNum] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("select");
  const [currentIdx, setCurrentIdx] = useState(0);
  
  // Drag and Drop state
  const [wordBank, setWordBank] = useState<WordItem[]>([]);
  const [answerWords, setAnswerWords] = useState<WordItem[]>([]);
  
  const [results, setResults] = useState<{ prompt: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }[]>([]);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const selectedTest = tatianaTests.find((t) => t.testNumber === selectedTestNum);
  const items = selectedTest?.writing?.buildSentence || [];
  const current = items[currentIdx];

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
        .eq("task_type", "build-sentence")
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
        if (!taskId || !taskId.startsWith("tatiana-build-sentence-")) continue;

        const match = taskId.match(/tatiana-build-sentence-(\d+)/);
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
        computed[Number(testNum)] = Math.round(avg).toString();
      }
      setAvgScores(computed);
    } catch (e) {
      console.error("fetchAvgScores failed", e);
    }
  };

  useEffect(() => {
    fetchAvgScores();
  }, []);

  // Initialize words when moving to a new sentence
  useEffect(() => {
    if (phase === "practice" && current) {
      const words = current.scrambled.split("/").map((w) => w.trim()).filter(Boolean);
      setWordBank(words.map((w, i) => ({ id: `word-${i}`, word: w })));
      setAnswerWords([]);
    }
  }, [currentIdx, phase, current]);

  // Timer logic
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0 && phase === "practice") {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0 && phase === "practice") {
      // Auto-submit current answer and finish when time runs out
      handleFinish(true);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, phase]);

  const normalize = (s: string) =>
    s.trim().toLowerCase().replace(/[.?!,]/g, "").replace(/\s+/g, " ");

  const handleNext = () => {
    if (!current) return;
    const userAnswerStr = answerWords.map(w => w.word).join(" ");
    const isCorrect = normalize(userAnswerStr) === normalize(current.answer);

    setResults((prev) => [
      ...prev,
      { prompt: current.prompt, userAnswer: userAnswerStr, correctAnswer: current.answer, isCorrect },
    ]);

    if (currentIdx + 1 >= items.length) {
      setPhase("done");
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  const handleFinish = (fromTimeout = false) => {
    if (!current && !fromTimeout) return;
    
    // If it's from a timeout, we need to save the current progress if they haven't finished the current sentence
    if (fromTimeout && current) {
      const userAnswerStr = answerWords.map(w => w.word).join(" ");
      const isCorrect = normalize(userAnswerStr) === normalize(current.answer);
      setResults((prev) => [
        ...prev,
        { prompt: current.prompt, userAnswer: userAnswerStr, correctAnswer: current.answer, isCorrect },
      ]);
    }
    
    // Save to supabase
    const finalResults = fromTimeout && current 
      ? [...results, { 
          prompt: current.prompt, 
          userAnswer: answerWords.map(w => w.word).join(" "), 
          correctAnswer: current.answer, 
          isCorrect: normalize(answerWords.map(w => w.word).join(" ")) === normalize(current.answer) 
        }]
      : results;
    
    if (finalResults.length > 0) {
      const correct = finalResults.filter((r) => r.isCorrect).length;
      const scorePct = Math.round((correct / finalResults.length) * 100);
      
      const saveScore = async () => {
        try {
          const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          );
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase.from('practice_sessions').insert({
              user_id: user.id,
              task_id: crypto.randomUUID(),
              task_type: "build-sentence",
              score_value: `${scorePct}`,
              score_details: { taskId: `tatiana-build-sentence-${selectedTestNum}`, score: scorePct }
            });
          }
        } catch (e) {
          console.error("Failed to save build-sentence score", e);
        }
      };
      saveScore();
    }

    setPhase("done");
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setResults([]);
    setPhase("select");
    setSelectedTestNum(null);
    fetchAvgScores();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // --- Drag and Drop Logic ---
  
  // Click to move (as a fallback/alternative to dragging)
  const moveWordToAnswer = (item: WordItem) => {
    setWordBank(prev => prev.filter(w => w.id !== item.id));
    setAnswerWords(prev => [...prev, item]);
  };
  
  const moveWordToBank = (item: WordItem) => {
    setAnswerWords(prev => prev.filter(w => w.id !== item.id));
    setWordBank(prev => [...prev, item]);
  };

  // Native Drag handlers
  const onDragStart = (e: React.DragEvent, item: WordItem, source: "bank" | "answer") => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ item, source }));
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: React.DragEvent, target: "bank" | "answer") => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData("text/plain");
      if (!data) return;
      const { item, source } = JSON.parse(data);
      
      if (source === target) return; // Dropped in the same area
      
      if (target === "answer") {
        moveWordToAnswer(item);
      } else {
        moveWordToBank(item);
      }
    } catch (err) {
      console.error("Drop error", err);
    }
  };

  // ── SELECT ───────────────────────────────────────────────────────────────
  if (phase === "select") {
    const validTests = tatianaTests.filter((t) => t.writing?.buildSentence && t.writing.buildSentence.length > 0);
    return (
      <div className="w-full max-w-[900px] mx-auto flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]">school</span>
            Tatiana — Writing
          </div>
          <h1 className="font-headline text-[32px] font-bold text-on-surface">Build a Sentence</h1>
          <p className="text-[16px] text-on-surface-variant mt-2">
            Read the context sentence, then drag and drop the scrambled words to form the correct sentence. You have 7 minutes to complete the test.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {validTests.map((test) => (
            <button
              key={test.testNumber}
              onClick={() => { 
                setSelectedTestNum(test.testNumber); 
                setCurrentIdx(0); 
                setResults([]); 
                setPhase("practice");
                setTimeLeft(420); // 7 minutes
              }}
              className="card rounded-xl p-5 text-left hover:border-primary hover:shadow-md transition-all border border-surface-variant flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[18px]">build</span>
                </div>
                <div className="flex items-center gap-2">
                  {avgScores[test.testNumber] != null && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        parseFloat(avgScores[test.testNumber]!) >= 80
                          ? "bg-[#0d7a5f]/10 text-[#0d7a5f]"
                          : parseFloat(avgScores[test.testNumber]!) >= 50
                          ? "bg-[#c2790a]/10 text-[#c2790a]"
                          : "bg-error/10 text-error"
                      }`}
                    >
                      ★ {avgScores[test.testNumber]}%
                    </span>
                  )}
                  <span className="text-[13px] font-bold text-primary uppercase tracking-wider">Test {test.testNumber}</span>
                </div>
              </div>
              <p className="text-[14px] font-semibold text-on-surface leading-snug">{test.title}</p>
              <p className="text-[12px] text-on-surface-variant">{test.writing!.buildSentence.length} sentences</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── DONE ─────────────────────────────────────────────────────────────────
  if (phase === "done") {
    const correct = results.filter((r) => r.isCorrect).length;
    return (
      <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6">
        <div className="card rounded-xl p-8 flex flex-col items-center text-center gap-4 border-t-4 border-t-primary shadow-sm">
          <span className="material-symbols-outlined text-[56px] text-primary">task_alt</span>
          <h2 className="font-headline text-[28px] font-bold text-on-surface">Test Complete!</h2>
          <div className="bg-primary-container text-on-primary-container font-bold px-8 py-4 rounded-2xl text-[28px] flex items-center gap-3">
             <span>Score: {correct} / {results.length}</span>
             <span className="text-[18px] opacity-80 font-medium">({Math.round((correct/results.length) * 100)}%)</span>
          </div>
          <div className="flex gap-3 mt-4 flex-wrap justify-center">
            <button onClick={handleRestart} className="bg-surface-container-high text-on-surface font-bold text-[14px] px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-surface-variant transition-colors border border-surface-variant">
              <span className="material-symbols-outlined text-[18px]">list</span> Back to Menu
            </button>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[18px] text-on-surface mt-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">analytics</span> Detailed Results
          </h3>
          {results.map((r, i) => (
            <div key={i} className={`card rounded-xl border overflow-hidden ${r.isCorrect ? "border-[#0d7a5f]/30 shadow-sm" : "border-error/30 shadow-sm"}`}>
              <div className={`px-5 py-3 flex items-center gap-3 ${r.isCorrect ? "bg-[#0d7a5f]/10" : "bg-error/10"}`}>
                <span className={`material-symbols-outlined text-[20px] ${r.isCorrect ? "text-[#0d7a5f]" : "text-error"}`}>
                  {r.isCorrect ? "check_circle" : "cancel"}
                </span>
                <span className="text-[14px] font-bold text-on-surface">Sentence {i + 1}</span>
              </div>
              <div className="px-5 py-5 flex flex-col gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">Context</p>
                  <p className="text-[14px] text-on-surface font-medium italic">"{r.prompt}"</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-surface-container-low p-4 rounded-xl border border-surface-variant/50">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">person</span> Your Answer
                    </p>
                    <p className={`text-[15px] font-medium ${!r.isCorrect ? "text-error" : "text-on-surface"}`}>
                      {r.userAnswer || <span className="italic opacity-50">Empty response</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#0d7a5f] mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">workspace_premium</span> Correct Answer
                    </p>
                    <p className="text-[15px] font-medium text-on-surface">{r.correctAnswer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── PRACTICE ─────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6">
      {/* Header & Timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={handleRestart} className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <p className="text-[12px] font-bold text-on-surface-variant uppercase tracking-wider">Test {selectedTestNum} — Build a Sentence</p>
            <h1 className="font-headline text-[22px] font-bold text-on-surface">{selectedTest?.title}</h1>
          </div>
        </div>
        
        {timeLeft !== null && (
          <div className={`flex items-center gap-2 font-bold px-4 py-2 rounded-xl border shadow-sm ${timeLeft < 60 ? 'text-error border-error bg-error/10 animate-pulse' : 'text-primary border-primary/20 bg-surface-container-low'}`}>
            <span className="material-symbols-outlined text-[20px]">timer</span>
            <span className="text-[16px]">{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-surface-variant/50 rounded-full h-2.5 overflow-hidden">
          <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${(currentIdx / items.length) * 100}%` }} />
        </div>
        <span className="text-[13px] font-bold text-on-surface-variant shrink-0">{currentIdx + 1} / {items.length}</span>
      </div>

      {/* Main Interactive Card */}
      <div className="card rounded-2xl p-8 flex flex-col gap-8 border border-surface-variant shadow-sm bg-surface-container-low">
        {/* Context */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-variant/50">
          <p className="text-[12px] font-bold uppercase tracking-wider text-on-surface-variant mb-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">chat</span> Context
          </p>
          <p className="text-[18px] font-semibold text-on-surface italic">"{current.prompt}"</p>
        </div>

        {/* Word Bank (Source) */}
        <div>
          <p className="text-[12px] font-bold uppercase tracking-wider text-on-surface-variant mb-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">widgets</span> Word Bank <span className="text-[11px] font-normal opacity-70 ml-2">(Drag or click words to move them)</span>
          </p>
          <div 
            className="flex flex-wrap gap-2.5 p-5 min-h-[100px] bg-surface-container-lowest rounded-xl border-2 border-dashed border-outline-variant transition-colors hover:border-primary/50"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "bank")}
          >
            {wordBank.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => onDragStart(e, item, "bank")}
                onClick={() => moveWordToAnswer(item)}
                className="bg-primary text-white font-medium text-[15px] px-4 py-2 rounded-lg shadow-sm cursor-grab active:cursor-grabbing hover:bg-primary/90 transition-all select-none"
              >
                {item.word}
              </div>
            ))}
            {wordBank.length === 0 && (
              <div className="w-full h-full flex items-center justify-center text-on-surface-variant/50 italic text-[14px]">
                No words left in the bank
              </div>
            )}
          </div>
        </div>

        {/* Answer Area (Target) */}
        <div>
          <p className="text-[12px] font-bold uppercase tracking-wider text-on-surface-variant mb-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">edit</span> Your Sentence
          </p>
          <div 
            className="flex flex-wrap gap-2.5 p-5 min-h-[100px] bg-white dark:bg-[#1a1a1a] rounded-xl border-2 border-primary/30 shadow-inner transition-colors"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "answer")}
          >
            {answerWords.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => onDragStart(e, item, "answer")}
                onClick={() => moveWordToBank(item)}
                className="bg-surface-variant text-on-surface font-medium text-[15px] px-4 py-2 rounded-lg cursor-grab active:cursor-grabbing hover:bg-surface-variant/80 transition-all shadow-sm border border-outline-variant select-none"
              >
                {item.word}
              </div>
            ))}
            {answerWords.length === 0 && (
              <div className="w-full h-full flex items-center justify-center text-on-surface-variant/50 italic text-[14px]">
                Drop words here...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={() => {
            // Reset current sentence
            const words = current.scrambled.split("/").map((w) => w.trim()).filter(Boolean);
            setWordBank(words.map((w, i) => ({ id: `word-${i}`, word: w })));
            setAnswerWords([]);
          }}
          className="text-on-surface-variant font-bold text-[14px] px-4 py-2 rounded-lg hover:bg-surface-variant transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span> Reset Sentence
        </button>

        <button
          onClick={handleNext}
          className="bg-primary text-white font-bold text-[15px] px-8 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center gap-2 hover:translate-x-1"
        >
          {currentIdx + 1 >= items.length ? "Finish Test" : "Next Sentence"}
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
