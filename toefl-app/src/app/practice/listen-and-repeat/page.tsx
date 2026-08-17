import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";

export default function ListenAndRepeat() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNavBar />
      <main className="flex-grow w-full px-4 md:px-[var(--spacing-margin-desktop)] max-w-[var(--spacing-container-max)] mx-auto py-12">
        
        {/* Header & Progress */}
        <div className="mb-8 flex justify-between items-end border-b border-outline-variant pb-4">
          <div>
            <h1 className="font-headline text-[32px] font-bold text-on-background mb-2">Module 4: Listen and Repeat</h1>
            <p className="text-[16px] text-on-surface-variant">Listen carefully to the academic phrases and repeat them with proper intonation.</p>
          </div>
          <div className="text-right">
            <div className="text-[12px] font-semibold text-primary mb-2 uppercase tracking-widest">Phrase 3 of 7</div>
            <div className="w-48 h-2 bg-surface-variant rounded-full overflow-hidden flex">
              <div className="bg-primary h-full" style={{ width: "42%" }}></div>
            </div>
          </div>
        </div>

        {/* Split Pane Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[var(--spacing-gutter)]">
          
          {/* Context Pane */}
          <div className="md:col-span-5 card rounded-xl overflow-hidden flex flex-col">
            <div className="h-64 bg-surface-container-low relative">
              <div className="bg-cover bg-center w-full h-full" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCplGYx08ksJ6cuMfyUBo-OSy0h2FxATpJkYbWccE59mMqyklgrnyOpQ5vtJQU_zSObt2eCWwh5e7vSb0sTqGDk_nAi6GJoj2jqHMUdpk_9DOLLYLc_3wsKEmGs4pSM9SVrIktdZ9KKymbcaGDb53fSX_Dn9u2tTMhlyHFxIEE2JKIRkv-HcfcYz3snYTJR_6diaEpjqRMeaRH11jxfls17eqJBbep02-1uq7CEY5mfKfA8iKlf7q9P')" }}></div>
            </div>
            <div className="p-6 flex-grow">
              <div className="text-[12px] font-semibold text-secondary mb-2 uppercase tracking-wider">Scenario Context</div>
              <h2 className="font-headline text-[24px] font-bold text-on-surface mb-4">University Library Interaction</h2>
              <p className="text-[16px] text-on-surface-variant leading-relaxed">
                You are asking a librarian for assistance in locating peer-reviewed journals for your biology research paper. Pay attention to polite academic phrasing.
              </p>
            </div>
          </div>

          {/* Interaction Pane */}
          <div className="md:col-span-7 flex flex-col gap-6">
            
            {/* Listen Section */}
            <div className="card rounded-xl p-8">
              <div className="text-[12px] font-semibold text-primary mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">headphones</span> Step 1: Listen
              </div>
              
              <div className="flex items-center gap-6 mb-6">
                <button className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center hover:bg-on-primary-fixed transition-colors shadow-sm">
                  <span className="material-symbols-outlined icon-filled text-[32px]">play_arrow</span>
                </button>
                {/* Audio Waveform */}
                <div className="flex-grow h-12 flex items-center gap-1 opacity-60">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`w-2 rounded-full bg-primary ${i < 6 ? 'waveform-bar' : 'h-2 bg-surface-variant'}`} style={{ animationDelay: `${i * 0.1}s`, height: i < 6 ? `${(i%3+1)*12}px` : undefined }}></div>
                  ))}
                </div>
                <div className="text-[14px] font-medium text-on-surface-variant">00:04</div>
              </div>
              
              <div className="border-b border-outline-variant pb-4 mb-4">
                <p className="text-[18px] text-on-surface italic text-center opacity-80">
                  "Excuse me, could you point me toward the recent publications in evolutionary biology?"
                </p>
              </div>
            </div>

            {/* Record Section */}
            <div className="card rounded-xl p-8 flex-grow flex flex-col relative overflow-hidden">
              <div className="text-[12px] font-semibold text-primary mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">mic</span> Step 2: Record
              </div>
              
              <div className="flex-grow flex flex-col items-center justify-center py-8">
                <button className="w-24 h-24 rounded-full bg-error text-white flex items-center justify-center hover:bg-error-container hover:text-on-error-container transition-colors shadow-md mic-pulse mb-6">
                  <span className="material-symbols-outlined icon-filled text-[36px]">mic</span>
                </button>
                <div className="text-[14px] font-medium text-error mb-2 animate-pulse">Recording... (00:03 / 00:10)</div>
              </div>

              {/* Live Transcription Glassmorphism Area */}
              <div className="bg-surface-container-low rounded-lg p-4 min-h-[100px] border border-surface-variant relative">
                <div className="text-[12px] font-semibold text-on-surface-variant mb-2 opacity-70">Live AI Transcription:</div>
                <p className="text-[16px] text-on-surface">
                  "Excuse me, <span className="text-outline underline decoration-dotted">could you point me towards</span> the recent publications in..."
                </p>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-50">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span className="text-[12px] font-semibold">Listening</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-4">
              <button className="px-6 py-3 border border-primary text-primary text-[14px] font-medium rounded-md hover:bg-surface-container transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">replay</span> Retake
              </button>
              <button className="px-6 py-3 bg-primary text-white text-[14px] font-medium rounded-md hover:bg-primary-container transition-colors flex items-center gap-2 shadow-sm">
                Analyze Pronunciation <span className="material-symbols-outlined text-[18px]">analytics</span>
              </button>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
