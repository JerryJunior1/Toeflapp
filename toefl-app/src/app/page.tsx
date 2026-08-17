import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <TopNavBar />
      <main className="w-full flex-grow">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden min-h-[600px] flex items-center pt-16">
          <div className="absolute inset-0 bg-surface-container-low" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[url('https://lh3.googleusercontent.com/aida-public/AHO5UaL058cR7XoD-9eB9d3uT42x942rD08c-9cO-90-50x7Z6nJ-1WwR-zY49R_8Kk9-7w-v9uPj08u0W6-9Y-R26M54aY6325wM2yU0s9fO6cI4z92X5M0b7u9O0O1k7-P9-H3w62m47_2-Y76kU-8_4y0D5g-3_92M24t59O2O5I5k-P0z_S-G499E0o30Y-U31z31Y41A-Q_7X-9')] bg-cover bg-center opacity-10 mix-blend-multiply" />
          
          <div className="relative z-10 w-full max-w-[var(--spacing-container-max)] mx-auto px-4 md:px-[var(--spacing-margin-desktop)] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="font-headline text-[48px] md:text-[64px] font-bold text-on-surface leading-tight">
                Master the TOEFL iBT with Precision.
              </h1>
              <p className="text-[18px] text-on-surface-variant max-w-lg leading-relaxed">
                Elevate your score with our AI-powered, meticulously designed preparation platform. Academic excellence starts here.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link
                  href="/signup"
                  className="bg-primary text-on-primary font-medium text-[16px] px-8 py-4 rounded hover:bg-primary-container transition-colors shadow-sm"
                >
                  Start Your Journey
                </Link>
                <Link
                  href="#how-it-works"
                  className="bg-surface-container text-on-surface font-medium text-[16px] px-8 py-4 rounded border border-surface-variant hover:bg-surface-container-low transition-colors"
                >
                  View Curriculum
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="w-full bg-surface py-24 border-t border-surface-variant">
          <div className="max-w-[var(--spacing-container-max)] mx-auto px-4 md:px-[var(--spacing-margin-desktop)]">
            <div className="text-center mb-16">
              <h2 className="font-headline text-[32px] md:text-[40px] font-bold text-primary mb-4">
                Comprehensive Preparation Framework
              </h2>
              <p className="text-[18px] text-on-surface-variant max-w-2xl mx-auto">
                Our platform dissects every component of the TOEFL iBT, providing targeted practice and analytics.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card rounded-lg p-8 flex flex-col gap-4">
                <span className="material-symbols-outlined text-primary text-[32px]">menu_book</span>
                <h3 className="font-headline text-[24px] font-bold text-on-surface">Reading Comprehension</h3>
                <p className="text-[16px] text-on-surface-variant">Engage with university-level texts and master inference, vocabulary, and factual recall.</p>
              </div>
              <div className="card rounded-lg p-8 flex flex-col gap-4">
                <span className="material-symbols-outlined text-primary text-[32px]">headphones</span>
                <h3 className="font-headline text-[24px] font-bold text-on-surface">Active Listening</h3>
                <p className="text-[16px] text-on-surface-variant">Simulate real academic lectures and campus conversations with varied accents.</p>
              </div>
              <div className="card rounded-lg p-8 flex flex-col gap-4">
                <span className="material-symbols-outlined text-primary text-[32px]">mic</span>
                <h3 className="font-headline text-[24px] font-bold text-on-surface">Speaking Proficiency</h3>
                <p className="text-[16px] text-on-surface-variant">Real-time AI evaluation of your pronunciation, fluency, and topic development.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
