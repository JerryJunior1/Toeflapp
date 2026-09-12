import Image from 'next/image';
import toeflLogo from '@/app/toefl.png';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image 
        src={toeflLogo} 
        alt="TOEFL Logo" 
        width={72} 
        height={72} 
        className="object-contain rounded-md -ml-2"
        priority
      />
      <span className="font-headline text-[22px] font-bold text-primary tracking-tight">
        TOEFL Prep <span className="font-medium text-primary/80">2026</span>
      </span>
    </div>
  );
}
