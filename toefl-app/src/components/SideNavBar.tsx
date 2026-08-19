"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNavBar({ 
  isOpen = false, 
  setIsOpen 
}: { 
  isOpen?: boolean; 
  setIsOpen?: (val: boolean) => void 
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === '/dashboard';
    return pathname?.startsWith(path);
  };

  const getLinkClasses = (path: string) => {
    return isActive(path) 
      ? "flex items-center gap-3 px-3 py-2 text-primary font-bold bg-surface-container-highest rounded-lg transition-transform"
      : "flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-lg transition-all";
  };

  const closeSidebar = () => {
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/40 z-30 transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Navigation */}
      <nav className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-surface-container-low border-r border-outline-variant
        flex flex-col h-full transform transition-transform duration-300 ease-in-out
        md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="px-6 pt-6 flex justify-between items-center shrink-0">
          <div>
            <h1 className="font-headline text-[24px] font-bold text-primary">TOEFL Prep</h1>
            <p className="text-[12px] font-semibold text-on-surface-variant mt-1 uppercase tracking-wider">Study Mode Active</p>
          </div>
          {/* Mobile Close Button */}
          <button 
            onClick={closeSidebar}
            className="md:hidden text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-surface-container-highest transition-colors -mr-2"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-2 mt-6">
          <ul className="space-y-4">
            <li>
              <Link
                href="/dashboard"
                className={getLinkClasses('/dashboard')}
                onClick={closeSidebar}
              >
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-[14px]">Home</span>
              </Link>
            </li>
            
            <li>
              <Link
                href="/dashboard/review"
                className={getLinkClasses('/dashboard/review')}
                onClick={closeSidebar}
              >
                <span className="material-symbols-outlined">rate_review</span>
                <span className="text-[14px]">Review</span>
              </Link>
            </li>

            <li>
              <div className="px-3 pb-2 pt-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Speaking Section</div>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/practice/speaking/listen-and-repeat"
                    className={getLinkClasses('/practice/speaking/listen-and-repeat')}
                    onClick={closeSidebar}
                  >
                    <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
                    <span className="text-[14px]">Listen & Repeat</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/practice/speaking/take-interview"
                    className={getLinkClasses('/practice/speaking/take-interview')}
                    onClick={closeSidebar}
                  >
                    <span className="material-symbols-outlined text-[18px]">mic</span>
                    <span className="text-[14px]">Take an Interview</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <div className="px-3 pb-2 pt-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Writing Section</div>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/practice/writing/build-sentence"
                    className={getLinkClasses('/practice/writing/build-sentence')}
                    onClick={closeSidebar}
                  >
                    <span className="material-symbols-outlined text-[18px]">format_shapes</span>
                    <span className="text-[14px]">Build a Sentence</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/practice/writing/write-email"
                    className={getLinkClasses('/practice/writing/write-email')}
                    onClick={closeSidebar}
                  >
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                    <span className="text-[14px]">Write an Email</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/practice/writing/academic-discussion"
                    className={getLinkClasses('/practice/writing/academic-discussion')}
                    onClick={closeSidebar}
                  >
                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                    <span className="text-[14px]">Academic Discussion</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        
        <div className="px-6 pb-6 shrink-0 mt-2">
          <button className="w-full bg-primary text-white py-2 rounded text-[14px] font-medium hover:opacity-90 transition-opacity">
            Start Mock Test
          </button>
          <ul className="mt-4 space-y-2 border-t border-outline-variant pt-4">
            <li>
              <Link
                href="/dashboard/settings"
                className={getLinkClasses('/dashboard/settings')}
                onClick={closeSidebar}
              >
                <span className="material-symbols-outlined text-[20px]">settings</span>
                <span className="text-[12px] font-semibold">Settings</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-lg transition-all"
                onClick={closeSidebar}
              >
                <span className="material-symbols-outlined text-[20px]">help_outline</span>
                <span className="text-[12px] font-semibold">Support</span>
              </Link>
            </li>
            <li>
              <form action="/auth/signout" method="post" className="w-full">
                <button
                  type="submit"
                  className="w-full flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-lg transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  <span className="text-[12px] font-semibold">Sign Out</span>
                </button>
              </form>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
