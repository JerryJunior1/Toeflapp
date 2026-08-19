import Link from "next/link";

export default function SideNavBar() {
  return (
    <nav className="hidden md:flex flex-col bg-surface-container-low h-full w-64 fixed left-0 top-0 border-r border-outline-variant p-2 gap-6 z-20">
      <div className="px-6 pt-6">
        <h1 className="font-headline text-[24px] font-bold text-primary">TOEFL Prep</h1>
        <p className="text-[12px] font-semibold text-on-surface-variant mt-1 uppercase tracking-wider">Study Mode Active</p>
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        <ul className="space-y-4">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 text-primary font-bold bg-surface-container-highest rounded-lg transition-transform"
            >
              <span className="material-symbols-outlined icon-filled">dashboard</span>
              <span className="text-[14px]">Home</span>
            </Link>
          </li>
          
          <li>
            <div className="px-3 pb-2 pt-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Speaking Section</div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/practice/speaking/listen-and-repeat"
                  className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-lg transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
                  <span className="text-[14px]">Listen & Repeat</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/practice/speaking/take-interview"
                  className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-lg transition-all"
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
                  className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-lg transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">format_shapes</span>
                  <span className="text-[14px]">Build a Sentence</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/practice/writing/write-email"
                  className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-lg transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  <span className="text-[14px]">Write an Email</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/practice/writing/academic-discussion"
                  className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-lg transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  <span className="text-[14px]">Academic Discussion</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="px-6 pb-6">
        <button className="w-full bg-primary text-white py-2 rounded text-[14px] font-medium hover:opacity-90 transition-opacity">
          Start Mock Test
        </button>
        <ul className="mt-4 space-y-2 border-t border-outline-variant pt-4">
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-lg transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="text-[12px] font-semibold">Settings</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-lg transition-all"
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
  );
}
