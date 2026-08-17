import Link from "next/link";

export default function SideNavBar() {
  return (
    <nav className="hidden md:flex flex-col bg-surface-container-low h-full w-64 fixed left-0 top-0 border-r border-outline-variant p-2 gap-6 z-20">
      <div className="px-6 pt-6">
        <h1 className="font-headline text-[24px] font-bold text-primary">TOEFL Prep</h1>
        <p className="text-[12px] font-semibold text-on-surface-variant mt-1 uppercase tracking-wider">Study Mode Active</p>
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        <ul className="space-y-2">
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
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-lg transition-all"
            >
              <span className="material-symbols-outlined">menu_book</span>
              <span className="text-[14px]">Reading</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-lg transition-all"
            >
              <span className="material-symbols-outlined">headset</span>
              <span className="text-[14px]">Listening</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-lg transition-all"
            >
              <span className="material-symbols-outlined">mic</span>
              <span className="text-[14px]">Speaking</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-lg transition-all"
            >
              <span className="material-symbols-outlined">edit_note</span>
              <span className="text-[14px]">Writing</span>
            </Link>
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
              href="#"
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
        </ul>
      </div>
    </nav>
  );
}
