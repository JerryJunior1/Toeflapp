import Link from "next/link";
import { createClient } from '@/utils/supabase/server';

export default async function TopNavBar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="bg-surface w-full top-0 sticky border-b border-surface-variant z-50">
      <div className="flex justify-between items-center h-16 max-w-[var(--spacing-container-max)] mx-auto px-4 md:px-[var(--spacing-margin-desktop)]">
        <Link href="/" className="flex items-center gap-2">
          <img
            alt="TOEFL Prep 2026 Logo"
            className="h-8 w-8 object-contain rounded-sm border border-outline-variant"
            src="https://lh3.googleusercontent.com/aida/AP1WRLtF22-YOwh5cYboAs14VIhva0VutsYpolujm0j_PWpb-2c3AXs01wOjB0xh-M_qpsrp5N4pW-Uztn6VPkAirigwyzmljEfmoaDGFkcWlMVNWfBF5fMdyCl6UgWIl420udPVK267yqO2t5Vtp5NQMydB0aM-5WoFDUpLkurn70NJ1sqm0cPp21eMOhbB54hmhOm96vUMrlsrP5fHHzWYScBUIhyyMA_k9Od9mBLK6YiYfxzHuDsxUIeQC0U"
          />
          <span className="font-headline text-[24px] font-bold text-primary">
            TOEFL Prep 2026
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            href="/dashboard"
            className="text-on-surface-variant font-medium pb-1 hover:text-primary hover:bg-surface-container-low transition-colors text-[14px]"
          >
            Dashboard
          </Link>
          <Link
            href="/practice/academic-discussion"
            className="text-on-surface-variant font-medium pb-1 hover:text-primary hover:bg-surface-container-low transition-colors text-[14px]"
          >
            Practice
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant font-medium pb-1 hover:text-primary hover:bg-surface-container-low transition-colors text-[14px]"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant font-medium pb-1 hover:text-primary hover:bg-surface-container-low transition-colors text-[14px]"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-on-surface-variant font-medium text-[14px] hover:text-primary transition-colors hidden md:block"
              >
                Go to Dashboard
              </Link>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="bg-surface-variant text-on-surface font-medium text-[14px] px-4 py-2 rounded hover:bg-surface-container-low transition-colors"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-primary font-medium text-[14px] hover:bg-surface-container-low px-4 py-2 rounded transition-colors hidden md:block"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-primary-container text-white font-medium text-[14px] px-4 py-2 rounded hover:bg-primary transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
