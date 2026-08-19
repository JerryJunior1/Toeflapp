"use client";

export default function ListenAndRepeat() {
  return (
    <div className="max-w-[var(--spacing-container-max)] mx-auto p-4 md:p-8">
      <div className="card rounded p-8 flex flex-col items-center justify-center min-h-[400px]">
        <span className="material-symbols-outlined text-[48px] text-primary mb-4">record_voice_over</span>
        <h2 className="font-headline text-[24px] font-bold text-on-surface mb-2">Listen & Repeat</h2>
        <p className="text-on-surface-variant text-center max-w-md mb-6">
          You will hear a short sentence or phrase. Listen carefully and repeat it exactly as you heard it. This tests your pronunciation and rhythm.
        </p>
        <button className="bg-primary text-white px-6 py-2 rounded font-medium hover:bg-primary-container transition-colors">
          Start Task
        </button>
      </div>
    </div>
  );
}
