import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";

export default function AcademicDiscussion() {
  return (
    <>
      <TopNavBar />
      <main className="w-full px-4 md:px-[var(--spacing-margin-desktop)] max-w-[var(--spacing-container-max)] mx-auto py-12 grid grid-cols-1 md:grid-cols-12 gap-[var(--spacing-gutter)]">
        
        {/* Left Column: Context & Task */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="card rounded-xl p-8 flex flex-col gap-4 sticky top-24">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-[20px]">forum</span>
              <span className="text-[14px] font-semibold text-primary uppercase tracking-wider">Academic Discussion</span>
            </div>
            <h1 className="font-headline text-[32px] font-bold text-on-surface">Urban Planning & Sustainability</h1>
            <p className="text-[16px] text-on-surface-variant leading-relaxed">
              Professor Adams has posted a new discussion thread. Read the professor's prompt and the responses from other students, then write your own contribution.
            </p>
            
            <div className="mt-4 p-4 bg-surface-container-low rounded-lg border border-surface-variant">
              <h3 className="text-[14px] font-semibold text-on-surface mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">task_alt</span>
                Your Task
              </h3>
              <ul className="text-[14px] text-on-surface-variant space-y-2 list-disc list-inside">
                <li>Express and support your opinion clearly.</li>
                <li>Make a contribution to the discussion in your own words.</li>
                <li>Write at least 100 words.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Discussion Thread & Input */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="card rounded-xl p-8">
            <h2 className="text-[14px] font-semibold text-secondary uppercase tracking-wider mb-4 border-b border-surface-variant pb-2">Discussion Thread</h2>
            
            {/* Professor Post */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold">PA</div>
                <div>
                  <div className="text-[14px] font-bold text-on-surface">Professor Adams</div>
                  <div className="text-[12px] text-on-surface-variant">Today, 9:00 AM</div>
                </div>
              </div>
              <p className="text-[16px] text-on-surface leading-relaxed pl-13">
                As cities grow, many argue that governments should prioritize expanding public transportation systems over building new roads for cars. What are the main benefits and drawbacks of focusing on public transit? I'd like you to share your perspective.
              </p>
            </div>

            {/* Student 1 Post */}
            <div className="mb-8 pl-6 border-l-2 border-surface-variant">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center font-bold text-[12px]">SJ</div>
                <div>
                  <div className="text-[14px] font-bold text-on-surface">Sarah J.</div>
                  <div className="text-[12px] text-on-surface-variant">Today, 10:15 AM</div>
                </div>
              </div>
              <p className="text-[16px] text-on-surface-variant leading-relaxed pl-11">
                I strongly believe public transit is the better investment. It drastically reduces greenhouse gas emissions per capita compared to individual cars. Plus, it makes the city more accessible for people who can't afford a vehicle.
              </p>
            </div>

            {/* Student 2 Post */}
            <div className="mb-8 pl-6 border-l-2 border-surface-variant">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center font-bold text-[12px]">MK</div>
                <div>
                  <div className="text-[14px] font-bold text-on-surface">Mike K.</div>
                  <div className="text-[12px] text-on-surface-variant">Today, 11:30 AM</div>
                </div>
              </div>
              <p className="text-[16px] text-on-surface-variant leading-relaxed pl-11">
                While I agree with Sarah about emissions, we can't ignore that many suburban areas lack the density to support efficient transit. Improving road infrastructure is still necessary for the vast majority of commuters who rely on personal vehicles.
              </p>
            </div>

            {/* User Input Area */}
            <div className="mt-8">
              <label className="text-[14px] font-semibold text-on-surface block mb-2" htmlFor="response">Your Response</label>
              <textarea
                id="response"
                className="w-full min-h-[200px] p-4 bg-surface border border-outline-variant rounded-lg text-[16px] text-on-surface focus:ring-2 focus:ring-primary focus:border-primary resize-y"
                placeholder="Type your response here..."
              ></textarea>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-[14px] text-on-surface-variant">Word count: <span className="font-bold text-on-surface">0</span></div>
                <button className="bg-primary text-white font-medium text-[14px] px-6 py-2 rounded hover:bg-primary-container transition-colors flex items-center gap-2">
                  Submit Post <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
