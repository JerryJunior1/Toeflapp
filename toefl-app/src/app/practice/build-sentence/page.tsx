import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";

export default function BuildSentence() {
  return (
    <div className="min-h-screen text-on-surface bg-background flex flex-col">
      <TopNavBar />
      <main className="w-full px-4 md:px-[var(--spacing-margin-desktop)] max-w-[var(--spacing-container-max)] mx-auto py-12 flex flex-col gap-8 flex-grow">
        
        <header className="flex flex-col gap-2">
          <h1 className="font-headline text-[32px] font-bold text-on-surface">Module 1: Build a Sentence</h1>
          <p className="text-[18px] text-on-surface-variant max-w-2xl">
            Construct a grammatically correct sentence that addresses the prompt. Drag and drop or click the words to build your answer.
          </p>
        </header>

        {/* Challenge Area */}
        <div className="bg-surface-container-lowest border border-[#E5E2D0] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] rounded-xl p-8 flex flex-col gap-8">
          
          {/* Prompt */}
          <div className="border-b border-outline-variant pb-4">
            <h2 className="text-[12px] font-semibold text-secondary uppercase tracking-widest mb-2">Prompt</h2>
            <p className="font-headline text-[24px] font-bold text-on-surface italic">"Describe the impact of technology on education."</p>
          </div>
          
          {/* Construction Zone */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[12px] font-semibold text-secondary uppercase tracking-widest">Construction Zone</h3>
            <div className="min-h-[80px] p-4 bg-surface-container-low border border-[#E5E2D0] rounded-lg flex flex-wrap gap-2 items-center cursor-text">
              {/* Added statically for demo, naturally would be dynamic/interactive */}
            </div>
          </div>
          
          {/* Word Bank */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[12px] font-semibold text-secondary uppercase tracking-widest">Word Bank</h3>
            <div className="flex flex-wrap gap-3 p-4 bg-surface-container rounded-lg">
              {["technology", "education", "greatly", "has", "improved"].map((word, i) => (
                <button key={i} className="px-4 py-2 bg-surface-container-lowest border border-[#E5E2D0] rounded-md text-[16px] text-on-surface hover:bg-surface-variant transition-all shadow-sm">
                  {word}
                </button>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex justify-end pt-4 border-t border-outline-variant">
            <button className="px-6 py-3 bg-primary text-white rounded-lg text-[14px] font-medium hover:bg-on-primary-fixed-variant transition-colors shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] icon-filled">done</span>
              Check Answer
            </button>
          </div>
        </div>

        {/* Feedback Panel (mocking hidden by default) */}
        <div className="hidden bg-surface-container-lowest border border-[#E5E2D0] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] rounded-xl p-8 flex-col gap-6 border-l-4 border-l-primary">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-container rounded-full flex-shrink-0">
              <span className="material-symbols-outlined text-[20px] text-on-primary-container">lightbulb</span>
            </div>
            <div>
              <h3 className="font-headline text-[24px] font-bold text-primary mb-2">Excellent Structure</h3>
              <p className="text-[16px] text-on-surface-variant">
                "Technology has greatly improved education." is a grammatically sound and direct response to the prompt. Your placement of the adverb 'greatly' correctly modifies the verb 'improved'.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-[12px] font-semibold">Grammar: 100%</div>
            <div className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-[12px] font-semibold">Relevance: High</div>
          </div>
        </div>
        
      </main>
      <Footer />
    </div>
  );
}
