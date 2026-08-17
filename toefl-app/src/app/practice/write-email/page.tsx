import TopNavBar from "@/components/TopNavBar";

export default function WriteEmail() {
  return (
    <div className="min-h-screen bg-background font-body text-on-surface antialiased flex flex-col">
      <TopNavBar />
      <main className="max-w-[var(--spacing-container-max)] mx-auto px-4 md:px-[var(--spacing-margin-desktop)] py-[var(--spacing-gutter)] grid grid-cols-1 lg:grid-cols-12 gap-[var(--spacing-gutter)] flex-grow w-full">
        
        {/* Left Column: Scenario & Instructions */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="card rounded p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-headline text-[24px] font-bold text-on-surface">Writing Task 1</h2>
              <select className="text-[14px] font-medium border-outline-variant rounded-sm text-on-surface focus:ring-primary focus:border-primary p-1">
                <option>Scenario: Library Policies</option>
                <option>Scenario: Campus Housing</option>
                <option>Scenario: Course Registration</option>
              </select>
            </div>
            
            <p className="text-[16px] text-on-surface-variant mb-6 leading-relaxed">
              You are a university student writing an email to the head librarian regarding a recent change in the library's study room reservation policy.
            </p>
            
            <h3 className="text-[14px] font-medium text-on-surface mb-3 uppercase tracking-wider">Points to Cover:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined icon-filled text-primary text-[20px]">check_circle</span>
                <span className="text-[16px] text-on-surface">State your purpose for writing clearly.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined icon-filled text-primary text-[20px]">check_circle</span>
                <span className="text-[16px] text-on-surface">Explain how the new 1-hour limit negatively impacts group projects.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined icon-filled text-primary text-[20px]">check_circle</span>
                <span className="text-[16px] text-on-surface">Propose a compromise or alternative solution.</span>
              </li>
            </ul>
          </div>
          
          {/* Timer Badge */}
          <div className="card rounded p-4 flex items-center justify-between border-l-4 border-l-primary transition-colors duration-300">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[20px]">schedule</span>
              <span className="text-[14px] font-medium uppercase tracking-wider">Time Remaining</span>
            </div>
            <div className="font-headline text-[24px] font-bold text-on-surface tabular-nums">07:00</div>
          </div>
        </div>

        {/* Right Column: Email Editor */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="card rounded flex flex-col h-full min-h-[600px]">
            
            {/* Email Headers */}
            <div className="px-6 py-4 border-b border-surface-variant flex items-center gap-4">
              <span className="text-[14px] font-medium text-on-surface-variant w-16">To:</span>
              <input 
                className="flex-1 bg-transparent border-none text-[16px] text-on-surface focus:ring-0 p-0 cursor-default" 
                readOnly 
                type="text" 
                value="headlibrarian@university.edu" 
              />
            </div>
            <div className="px-6 py-4 border-b border-surface-variant flex items-center gap-4">
              <span className="text-[14px] font-medium text-on-surface-variant w-16">Subject:</span>
              <input 
                className="flex-1 bg-transparent border-none text-[16px] text-on-surface focus:ring-0 p-0 cursor-default font-semibold" 
                readOnly 
                type="text" 
                value="Concerns regarding new study room reservation policy" 
              />
            </div>
            
            {/* Email Body */}
            <div className="flex-1 relative">
              <textarea 
                className="w-full h-full p-6 bg-transparent border-none text-[16px] text-on-surface focus:ring-0 resize-none leading-relaxed placeholder:text-on-surface-variant/50"
                placeholder={`Dear Head Librarian,\n\nStart writing your email here...`}
              ></textarea>
            </div>
            
            {/* Footer / Controls */}
            <div className="px-6 py-4 border-t border-surface-variant bg-surface-container-lowest flex justify-between items-center rounded-b">
              <div className="text-[12px] font-semibold text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">edit_document</span>
                Word count: <span className="font-bold">0</span>
              </div>
              <button className="bg-primary text-white px-6 py-2 rounded text-[14px] font-semibold hover:bg-on-primary-fixed-variant transition-colors flex items-center gap-2">
                Submit for AI Scoring
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
            
          </div>
        </div>
        
      </main>
    </div>
  );
}
