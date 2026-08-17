import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";

export default function TakeInterview() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNavBar />
      <main className="flex-grow w-full px-4 md:px-[var(--spacing-margin-desktop)] max-w-[var(--spacing-container-max)] mx-auto py-12 flex flex-col items-center">
        
        <div className="w-full max-w-3xl mb-8 flex justify-between items-end border-b border-outline-variant pb-4">
          <div>
            <h1 className="font-headline text-[32px] font-bold text-on-background">Interview Simulation</h1>
            <p className="text-[16px] text-on-surface-variant mt-2">Scenario: Research Interview on Urban Life</p>
          </div>
          
          {/* Progress Tracker */}
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[10px] text-white">check</span>
            </div>
            <div className="h-[2px] w-8 bg-primary"></div>
            <div className="w-4 h-4 rounded-full border-2 border-primary bg-surface-container-lowest"></div>
            <div className="h-[2px] w-8 bg-outline-variant"></div>
            <div className="w-4 h-4 rounded-full border-2 border-outline-variant bg-surface-container-lowest"></div>
            <div className="h-[2px] w-8 bg-outline-variant"></div>
            <div className="w-4 h-4 rounded-full border-2 border-outline-variant bg-surface-container-lowest"></div>
          </div>
        </div>

        {/* Question & Recording Card */}
        <div className="card w-full max-w-3xl rounded-lg p-8 flex flex-col items-center text-center relative overflow-hidden">
          
          <div className="mb-6 inline-flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full text-[12px] font-semibold text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
            <span>Question 2 of 4</span>
          </div>
          
          <h2 className="font-headline text-[24px] font-bold text-on-background mb-8 max-w-xl">
            "In your opinion, what is the most significant challenge facing modern cities today, and why?"
          </h2>

          {/* Timer */}
          <div className="font-headline text-[48px] font-bold text-primary mb-8 tracking-wider">
            00:45
          </div>

          {/* Microphone Button */}
          <button className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary-container hover:shadow-lg transition-all duration-300 group relative">
            <div className="absolute inset-0 rounded-full bg-primary opacity-20 animate-ping group-hover:animate-none"></div>
            <span className="material-symbols-outlined icon-filled text-[36px]">mic</span>
          </button>
          <p className="text-[14px] font-medium text-on-surface-variant mt-4">Click to start recording</p>

          {/* Transcription Area */}
          <div className="w-full mt-12 text-left">
            <h3 className="text-[14px] font-medium text-on-surface-variant mb-2 border-b border-surface-variant pb-2">Live Transcription</h3>
            <div className="min-h-[100px] p-4 bg-surface rounded border border-outline-variant text-[16px] text-on-surface-variant leading-loose" style={{ backgroundImage: "linear-gradient(#E5E2D0 1px, transparent 1px)", backgroundSize: "100% 32px" }}>
              <span className="animate-pulse">Listening...</span>
            </div>
          </div>

          <div className="w-full mt-8 flex justify-end gap-4">
            <button className="px-6 py-3 bg-surface-container border border-outline-variant text-on-surface text-[14px] font-medium rounded hover:bg-surface-container-high transition-colors">
              Skip Question
            </button>
            <button className="px-6 py-3 bg-primary text-white text-[14px] font-medium rounded shadow-sm hover:bg-primary-container transition-colors flex items-center gap-2">
              <span>Submit & Next</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
