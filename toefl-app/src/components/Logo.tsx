export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 8H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 12H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 16H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 16L15.5 17.5L19 14" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="font-headline text-[20px] font-bold text-primary tracking-tight">
        TOEFL Prep <span className="font-medium text-primary/80">2026</span>
      </span>
    </div>
  );
}
