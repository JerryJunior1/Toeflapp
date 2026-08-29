"use client";

import { useState, useEffect, useRef } from "react";
import { tatianaTests, TatianaTest } from "@/data/tatianaTests";
import { createBrowserClient } from "@supabase/ssr";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function TatianaInterview() {
  const [selectedTest, setSelectedTest] = useState<TatianaTest | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [audioMimeType, setAudioMimeType] = useState<string>("audio/webm");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer
  const [timeLeft, setTimeLeft] = useState(45);

  // Grading
  const [gradingResults, setGradingResults] = useState<any[]>([]);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
  const [gradingError, setGradingError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [avgScores, setAvgScores] = useState<Record<number, string | null>>({});

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ── FETCH AVERAGE SCORES PER TEST ────────────────────────────────────────
  const fetchAvgScores = async () => {
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data, error } = await supabase
        .from("practice_sessions")
        .select("score_details, score_value, created_at")
        .eq("task_type", "take-interview")
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
        if (!taskId || !taskId.startsWith("tatiana-test-") || seenTasks.has(taskId)) continue;
        seenTasks.add(taskId);

        const match = taskId.match(/tatiana-test-(\d+)-q/);
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

  // ── TTS ──────────────────────────────────────────────────────────────────
  const speakQuestion = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.lang = "en-US";
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => v.lang === "en-US" && v.localService === false) ||
      voices.find((v) => v.lang === "en-US") ||
      voices[0];
    if (preferred) utterance.voice = preferred;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // Auto-read question when entering practice
  useEffect(() => {
    if (selectedTest) {
      const q = selectedTest.interview.questions[currentQuestionIndex]?.question;
      if (q) {
        const t = setTimeout(() => speakQuestion(q), 600);
        return () => clearTimeout(t);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTest, currentQuestionIndex]);

  // ── SELECT TEST ───────────────────────────────────────────────────────────
  const handleSelectTest = (test: TatianaTest) => {
    setSelectedTest(test);
    setCurrentQuestionIndex(0);
    setAudioBlobUrl(null);
    setAudioBase64(null);
    setGradingResults([]);
    setAudioUrls([]);
    setGradingError(null);
    setTimeLeft(45);
  };

  const handleBack = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setSelectedTest(null);
    setAudioBlobUrl(null);
    setAudioBase64(null);
    setCurrentQuestionIndex(0);
    setGradingResults([]);
    setAudioUrls([]);
    setGradingError(null);
    setTimeLeft(45);
    setShowSummary(false);
    fetchAvgScores();
    if (isRecording) stopRecording();
  };

  // ── RECORDING ─────────────────────────────────────────────────────────────
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      let mimeType = "";
      if (MediaRecorder.isTypeSupported("audio/webm")) mimeType = "audio/webm";
      else if (MediaRecorder.isTypeSupported("audio/mp4")) mimeType = "audio/mp4";

      const mediaRecorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const actualMimeType = mediaRecorder.mimeType || mimeType || "audio/webm";
        setAudioMimeType(actualMimeType);
        const audioBlob = new Blob(audioChunksRef.current, { type: actualMimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlobUrl(audioUrl);

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setAudioBase64(base64String.split(",")[1]);
        };
        stream.getTracks().forEach((t) => t.stop());
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
    } catch {
      alert("Could not access your microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  // ── SUBMIT ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!audioBase64 || !selectedTest) return;
    setIsSubmitting(true);
    setGradingError(null);

    const currentQ = selectedTest.interview.questions[currentQuestionIndex];

    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: `tatiana-test-${selectedTest.testNumber}-q${currentQuestionIndex + 1}`,
          taskType: "take-interview",
          promptData: {
            scenario_context: selectedTest.interview.scenario,
            question: currentQ.question,
            modelResponse: currentQ.sampleAnswer,
          },
          audioBase64,
          mimeType: audioMimeType,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to grade response");

      const newResults = [...gradingResults];
      newResults[currentQuestionIndex] = json.data;
      setGradingResults(newResults);

      const newUrls = [...audioUrls];
      newUrls[currentQuestionIndex] = audioBlobUrl as string;
      setAudioUrls(newUrls);
    } catch (err: any) {
      setGradingError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedTest) return;
    if (currentQuestionIndex < selectedTest.interview.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAudioBlobUrl(null);
      setAudioBase64(null);
      setTimeLeft(45);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // ── LIST VIEW ─────────────────────────────────────────────────────────────
  if (!selectedTest) {
    const filtered = tatianaTests.filter(
      (t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.interview.scenario.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="w-full max-w-[var(--spacing-container-max)] mx-auto flex flex-col gap-6">
        <div className="card rounded-xl p-8 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[20px]" style={{ color: "#7b3fb3" }}>school</span>
            <span className="text-[16px] font-semibold uppercase tracking-wider" style={{ color: "#7b3fb3" }}>Tatiana — Speaking</span>
          </div>
          <h1 className="font-headline text-[32px] font-bold text-on-surface">Take an Interview</h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <p className="text-[16px] text-on-surface-variant leading-relaxed max-w-lg">
              Practice realistic TOEFL speaking interview questions from Tatiana's test series. Record your answers and get AI-powered scoring and feedback.
            </p>
            <div className="relative w-full md:w-72 shrink-0">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input
                type="text"
                placeholder="Search tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-surface-variant rounded-lg focus:outline-none focus:border-primary transition-colors text-[14px] text-on-surface"
              />
            </div>
          </div>

          <div>
            <h2 className="text-[20px] font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px]" style={{ color: "#7b3fb3" }}>school</span>
              Tatiana's Tests
              <span className="text-[14px] text-on-surface-variant font-normal bg-surface-variant px-2 py-0.5 rounded-full ml-2">{filtered.length} tests</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((test) => (
                <div
                  key={test.testNumber}
                  onClick={() => handleSelectTest(test)}
                  className="bg-surface-container-low border border-surface-variant rounded-xl p-6 cursor-pointer hover:border-primary hover:shadow-md transition-all group flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">forum</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {avgScores[test.testNumber] != null && (
                        <span
                          className={`text-[12px] font-bold px-2.5 py-1 rounded-full ${
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
                      <span className="text-[12px] font-bold text-on-surface-variant bg-surface-variant px-2 py-1 rounded">
                        Test #{test.testNumber}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-[18px] font-bold text-on-surface mb-1 line-clamp-2">{test.title}</h3>
                  <p className="text-[13px] text-on-surface-variant line-clamp-2 mb-4">{test.interview.scenario}</p>
                  <div className="mt-auto pt-4 flex flex-col gap-2">
                    <p className="text-[13px] text-on-surface-variant font-medium">
                      {test.interview.questions.length} questions · 45 sec each
                    </p>
                    <p className="text-[14px] text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span> Start Interview
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── PRACTICE VIEW ─────────────────────────────────────────────────────────
  const currentQuestion = selectedTest.interview.questions[currentQuestionIndex];
  const currentGrading = gradingResults[currentQuestionIndex];
  const isFinished =
    currentQuestionIndex >= selectedTest.interview.questions.length - 1 && currentGrading;

  // ── SUMMARY VIEW ──────────────────────────────────────────────────────────
  if (showSummary) {
    let totalScore = 0;
    let count = 0;
    gradingResults.forEach((res) => {
      if (res && res.score) {
        const s = parseFloat(res.score.split('/')[0]);
        if (!isNaN(s)) {
          totalScore += s;
          count++;
        }
      }
    });
    const averageScore = count > 0 ? totalScore / count : 0;

    return (
      <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6">
        <div className="card rounded-xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[48px] text-primary">emoji_events</span>
          </div>
          <h2 className="font-headline text-[32px] font-bold text-on-surface mb-2">Interview Complete!</h2>
          <p className="text-[16px] text-on-surface-variant mb-8 max-w-md">
            You have successfully completed {selectedTest?.title}. Here is your overall performance.
          </p>
          
          <div className="bg-surface-container-low border border-surface-variant rounded-xl p-8 mb-8 min-w-[300px]">
            <p className="text-[14px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Average Score</p>
            <p className="text-[48px] font-black text-primary">{averageScore.toFixed(1)} <span className="text-[20px] text-on-surface-variant">/ 5</span></p>
          </div>

          <button
            onClick={handleBack}
            className="bg-primary text-white font-bold text-[14px] px-8 py-3 rounded hover:bg-primary-container transition-colors flex items-center gap-2 shadow-sm mb-4"
          >
            Return to Test List <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
        </div>

        {/* Breakdown of questions */}
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-[20px] text-on-surface mt-4">Review Your Answers</h3>
          {selectedTest?.interview.questions.map((q, i) => {
            const grade = gradingResults[i];
            const audio = audioUrls[i];
            if (!grade) return null;

            return (
              <div key={i} className="card rounded-xl p-6 border border-surface-variant flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-[13px]">{i + 1}</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[16px] font-semibold text-on-surface mb-3 leading-relaxed">
                      "{q.question}"
                    </p>
                    {audio && (
                      <audio src={audio} controls className="h-10 w-full max-w-sm mb-4" />
                    )}
                    <div className="flex items-center gap-2 mb-4">
                       <span className="text-[13px] font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-full flex items-center gap-1">
                         <span className="material-symbols-outlined text-[16px]">verified</span>
                         Score: {grade.score}
                       </span>
                    </div>
                    {grade.transcript && (
                      <div className="bg-surface border border-outline-variant rounded-lg p-3 mb-4">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]">transcribe</span> What you said
                        </p>
                        <p className="text-[14px] text-on-surface italic opacity-80">{grade.transcript}</p>
                      </div>
                    )}
                    <p className="text-[14px] text-on-surface-variant leading-relaxed">
                      {grade.overallFeedback}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6">
      {/* Header + Progress */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wider mb-1" style={{ color: "#7b3fb3" }}>
            Tatiana · Test {selectedTest.testNumber}
          </p>
          <h1 className="font-headline text-[28px] font-bold text-on-surface mb-1">{selectedTest.title}</h1>
          <p className="text-[15px] text-on-surface-variant">{selectedTest.interview.scenario}</p>
        </div>
        {/* Step dots */}
        <div className="flex items-center gap-2 mb-1 shrink-0">
          {selectedTest.interview.questions.map((_, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {idx < currentQuestionIndex ? (
                <span className="material-symbols-outlined text-[20px] text-primary">check_circle</span>
              ) : idx === currentQuestionIndex ? (
                <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary/20" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-surface-variant" />
              )}
              {idx < selectedTest.interview.questions.length - 1 && (
                <div className={`w-8 h-px ${idx < currentQuestionIndex ? "bg-primary" : "bg-surface-variant"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <hr className="border-surface-variant" />

      {/* Main Card */}
      <div className="card rounded-xl p-8 min-h-[500px] flex flex-col items-center relative">
        <button onClick={handleBack} className="absolute top-6 left-6 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="bg-surface-variant/30 text-on-surface-variant px-4 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-2 mb-8">
          <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
          Question {currentQuestionIndex + 1} of {selectedTest.interview.questions.length}
        </div>

        <h2 className="font-headline text-[24px] md:text-[28px] font-bold text-on-surface text-center leading-relaxed max-w-2xl mb-4">
          "{currentQuestion.question}"
        </h2>

        {/* TTS replay */}
        <div className="flex items-center gap-3 mb-8">
          {isSpeaking ? (
            <div className="flex items-center gap-2 text-primary text-[13px] font-medium">
              <span className="flex gap-0.5">
                <span className="w-1 h-4 bg-primary rounded animate-bounce [animation-delay:0ms]" />
                <span className="w-1 h-4 bg-primary rounded animate-bounce [animation-delay:150ms]" />
                <span className="w-1 h-4 bg-primary rounded animate-bounce [animation-delay:300ms]" />
              </span>
              Speaking...
            </div>
          ) : (
            <button
              onClick={() => speakQuestion(currentQuestion.question)}
              className="flex items-center gap-1.5 text-[13px] text-on-surface-variant hover:text-primary transition-colors"
              title="Replay question"
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
              Replay question
            </button>
          )}
        </div>

        {/* Recording controls */}
        {!currentGrading && (
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="text-[48px] font-bold text-primary tracking-wider mb-2 font-mono">
              {formatTime(timeLeft)}
            </div>

            <button
              onClick={toggleRecording}
              disabled={!!audioBlobUrl || isSpeaking}
              className={`w-24 h-24 rounded-2xl flex items-center justify-center transition-all shadow-md ${
                !!audioBlobUrl || isSpeaking
                  ? "bg-surface-variant text-on-surface-variant cursor-not-allowed"
                  : isRecording
                  ? "bg-error text-white animate-pulse shadow-error/30"
                  : "bg-primary text-white hover:bg-primary-container hover:text-on-primary-container shadow-primary/20 hover:scale-105"
              }`}
            >
              <span className="material-symbols-outlined text-[40px]">
                {isRecording ? "stop" : "mic"}
              </span>
            </button>
            <p className="text-on-surface-variant font-medium mt-2">
              {isSpeaking
                ? "Listen to the question..."
                : isRecording
                ? "Recording in progress..."
                : audioBlobUrl
                ? "Recording complete. Click Submit to continue."
                : "Click to start recording"}
            </p>

            {audioBlobUrl && !isRecording && (
              <div className="mt-4">
                <audio src={audioBlobUrl} controls playsInline className="h-10" />
              </div>
            )}
          </div>
        )}

        {/* Actions */}
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
                <>Evaluating... <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /></>
              ) : (
                <>Submit &amp; Next <span className="material-symbols-outlined text-[18px]">arrow_forward</span></>
              )}
            </button>
          </div>
        )}

        {/* Grading error */}
        {gradingError && (
          <div className="w-full mt-8 p-4 bg-error-container text-on-error-container rounded-lg border border-error text-left">
            <span className="material-symbols-outlined mb-1">error</span>
            <p className="font-bold text-[14px]">Grading Failed</p>
            <p className="text-[14px]">{gradingError}</p>
          </div>
        )}

        {/* Grading results */}
        {currentGrading && (
          <div className="w-full mt-4 animate-fade-in text-left">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-[28px]">verified</span>
              <h2 className="font-headline text-[24px] font-bold text-on-surface">AI Evaluation</h2>
              <div className="ml-auto bg-primary-container text-on-primary-container font-bold px-4 py-2 rounded-full text-[18px]">
                Score: {currentGrading.score}
              </div>
            </div>

            {/* Transcript */}
            {currentGrading?.transcript && (() => {
              const wordCount = currentGrading.transcript.trim().split(/\s+/).filter(Boolean).length;
              return (
                <div className="w-full mb-6 p-4 bg-surface border border-outline-variant rounded-lg">
                  <h4 className="text-[14px] font-bold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">transcribe</span>
                    Verbatim Transcript
                    <span className="ml-auto text-[12px] font-semibold bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-full normal-case tracking-normal">
                      {wordCount} word{wordCount !== 1 ? "s" : ""}
                    </span>
                  </h4>
                  <p className="text-[16px] text-on-surface leading-relaxed whitespace-pre-wrap italic opacity-80">
                    {currentGrading.transcript}
                  </p>
                </div>
              );
            })()}

            {/* Overall feedback */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-surface-variant mb-6">
              <p className="text-[16px] text-on-surface leading-relaxed">{currentGrading.overallFeedback}</p>
            </div>

            {/* Strengths & Weaknesses */}
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

            {/* Grammar corrections */}
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

            {/* Ideal response (AI-improved) */}
            {currentGrading.idealResponse && (
              <div className="bg-[#1a73e8]/5 p-6 rounded-xl border border-[#1a73e8]/20 mb-6">
                <h3 className="text-[16px] font-bold text-[#1a73e8] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span> Your Improved Answer (Score: 5/5)
                  <span className="ml-auto text-[12px] font-semibold bg-[#1a73e8]/10 text-[#1a73e8] px-2.5 py-1 rounded-full">
                    {currentGrading.idealResponse.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                </h3>
                <div className="relative">
                  <span className="material-symbols-outlined absolute text-[40px] text-[#1a73e8]/10 -top-2 -left-2">format_quote</span>
                  <div className="text-[15px] text-on-surface leading-relaxed relative z-10 pl-6 italic whitespace-pre-wrap">
                    {currentGrading.idealResponse}
                  </div>
                </div>
              </div>
            )}

            {/* Tatiana's model answer */}
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 mb-8">
              <h3 className="text-[16px] font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">workspace_premium</span> Tatiana's Model Answer
                <span className="ml-auto text-[12px] font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                  {currentQuestion.sampleAnswer.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </h3>
              <div className="relative">
                <span className="material-symbols-outlined absolute text-[40px] text-primary/10 -top-2 -left-2">format_quote</span>
                <div className="text-[15px] text-on-surface leading-relaxed relative z-10 pl-6 italic whitespace-pre-wrap">
                  {currentQuestion.sampleAnswer}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end pt-4 border-t border-surface-variant">
              {isFinished ? (
                <button
                  onClick={() => setShowSummary(true)}
                  className="bg-secondary text-white font-bold text-[14px] px-8 py-3 rounded hover:bg-secondary/90 transition-colors flex items-center gap-2 shadow-sm"
                >
                  View Summary <span className="material-symbols-outlined text-[18px]">assessment</span>
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
