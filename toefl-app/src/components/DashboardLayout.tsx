import SideNavBar from "@/components/SideNavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SideNavBar />
      <div className="flex-1 flex flex-col md:ml-64 h-full overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-surface border-b border-outline-variant h-16 flex items-center justify-between px-4 sticky top-0 z-10">
          <h1 className="font-headline text-[28px] font-bold text-primary">PrepMaster</h1>
          <div className="flex gap-4 text-primary">
            <span className="material-symbols-outlined">notifications</span>
            <span className="material-symbols-outlined">account_circle</span>
          </div>
        </header>

        {/* Desktop Top Nav (inside dashboard) */}
        <header className="hidden md:flex bg-surface w-full h-16 border-b border-outline-variant sticky top-0 z-10 justify-between items-center px-[var(--spacing-margin-desktop)]">
          <div className="flex-1 flex justify-center">
             <ul className="flex gap-8">
               <li><a className="text-[14px] font-medium text-primary border-b-2 border-primary pb-1" href="/dashboard">Dashboard</a></li>
               <li><a className="text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors" href="/practice/academic-discussion">Practice</a></li>
               <li><a className="text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">Modules</a></li>
               <li><a className="text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">Review</a></li>
             </ul>
          </div>
          <div className="flex items-center gap-4 text-primary">
            <button className="hover:opacity-80 transition-opacity"><span className="material-symbols-outlined">notifications</span></button>
            <button className="hover:opacity-80 transition-opacity"><span className="material-symbols-outlined">account_circle</span></button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-[var(--spacing-margin-desktop)]">
          {children}
        </main>
      </div>
    </div>
  );
}
