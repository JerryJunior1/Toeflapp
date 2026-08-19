import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F6F4EC] border-t border-[#E8E4D5] py-8">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-[12px] text-on-surface-variant max-w-sm mt-2">
            © 2026 TOEFL Prep. All rights reserved. Professional Academic Preparation.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 md:gap-6">
          <Link href="#" className="text-[12px] text-on-surface-variant hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-[12px] text-on-surface-variant hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="text-[12px] text-on-surface-variant hover:text-primary transition-colors">
            Help Center
          </Link>
          <Link href="#" className="text-[12px] text-on-surface-variant hover:text-primary transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
