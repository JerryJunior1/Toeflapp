import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full py-12 border-t border-surface-variant mt-auto">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-4 md:px-[var(--spacing-margin-desktop)] grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-gutter)] items-center">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img
              alt="TOEFL Prep 2026 Logo"
              className="h-6 w-6 object-contain rounded-sm border border-outline-variant grayscale"
              src="https://lh3.googleusercontent.com/aida/AP1WRLtF22-YOwh5cYboAs14VIhva0VutsYpolujm0j_PWpb-2c3AXs01wOjB0xh-M_qpsrp5N4pW-Uztn6VPkAirigwyzmljEfmoaDGFkcWlMVNWfBF5fMdyCl6UgWIl420udPVK267yqO2t5Vtp5NQMydB0aM-5WoFDUpLkurn70NJ1sqm0cPp21eMOhbB54hmhOm96vUMrlsrP5fHHzWYScBUIhyyMA_k9Od9mBLK6YiYfxzHuDsxUIeQC0U"
            />
            <span className="font-headline text-[24px] font-bold text-primary">
              TOEFL Prep 2026
            </span>
          </div>
          <p className="text-[16px] text-on-surface-variant">
            © 2026 TOEFL Prep. All rights reserved. Professional Academic Preparation.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 md:justify-end">
          <Link
            href="#"
            className="text-[12px] font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-[12px] font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-[12px] font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Help Center
          </Link>
          <Link
            href="#"
            className="text-[12px] font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Contact Support
          </Link>
        </nav>
      </div>
    </footer>
  );
}
