"use client";

import { useState } from "react";
import SideNavBar from "@/components/SideNavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SideNavBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col md:ml-64 h-full overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-surface border-b border-outline-variant h-16 flex items-center justify-between px-4 sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="text-primary hover:bg-surface-container-highest p-2 rounded-full transition-colors flex items-center justify-center -ml-2"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="font-headline text-[24px] font-bold text-primary">PrepMaster</h1>
          </div>
          <div className="flex gap-4 text-primary">
            <span className="material-symbols-outlined">notifications</span>
            <span className="material-symbols-outlined">account_circle</span>
          </div>
        </header>

        {/* Desktop Top Nav (inside dashboard) */}
        <header className="hidden md:flex bg-surface w-full h-16 border-b border-outline-variant sticky top-0 z-10 justify-between items-center px-[var(--spacing-margin-desktop)] shrink-0">
          <div className="flex-1">
             {/* Removed top navigation links */}
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
