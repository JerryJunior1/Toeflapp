"use client";

import { useState, useRef, useEffect } from "react";
import { tatianaTests } from "@/data/tatianaTests";
import { createBrowserClient } from "@supabase/ssr";

type Phase = "select" | "practice" | "done";

interface SentenceResult {
  sentence: string;
  audioUrl: string;
  grading: any | null;
  gradingError: string | null;
}

export default function TatianaListenRepeat() {
  const [selectedTestNum, setSelectedTestNum] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("select");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [audioMimeType, setAudioMimeType] = useState("audio/webm");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentGrading, setCurrentGrading] = useState<any | null>(null);
  const [gradingError, setGradingError] = useState<string | null>(null);
  const [results, setResults] = useState<SentenceResult[]>([]);
  // Map of testNumber -> average score string (e.g. "3.4") or null
  const [avgScores, setAvgScores] = useState<Record<number, string | null>>({});

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const selectedTest = tatianaTests.find((t) => t.testNumber === selectedTestNum);
  const sentences = selectedTest?.listenRepeat.sentences || [];
  const currentSentence = sentences[currentIdx];

  // ── FETCH AVERAGE SCORES PER TEST ────────────────────────────────────────
  const fetchAvgScores = async () => {
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data, error } = await supabase
        .from("practice_sessions")
        .select("task_id, score_value")
        .eq("task_type", "listen-and-repeat")
        .like("task_id", "tatiana-lr-test%");

      if (error || !data) return;

      // Group scores by test number and compute average
      const groups: Record<number, number[]> = {};
      for (const row of data) {
        // task_id format: tatiana-lr-test{N}-s{M}
        const match = row.task_id?.match(/tatiana-lr-test(\d+)-s/);
        if (!match) continue;
        const testNum = parseInt(match[1], 10);
        const score = parseFloat(row.score_value);
        if (isNaN(score)) continue;
        if (!groups[testNum]) groups[testNum] = [];
        groups[testNum].push(score);
      }

      const computed: Record<number, string | null> = {};
      for (const [testNum, scores] of Object.entries(groups)) {
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        computed[Number(testNum)] = avg.toFixed(1);
      }
      setAvgScores(computed);
    } catch (e) {
      // silently ignore — scores are non-critical
    }
  };

  useEffect(() => {
    fetchAvgScores();
  }, []);

  // ── TTS ──────────────────────────────────────────────────────────────────
  const speakSentence = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.lang = "en-US";
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => v.lang === "en-US" && v.localService === false) ||
      voices.find((v) => v.lang === "en-US") ||
      voices[0];
    if (preferred) utterance.voice = preferred;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => { setIsPlaying(false); setHasPlayed(true); };
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
    setHasPlayed(false);
  };

  // ── RECORDING ─────────────────────────────────────────────────────────────
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      let mimeType = "";
      if (MediaRecorder.isTypeSupported("audio/webm")) mimeType = "audio/webm";
      else if (MediaRecorder.isTypeSupported("audio/mp4")) mimeType = "audio/mp4";

      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const actualMime = recorder.mimeType || mimeType || "audio/webm";
        setAudioMimeType(actualMime);
        const blob = new Blob(audioChunksRef.current, { type: actualMime });
        const url = URL.createObjectURL(blob);
        setAudioBlobUrl(url);

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const b64 = (reader.result as string).split(",")[1];
          setAudioBase64(b64);
        };
        stream.getTracks().forEach((t) => t.stop());
      };

      setAudioBlobUrl(null);
      setAudioBase64(null);
      recorder.start();
      setIsRecording(true);
    } catch {
      alert("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // ── SUBMIT TO AI ──────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!audioBase64 || !selectedTest) return;
    setIsSubmitting(true);
    setGradingError(null);
    setCurrentGrading(null);

    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: `tatiana-lr-test${selectedTest.testNumber}-s${currentIdx + 1}`,
          taskType: "listen-and-repeat",
          promptData: {
            targetSentence: currentSentence.text,
          },
          audioBase64,
          mimeType: audioMimeType,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to grade response");
      setCurrentGrading(json.data);
    } catch (err: any) {
      setGradingError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── NEXT SENTENCE ─────────────────────────────────────────────────────────
  const handleNext = () => {
    if (!audioBlobUrl) return;
    setResults((prev) => [
      ...prev,
      {
        sentence: currentSentence.text,
        audioUrl: audioBlobUrl,
        grading: currentGrading,
        gradingError,
      },
    ]);

    if (currentIdx + 1 >= sentences.length) {
      setPhase("done");
    } else {
      setCurrentIdx((i) => i + 1);
      setAudioBlobUrl(null);
      setAudioBase64(null);
      setHasPlayed(false);
      setIsPlaying(false);
      setCurrentGrading(null);
      setGradingError(null);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setAudioBlobUrl(null);
    setAudioBase64(null);
    setHasPlayed(false);
    setIsPlaying(false);
    setCurrentGrading(null);
    setGradingError(null);
    setResults([]);
    setPhase("practice");
  };

  const scoreColor = (score: string) => {
    const n = parseFloat(score);
    if (n >= 4.5) return "text-[#1a73e8] bg-[#1a73e8]/10";
    if (n >= 3) return "text-[#0d7a5f] bg-[#0d7a5f]/10";
    if (n >= 2) return "text-[#c2790a] bg-[#c2790a]/10";
    return "text-error bg-error/10";
  };

  // ── SELECT TEST ──────────────────────────────────────────────────────────
  if (phase === "select") {
    return (
      <div className="w-full max-w-[900px] mx-auto flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]">school</span>
            Tatiana — Speaking
          </div>
          <h1 className="font-headline text-[32px] font-bold text-on-surface">Listen &amp; Repeat</h1>
          <p className="text-[16px] text-on-surface-variant mt-2">
            Choose a test. Each sentence is read aloud — record yourself repeating it, then get AI scoring on your pronunciation, accuracy, and prosody.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tatianaTests.map((test) => (
            <button
              key={test.testNumber}
              onClick={() => {
                setSelectedTestNum(test.testNumber);
                setCurrentIdx(0);
                setResults([]);
                setAudioBlobUrl(null);
                setAudioBase64(null);
                setHasPlayed(false);
                setCurrentGrading(null);
                setGradingError(null);
                setPhase("practice");
              }}
              className="card rounded-xl p-5 text-left hover:border-primary hover:shadow-md transition-all border border-surface-variant flex flex-col gap-2 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[18px]">record_voice_over</span>
                </div>
                <span className="text-[13px] font-bold text-primary uppercase tracking-wider">Test {test.testNumber}</span>
                {/* Average score badge */}
                {avgScores[test.testNumber] != null ? (
                  <span
                    className={`ml-auto text-[12px] font-bold px-2.5 py-0.5 rounded-full ${
                      parseFloat(avgScores[test.testNumber]!) >= 4
                        ? "bg-[#0d7a5f]/10 text-[#0d7a5f]"
                        : parseFloat(avgScores[test.testNumber]!) >= 2.5
                        ? "bg-[#c2790a]/10 text-[#c2790a]"
                        : "bg-error/10 text-error"
                    }`}
                  >
                    ★ {avgScores[test.testNumber]}/5
                  </span>
                ) : (
                  <span className="ml-auto text-[12px] text-on-surface-variant/50">—/5</span>
                )}
              </div>
              <p className="text-[14px] font-semibold text-on-surface leading-snug">{test.title}</p>
              <p className="text-[12px] text-on-surface-variant">{test.listenRepeat.sentences.length} sentences · AI scored</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── DONE ─────────────────────────────────────────────────────────────────
  if (phase === "done") {
    const scoredResults = results.filter((r) => r.grading?.score);
    const avgScore =
      scoredResults.length > 0
        ? (
            scoredResults.reduce((sum, r) => {
              const n = parseFloat(r.grading.score);
              return sum + (isNaN(n) ? 0 : n);
            }, 0) / scoredResults.length
          ).toFixed(1)
        : null;

    return (
      <div className="w-full max-w-[760px] mx-auto flex flex-col gap-6">
        <div className="card rounded-xl p-8 flex flex-col items-center text-center gap-4">
          <span className="material-symbols-outlined text-[56px] text-primary">task_alt</span>
          <h2 className="font-headline text-[28px] font-bold text-on-surface">Test Complete!</h2>
          <p className="text-on-surface-variant text-[16px]">
            You completed all {sentences.length} sentences of Test {selectedTestNum}.
          </p>
          {avgScore && (
            <div className="bg-primary-container text-on-primary-container font-bold px-6 py-3 rounded-full text-[22px]">
              Average Score: {avgScore} / 5
            </div>
          )}
          <div className="flex gap-3 mt-2 flex-wrap justify-center">
            <button onClick={handleRestart} className="bg-primary text-white font-bold text-[14px] px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">replay</span> Try Again
            </button>
            <button
              onClick={() => {
                setPhase("select");
                setSelectedTestNum(null);
                fetchAvgScores();
              }}
              className="bg-surface-container-high text-on-surface font-bold text-[14px] px-6 py-3 rounded-lg hover:bg-surface-variant transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">list</span> Choose Another Test
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[16px] text-on-surface">Results by Sentence</h3>
          {results.map((r, i) => (
            <div key={i} className="card rounded-xl border border-surface-variant overflow-hidden">
              {/* Sentence header */}
              <div className="bg-surface-container-low px-5 py-4 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-[13px]">{i + 1}</span>
                </div>
                <p className="text-[15px] font-semibold text-on-surface flex-1 leading-snug italic">"{r.sentence}"</p>
                {r.grading?.score && (
                  <span className={`text-[13px] font-bold px-3 py-1 rounded-full ${scoreColor(r.grading.score)}`}>
                    {r.grading.score}
                  </span>
                )}
              </div>

              <div className="px-5 py-4 flex flex-col gap-4">
                {/* Audio playback */}
                <audio src={r.audioUrl} controls className="h-10 w-full" />

                {r.grading && (
                  <>
                    {/* Transcript */}
                    {r.grading.transcript && (
                      <div className="bg-surface border border-outline-variant rounded-lg p-3">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]">transcribe</span> What you said
                        </p>
                        <p className="text-[14px] text-on-surface italic opacity-80">{r.grading.transcript}</p>
                      </div>
                    )}

                    {/* Feedback */}
                    <p className="text-[14px] text-on-surface-variant leading-relaxed">{r.grading.overallFeedback}</p>

                    {/* Corrections */}
                    {r.grading.grammarCorrections?.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {r.grading.grammarCorrections.map((corr: any, j: number) => (
                          <div key={j} className="flex flex-wrap gap-2 items-center text-[13px]">
                            <span className="bg-error/10 text-error px-2 py-0.5 rounded line-through">{corr.original}</span>
                            <span className="material-symbols-outlined text-on-surface-variant text-[16px]">arrow_forward</span>
                            <span className="bg-[#1a73e8]/10 text-[#1a73e8] px-2 py-0.5 rounded font-medium">{corr.corrected}</span>
                            {corr.explanation && <span className="text-on-surface-variant italic">— {corr.explanation}</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {r.gradingError && (
                  <p className="text-[13px] text-error">Grading failed: {r.gradingError}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── PRACTICE ─────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-[760px] mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setPhase("select");
            setSelectedTestNum(null);
            setCurrentIdx(0);
            setAudioBlobUrl(null);
            setAudioBase64(null);
            setHasPlayed(false);
            setResults([]);
            setCurrentGrading(null);
            fetchAvgScores();
          }}
          className="text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <p className="text-[12px] font-bold text-on-surface-variant uppercase tracking-wider">Test {selectedTestNum} — Listen &amp; Repeat</p>
          <h1 className="font-headline text-[22px] font-bold text-on-surface">{selectedTest?.title}</h1>
        </div>
      </div>

      {/* Scenario */}
      <div className="bg-surface-container-low border border-surface-variant rounded-xl p-4 text-[14px] text-on-surface-variant italic">
        {selectedTest?.listenRepeat.scenario}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-surface-variant rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${(currentIdx / sentences.length) * 100}%` }} />
        </div>
        <span className="text-[13px] font-bold text-on-surface-variant shrink-0">{currentIdx + 1} / {sentences.length}</span>
      </div>

      {/* Main card */}
      <div className="card rounded-xl p-8 flex flex-col items-center gap-6 min-h-[400px] justify-center">
        <div className="bg-surface-container-low border border-surface-variant px-4 py-1.5 rounded-full text-[12px] font-bold text-on-surface-variant uppercase tracking-wider">
          Sentence {currentIdx + 1}
        </div>

        {/* Step 1 — LISTEN */}
        {!hasPlayed && (
          <div className="flex flex-col items-center gap-3">
            <div className="text-[13px] font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">headphones</span>
              Step 1 — Listen
            </div>
            <button
              onClick={() => speakSentence(currentSentence.text)}
              disabled={isPlaying}
              className={`w-24 h-24 rounded-2xl flex items-center justify-center transition-all shadow-md ${
                isPlaying
                  ? "bg-primary/50 cursor-not-allowed"
                  : "bg-primary text-white hover:scale-105 shadow-primary/20"
              }`}
            >
              {isPlaying
                ? <span className="material-symbols-outlined text-white text-[40px] animate-pulse">volume_up</span>
                : <span className="material-symbols-outlined text-white text-[40px]">play_arrow</span>
              }
            </button>
            <p className="text-[14px] font-medium text-on-surface-variant">
              {isPlaying ? "Listening..." : "Tap to hear the sentence"}
            </p>
            <p className="text-[12px] text-on-surface-variant opacity-60 italic">The sentence text is hidden — listen carefully!</p>
          </div>
        )}

        {/* Step 2 — RECORD */}
        {hasPlayed && !currentGrading && (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="text-[13px] font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">mic</span>
              Step 2 — Repeat
            </div>

            {/* Replay */}
            <button
              onClick={() => speakSentence(currentSentence.text)}
              className="flex items-center gap-1.5 text-[13px] text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
              Replay sentence
            </button>

            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!!audioBlobUrl}
              className={`w-24 h-24 rounded-2xl flex items-center justify-center transition-all shadow-md ${
                !!audioBlobUrl
                  ? "bg-surface-variant text-on-surface-variant cursor-not-allowed"
                  : isRecording
                  ? "bg-error text-white animate-pulse shadow-error/30"
                  : "bg-primary text-white hover:scale-105 shadow-primary/20"
              }`}
            >
              <span className="material-symbols-outlined text-[40px]">{isRecording ? "stop" : "mic"}</span>
            </button>
            <p className="text-[14px] font-medium text-on-surface-variant">
              {audioBlobUrl
                ? "Recording saved. Click Submit for AI scoring."
                : isRecording
                ? "Recording... tap to stop"
                : "Tap to record your repetition"}
            </p>

            {audioBlobUrl && (
              <audio src={audioBlobUrl} controls className="h-10 w-full max-w-sm" />
            )}

            {/* Submit for grading */}
            {audioBlobUrl && !isRecording && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !audioBase64}
                className="bg-primary text-white font-bold px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Scoring... <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /></>
                ) : (
                  <><span className="material-symbols-outlined text-[18px]">auto_awesome</span> Get AI Score</>
                )}
              </button>
            )}

            {gradingError && (
              <div className="w-full p-3 bg-error-container text-on-error-container rounded-lg text-[14px]">
                Grading failed: {gradingError}
              </div>
            )}
          </div>
        )}

        {/* Step 3 — RESULTS */}
        {currentGrading && (
          <div className="w-full text-left flex flex-col gap-4 animate-fade-in">
            {/* Score badge */}
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">verified</span>
              <h3 className="font-headline text-[22px] font-bold text-on-surface">AI Result</h3>
              <div className={`ml-auto font-bold px-4 py-2 rounded-full text-[18px] ${scoreColor(currentGrading.score)}`}>
                {currentGrading.score}
              </div>
            </div>

            {/* Target sentence revealed */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                Target Sentence
              </p>
              <p className="text-[16px] font-semibold text-on-surface italic">"{currentSentence.text}"</p>
            </div>

            {/* Transcript */}
            {currentGrading.transcript && (
              <div className="bg-surface border border-outline-variant rounded-lg p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">transcribe</span>
                  What you said
                </p>
                <p className="text-[15px] text-on-surface italic opacity-80">{currentGrading.transcript}</p>
              </div>
            )}

            {/* Feedback */}
            <div className="bg-surface-container-low p-4 rounded-xl border border-surface-variant">
              <p className="text-[15px] text-on-surface leading-relaxed">{currentGrading.overallFeedback}</p>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentGrading.strengths?.length > 0 && (
                <div className="bg-surface-container-low p-4 rounded-xl border border-surface-variant">
                  <h4 className="text-[14px] font-bold text-[#1a73e8] mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">thumb_up</span> Strengths
                  </h4>
                  <ul className="space-y-2">
                    {currentGrading.strengths.map((s: string, i: number) => (
                      <li key={i} className="text-[13px] text-on-surface-variant flex gap-2">
                        <span className="material-symbols-outlined text-[#1a73e8] text-[14px] shrink-0 mt-0.5">check_circle</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {currentGrading.weaknesses?.length > 0 && (
                <div className="bg-surface-container-low p-4 rounded-xl border border-surface-variant">
                  <h4 className="text-[14px] font-bold text-error mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">trending_down</span> To Improve
                  </h4>
                  <ul className="space-y-2">
                    {currentGrading.weaknesses.map((w: string, i: number) => (
                      <li key={i} className="text-[13px] text-on-surface-variant flex gap-2">
                        <span className="material-symbols-outlined text-error text-[14px] shrink-0 mt-0.5">warning</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Corrections */}
            {currentGrading.grammarCorrections?.length > 0 && (
              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-variant">
                <h4 className="text-[14px] font-bold text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">spellcheck</span> Word Corrections
                </h4>
                <div className="space-y-3">
                  {currentGrading.grammarCorrections.map((corr: any, i: number) => (
                    <div key={i} className="flex flex-wrap gap-2 items-center text-[13px]">
                      <span className="bg-error/10 text-error px-2 py-1 rounded line-through">{corr.original}</span>
                      <span className="material-symbols-outlined text-on-surface-variant text-[16px]">arrow_forward</span>
                      <span className="bg-[#1a73e8]/10 text-[#1a73e8] px-2 py-1 rounded font-medium">{corr.corrected}</span>
                      {corr.explanation && <span className="text-on-surface-variant italic text-[12px]">— {corr.explanation}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="bg-primary text-white font-bold text-[14px] px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
              >
                {currentIdx + 1 >= sentences.length ? "See Final Results" : "Next Sentence"}
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
