export default function Dashboard() {
  return (
    <div className="max-w-[var(--spacing-container-max)] mx-auto space-y-8 pb-20">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="font-headline text-[32px] font-bold text-on-surface mb-2">Welcome back, Sarah.</h2>
          <p className="text-[18px] text-on-surface-variant">You're on track for your target score of 110. Keep up the disciplined work.</p>
        </div>
        
        <div className="card p-4 rounded flex items-center gap-4 shrink-0">
          <div className="w-16 h-16 relative">
            <svg className="w-full h-full text-primary -rotate-90" viewBox="0 0 36 36">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle" strokeDasharray="75, 100" stroke="currentColor" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">Daily Goal</p>
            <p className="font-headline text-[24px] font-bold text-primary">75%</p>
            <p className="text-[12px] font-semibold text-on-surface-variant">45 mins remaining</p>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Reading Avg.", score: "26", max: "/30", trend: "+2", icon: "menu_book" },
          { label: "Listening Avg.", score: "28", max: "/30", trend: "+1", icon: "headset" },
          { label: "Speaking Avg.", score: "24", max: "/30", trend: "0", icon: "mic" },
          { label: "Writing Avg.", score: "27", max: "/30", trend: "+3", icon: "edit_note" }
        ].map((stat, i) => (
          <div key={i} className="card p-6 rounded flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-primary">{stat.icon}</span>
              <span className="flex items-center text-primary-container text-[12px] font-semibold">
                <span className="material-symbols-outlined text-[16px]">trending_up</span> {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-[14px] text-on-surface-variant mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="font-headline text-[32px] font-bold text-on-surface">{stat.score}</h3>
                <span className="text-[12px] font-semibold text-on-surface-variant">{stat.max}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Actions & Recent */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recommended Next Step */}
        <div className="card p-6 rounded flex flex-col gap-4">
          <h3 className="font-headline text-[24px] font-bold text-on-surface">Recommended Next Step</h3>
          <div className="bg-surface-container-low p-4 rounded-lg border border-surface-variant flex gap-4 items-start">
             <div className="bg-primary-container text-white p-2 rounded shrink-0">
               <span className="material-symbols-outlined">mic</span>
             </div>
             <div>
               <h4 className="text-[16px] font-medium text-on-surface">Integrated Speaking Task 3</h4>
               <p className="text-[14px] text-on-surface-variant mt-1 mb-3">Focus on synthesizing reading and listening passages effectively.</p>
               <button className="bg-primary text-white text-[14px] font-medium px-4 py-2 rounded hover:bg-primary-container transition-colors">Start Practice</button>
             </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6 rounded flex flex-col gap-4">
          <h3 className="font-headline text-[24px] font-bold text-on-surface">Recent Activity</h3>
          <ul className="space-y-4">
             <li className="flex justify-between items-center border-b border-surface-variant pb-2">
               <div className="flex items-center gap-3">
                 <span className="material-symbols-outlined text-outline">edit_document</span>
                 <div>
                   <p className="text-[14px] font-medium text-on-surface">Independent Writing Task</p>
                   <p className="text-[12px] text-on-surface-variant">Today, 10:30 AM</p>
                 </div>
               </div>
               <span className="bg-primary-container/20 text-primary-container text-[12px] font-semibold px-2 py-1 rounded">Scored: 4.5/5</span>
             </li>
             <li className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                 <span className="material-symbols-outlined text-outline">headphones</span>
                 <div>
                   <p className="text-[14px] font-medium text-on-surface">Listening Section 2</p>
                   <p className="text-[12px] text-on-surface-variant">Yesterday, 4:15 PM</p>
                 </div>
               </div>
               <span className="bg-surface-container text-on-surface-variant text-[12px] font-semibold px-2 py-1 rounded">Review Needed</span>
             </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
