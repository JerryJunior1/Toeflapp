import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <TopNavBar />
      <main className="w-full flex-grow bg-[#F6F4EC] text-[#125537]">
        
        {/* HERO SECTION */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="font-headline text-[48px] md:text-[64px] font-bold leading-[1.1] text-[#125537]">
              Préparez le TOEFL iBT 2026 avec l'IA
            </h1>
            <p className="text-[18px] text-[#404942] max-w-lg leading-relaxed">
              Entraînez-vous aux nouvelles épreuves de Writing et Speaking avec un feedback instantané basé sur les critères officiels ETS.
            </p>
            <div className="mt-4">
              <Link
                href="/signup"
                className="inline-block bg-[#2E5C40] text-white font-medium text-[16px] px-8 py-4 rounded hover:bg-[#1f422d] transition-colors"
              >
                Commencer l'entraînement
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-xl shadow-lg border border-[#E8E4D5] p-6 max-w-md mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-[#125537]">Speaking Task 1</h3>
                <span className="bg-[#FFE5C5] text-[#955200] text-[12px] font-bold px-3 py-1 rounded-full">Score: 24/30 (C1)</span>
              </div>
              <p className="italic text-[#5f5f59] mb-4 text-[14px]">
                "Do you agree or disagree with the following statement: It is better to study in a group than independently."
              </p>
              <div className="space-y-4 border-t border-[#f0eded] pt-4">
                <div className="flex gap-3 items-start">
                  <span className="material-symbols-outlined text-[#2E5C40] mt-1 text-[20px]">check_circle</span>
                  <div>
                    <h4 className="font-bold text-[14px]">Delivery</h4>
                    <p className="text-[14px] text-[#5f5f59]">Clear pacing and natural intonation.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="material-symbols-outlined text-[#955200] mt-1 text-[20px]">handyman</span>
                  <div>
                    <h4 className="font-bold text-[14px]">Language Use</h4>
                    <p className="text-[14px] text-[#5f5f59]">Try using more complex transition words like "furthermore".</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MODULES SECTION */}
        <section id="modules" className="max-w-[1200px] mx-auto px-4 md:px-8 py-20">
          <h2 className="font-headline text-[36px] font-bold text-center text-[#125537] mb-12">
            5 Modules de Préparation Intensive
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Module 1 (Large) */}
            <div className="bg-white rounded-xl p-8 border border-[#E8E4D5] shadow-sm md:col-span-2 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded bg-[#e8f5ed] text-[#2E5C40] flex items-center justify-center">
                    <span className="material-symbols-outlined">forum</span>
                  </div>
                  <h3 className="font-headline text-[22px] font-bold">Academic Discussion (Writing)</h3>
                </div>
                <p className="text-[#5f5f59] mb-6">
                  Simulez la nouvelle épreuve de Writing for an Academic Discussion. Rédigez votre contribution à un forum de classe en temps réel.
                </p>
              </div>
              <div className="bg-[#fcf9f8] p-4 rounded border border-[#E8E4D5]">
                <p className="text-[10px] font-bold text-[#707972] tracking-wider mb-2">AI FEEDBACK EN TEMPS RÉEL</p>
                <p className="italic text-[14px] text-[#5f5f59]">"Your argument is strong, but you need to explicitly reference the professor's prompt to score above 4.0."</p>
              </div>
            </div>

            {/* Module 2 */}
            <div className="bg-white rounded-xl p-8 border border-[#E8E4D5] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-[#fff0e0] text-[#955200] flex items-center justify-center">
                  <span className="material-symbols-outlined">mic</span>
                </div>
                <h3 className="font-headline text-[22px] font-bold">Take an Interview</h3>
              </div>
              <p className="text-[#5f5f59]">
                Pratiquez vos réponses orales. Notre IA analyse votre prononciation, fluidité et vocabulaire pour un score précis.
              </p>
            </div>

            {/* Module 3 */}
            <div className="bg-white rounded-xl p-8 border border-[#E8E4D5] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-[#e4f0ed] text-[#1f6356] flex items-center justify-center">
                  <span className="material-symbols-outlined">record_voice_over</span>
                </div>
                <h3 className="font-headline text-[22px] font-bold">Listen and Repeat</h3>
              </div>
              <p className="text-[#5f5f59]">
                Améliorez votre intonation et comprenez les nuances des conversations académiques.
              </p>
            </div>

            {/* Module 4 */}
            <div className="bg-white rounded-xl p-8 border border-[#E8E4D5] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-[#f3eddf] text-[#6b5830] flex items-center justify-center">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <h3 className="font-headline text-[22px] font-bold">Write an Email</h3>
              </div>
              <p className="text-[#5f5f59]">
                Maîtrisez le registre formel indispensable pour les communications universitaires et le TOEFL.
              </p>
            </div>

            {/* Module 5 */}
            <div className="bg-white rounded-xl p-8 border border-[#E8E4D5] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-[#e3ebf0] text-[#2c526b] flex items-center justify-center">
                  <span className="material-symbols-outlined">format_shapes</span>
                </div>
                <h3 className="font-headline text-[22px] font-bold">Build a Sentence</h3>
              </div>
              <p className="text-[#5f5f59]">
                Renforcez votre syntaxe. Assemblez des structures grammaticales complexes avec guidage étape par étape.
              </p>
            </div>
          </div>
        </section>

        {/* EVALUATION SECTION */}
        <section id="evaluation" className="max-w-[1200px] mx-auto px-4 md:px-8 py-20">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-[#E8E4D5] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-[32px] md:text-[40px] font-bold mb-6">
                Évaluation Précise et Suivi CEFR
              </h2>
              <p className="text-[#5f5f59] text-[18px] mb-8">
                Notre algorithme d'IA est entraîné sur des milliers d'essais et enregistrements notés par ETS. Obtenez une estimation fiable de votre score TOEFL (0-30 par section) et de votre niveau CECRL (B1 à C2).
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#2E5C40]">check</span>
                  <span>Rubriques officielles ETS appliquées</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#2E5C40]">check</span>
                  <span>Détection des erreurs grammaticales fréquentes</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#2E5C40]">check</span>
                  <span>Suggestions d'amélioration de vocabulaire</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6 bg-[#F6F4EC] p-8 rounded-xl">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-[14px]">Reading</span>
                  <span className="font-bold text-[#2E5C40] text-[14px]">28/30</span>
                </div>
                <div className="h-2 w-full bg-[#E8E4D5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2E5C40] w-[93%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-[14px]">Listening</span>
                  <span className="font-bold text-[#2E5C40] text-[14px]">26/30</span>
                </div>
                <div className="h-2 w-full bg-[#E8E4D5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2E5C40] w-[86%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-[14px]">Speaking</span>
                  <span className="font-bold text-[#2E5C40] text-[14px]">24/30</span>
                </div>
                <div className="h-2 w-full bg-[#E8E4D5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2E5C40] w-[80%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-[14px]">Writing</span>
                  <span className="font-bold text-[#2E5C40] text-[14px]">27/30</span>
                </div>
                <div className="h-2 w-full bg-[#E8E4D5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2E5C40] w-[90%]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="about" className="max-w-[1200px] mx-auto px-4 md:px-8 py-20">
          <h2 className="font-headline text-[36px] font-bold text-center mb-12">
            Témoignages d'étudiants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-xl border border-[#E8E4D5] shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#e3f0eb] flex items-center justify-center text-[#2E5C40]">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                  <h4 className="font-bold">Marie L.</h4>
                  <p className="text-[12px] text-[#707972]">Admise à Columbia</p>
                </div>
              </div>
              <p className="italic text-[#5f5f59] text-[15px]">
                "Le feedback instantané sur mes essais de Writing a totalement changé ma façon de structurer mes arguments. J'ai gagné 6 points en un mois !"
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-[#E8E4D5] shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#e3f0eb] flex items-center justify-center text-[#2E5C40]">
                  <span className="material-symbols-outlined">account_balance</span>
                </div>
                <div>
                  <h4 className="font-bold">Thomas R.</h4>
                  <p className="text-[12px] text-[#707972]">Score final: 108/120</p>
                </div>
              </div>
              <p className="italic text-[#5f5f59] text-[15px]">
                "L'analyse de la prononciation pour le Speaking est bluffante. On sait exactement quels sons travailler pour paraître plus naturel."
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-[#E8E4D5] shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#e3f0eb] flex items-center justify-center text-[#2E5C40]">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <div>
                  <h4 className="font-bold">Sophie K.</h4>
                  <p className="text-[12px] text-[#707972]">Niveau C1 atteint</p>
                </div>
              </div>
              <p className="italic text-[#5f5f59] text-[15px]">
                "Enfin une plateforme qui comprend le nouveau format 2026. Les exercices 'Academic Discussion' sont identiques à l'examen réel."
              </p>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-[800px] mx-auto px-4 md:px-8 py-20 pb-32">
          <h2 className="font-headline text-[36px] font-bold text-center mb-12">
            Questions Fréquemment Posées
          </h2>
          <div className="space-y-4">
            <details className="group bg-white rounded-xl border border-[#E8E4D5] overflow-hidden shadow-sm">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 hover:bg-[#FDFBF7] transition-colors">
                Comment fonctionne la notation par l'IA ?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-[#5f5f59] p-6 pt-0 border-t border-[#E8E4D5] mt-4 pt-4 bg-[#FDFBF7]">
                Notre IA utilise des modèles de langage avancés entraînés spécifiquement sur les grilles de correction officielles d'ETS pour évaluer la grammaire, le vocabulaire, la cohérence et le développement des idées.
              </p>
            </details>
            <details className="group bg-white rounded-xl border border-[#E8E4D5] overflow-hidden shadow-sm">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 hover:bg-[#FDFBF7] transition-colors">
                Est-ce compatible avec le format 2026 ?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-[#5f5f59] p-6 pt-0 border-t border-[#E8E4D5] mt-4 pt-4 bg-[#FDFBF7]">
                Oui, absolument. Nous avons mis à jour tous nos modules pour inclure la nouvelle épreuve 'Writing for an Academic Discussion' et les durées d'épreuves raccourcies.
              </p>
            </details>
            <details className="group bg-white rounded-xl border border-[#E8E4D5] overflow-hidden shadow-sm">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 hover:bg-[#FDFBF7] transition-colors">
                Puis-je essayer gratuitement ?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-[#5f5f59] p-6 pt-0 border-t border-[#E8E4D5] mt-4 pt-4 bg-[#FDFBF7]">
                Oui, vous pouvez accéder à un test complet de chaque module gratuitement lors de votre inscription pour tester la qualité de nos retours IA.
              </p>
            </details>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
