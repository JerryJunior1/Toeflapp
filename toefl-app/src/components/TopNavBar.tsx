import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import Logo from "./Logo";

export default async function TopNavBar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="w-full sticky top-0 z-50 bg-[#F6F4EC]/90 backdrop-blur-md border-b border-[#E8E4D5]">
      <div className="flex justify-between items-center h-[72px] max-w-[1200px] mx-auto px-4 md:px-8">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex gap-8 items-center">
          <Link
            href="/#modules"
            className="text-on-surface-variant font-medium hover:text-primary transition-colors text-[14px]"
          >
            Modules
          </Link>
          <Link
            href="/#evaluation"
            className="text-on-surface-variant font-medium hover:text-primary transition-colors text-[14px]"
          >
            AI Feedback
          </Link>
          <Link
            href="/#pricing"
            className="text-on-surface-variant font-medium hover:text-primary transition-colors text-[14px]"
          >
            Pricing
          </Link>
          <Link
            href="/#about"
            className="text-on-surface-variant font-medium hover:text-primary transition-colors text-[14px]"
          >
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-primary font-medium text-[14px] hover:text-primary/80 transition-colors hidden md:block"
              >
                Go to Dashboard
              </Link>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="bg-primary text-white font-medium text-[14px] px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-primary font-medium text-[14px] hover:bg-black/5 px-4 py-2 rounded-md transition-colors hidden md:block"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-[#2E5C40] text-white font-medium text-[14px] px-6 py-2.5 rounded hover:bg-[#1f422d] transition-colors"
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
