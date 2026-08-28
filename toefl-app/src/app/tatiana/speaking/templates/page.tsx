"use client";

import Link from "next/link";

export default function TatianaSpeakingTemplates() {
  return (
    <div className="w-full max-w-[900px] mx-auto flex flex-col gap-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
          <span className="material-symbols-outlined text-[16px]">school</span>
          Tatiana — Speaking
        </div>
        <h1 className="font-headline text-[36px] font-bold text-on-surface">Speaking Templates & Tips</h1>
        <p className="text-[16px] text-on-surface-variant mt-2 leading-relaxed">
          Based on an analysis of the TOEFL Speaking practice tests, the interview questions consistently follow 4 specific question archetypes across all topics (studies, travel, volunteering, online learning, food, leisure, and campus life).
        </p>
      </div>

      {/* Core Requirements */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-bold text-primary flex items-center gap-2 border-b border-surface-variant pb-2">
          <span className="material-symbols-outlined">stars</span>
          Core Requirements for C1 Level
        </h2>
        <div className="card bg-surface-container-low border border-surface-variant rounded-2xl p-6 md:p-8">
          <p className="text-[15px] text-on-surface leading-relaxed mb-4">
            To achieve a C1 level, your answers must demonstrate:
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3 text-[14px]">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0">check_circle</span>
              <div><strong className="text-on-surface">Structural coherence:</strong> <span className="text-on-surface-variant">Clear topic sentence, developed points, and a strong wrap-up.</span></div>
            </li>
            <li className="flex gap-3 text-[14px]">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0">check_circle</span>
              <div><strong className="text-on-surface">Nuance and concession:</strong> <span className="text-on-surface-variant">Showing both sides before choosing a stance (While..., That being said...).</span></div>
            </li>
            <li className="flex gap-3 text-[14px]">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0">check_circle</span>
              <div><strong className="text-on-surface">Precise lexical range:</strong> <span className="text-on-surface-variant">Advanced discourse markers and domain-specific vocabulary.</span></div>
            </li>
          </ul>
        </div>
      </section>

      {/* The 4 Question Archetypes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-bold text-[#0d7a5f] flex items-center gap-2 border-b border-surface-variant pb-2">
          <span className="material-symbols-outlined">category</span>
          The 4 Question Archetypes
        </h2>
        <div className="card bg-surface-container-low border border-surface-variant rounded-2xl p-6 md:p-8 flex flex-col gap-6">
          
          {/* Type 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
            <h3 className="font-bold text-[18px] text-[#0d7a5f] mb-1">Type 1: Personal Background, Habits & Past Experience</h3>
            <p className="text-[13px] text-on-surface-variant mb-4">Focus: Describing personal routines, frequency, or a past project/activity</p>
            <div className="bg-[#0d7a5f]/5 border-l-2 border-[#0d7a5f] p-4 text-[14px] text-on-surface rounded-r-lg space-y-3">
              <p><strong>Direct Answer:</strong> "On a typical day / Generally speaking, I engage in [Activity/Habit] by focusing on [Key Feature/Routine]."</p>
              <p><strong>Specific Breakdown (2 details):</strong> "For instance, when it comes to [Detail 1], I usually [Action 1], which allows me to [Benefit/Purpose]. Additionally, regarding [Detail 2], I make sure to [Action 2]."</p>
              <p><strong>Personal Example / Reflection:</strong> "Last year, when I [Past Experience / Project], I learned the importance of [Skill/Value, e.g., time management / adaptability]."</p>
              <p><strong>C1 Conclusion:</strong> "Overall, maintaining this balance not only helps me [Primary Benefit] but also reinforces my ability to [Secondary Long-Term Value]."</p>
            </div>
          </div>

          {/* Type 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
            <h3 className="font-bold text-[18px] text-[#0d7a5f] mb-1">Type 2: Preference, Comparison, or Trade-Off</h3>
            <p className="text-[13px] text-on-surface-variant mb-4">Focus: Choosing between two methods, traits, or settings, e.g., Cooking at home vs. Dining out, Patience vs. Flexibility, Morning vs. Evening</p>
            <div className="bg-[#0d7a5f]/5 border-l-2 border-[#0d7a5f] p-4 text-[14px] text-on-surface rounded-r-lg space-y-3">
              <p><strong>Clear Stance:</strong> "While both options have clear merits, I definitely lean toward [Choice A] over [Choice B]."</p>
              <p><strong>Primary Reason + Mechanism:</strong> "The primary reason is [Core Factor, e.g., control / cognitive efficiency / depth]. When I choose [Choice A], it allows me to [Explain mechanism], whereas [Choice B] often results in [Limitation of Option B]."</p>
              <p><strong>Concession (Nuance):</strong> "That being said, I recognize that [Choice B] can be advantageous in specific scenarios, such as [Scenario where B works]."</p>
              <p><strong>C1 Conclusion:</strong> "Ultimately, for everyday situations, [Choice A] remains my go-to choice because it provides the ideal balance between [Benefit X] and [Benefit Y]."</p>
            </div>
          </div>

          {/* Type 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
            <h3 className="font-bold text-[18px] text-[#0d7a5f] mb-1">Type 3: Value Judgment & Stance on Debates</h3>
            <p className="text-[13px] text-on-surface-variant mb-4">Focus: Agree/Disagree on mandatory policies, online vs. in-person learning, or personal principles</p>
            <div className="bg-[#0d7a5f]/5 border-l-2 border-[#0d7a5f] p-4 text-[14px] text-on-surface rounded-r-lg space-y-3">
              <p><strong>Positioning:</strong> "I strongly agree with the view that [State Prompt Position], as it represents a fundamental [asset / skill / requirement] for [Target Group]."</p>
              <p><strong>Argument 1 (Practical/Cognitive):</strong> "First of all, [Argument 1]. When individuals are exposed to [Practice], they develop essential skills such as [Skill 1] and [Skill 2], which directly translates to better [Performance / Well-being]."</p>
              <p><strong>Argument 2 (Long-term Impact):</strong> "Furthermore, I view this as a long-term investment. Rather than relying on [Passive/Outdated approach], adopting [Proposed approach] prevents [Negative outcome] in the future."</p>
              <p><strong>C1 Conclusion:</strong> "In short, while some may find this challenging initially, the long-term benefits far outweigh the temporary drawbacks."</p>
            </div>
          </div>

          {/* Type 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
            <h3 className="font-bold text-[18px] text-[#0d7a5f] mb-1">Type 4: Broad Societal Outlook, Policy & Future Trends</h3>
            <p className="text-[13px] text-on-surface-variant mb-4">Focus: Role of governments, universities, schools, or long-term developments over 10–20 years</p>
            <div className="bg-[#0d7a5f]/5 border-l-2 border-[#0d7a5f] p-4 text-[14px] text-on-surface rounded-r-lg space-y-3">
              <p><strong>Macro Observation:</strong> "In my view, [Institutions / Governments / Universities] should actively prioritize [Policy / Trend] while maintaining support for [Complementary Area]."</p>
              <p><strong>Concrete Action Step:</strong> "For instance, they could implement [Specific Program/Incentive], such as [Concrete Example: workshops / subsidies / infrastructure]. This would empower individuals to make informed decisions rather than relying on [Suboptimal Default]."</p>
              <p><strong>Broader Societal Impact:</strong> "Looking ahead, this shift will likely create a positive cycle: it broadens collective perspectives and equips the next generation with [Crucial Competency]."</p>
              <p><strong>C1 Conclusion:</strong> "Ultimately, balancing accessibility with high-quality implementation is vital for creating a sustainable and inclusive system."</p>
            </div>
          </div>

        </div>
      </section>

      {/* C1 Connectors */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-bold text-secondary flex items-center gap-2 border-b border-surface-variant pb-2">
          <span className="material-symbols-outlined">forum</span>
          C1 Connectors & Discourse Markers Toolkit
        </h2>
        <div className="card bg-surface-container-low border border-surface-variant rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
              <h3 className="font-bold text-[15px] mb-2 text-on-surface">Introducing Nuance / Concession</h3>
              <ul className="list-disc ml-4 text-[14px] text-secondary space-y-1">
                <li>That being said;</li>
                <li>While I acknowledge that...</li>
                <li>That is not to say I am...</li>
              </ul>
            </div>
            
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
              <h3 className="font-bold text-[15px] mb-2 text-on-surface">Explaining Cause & Effect</h3>
              <ul className="list-disc ml-4 text-[14px] text-secondary space-y-1">
                <li>This cognitive stimulation keeps...</li>
                <li>It directly impacts...</li>
                <li>This approach allows me to...</li>
              </ul>
            </div>
            
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
              <h3 className="font-bold text-[15px] mb-2 text-on-surface">Adding Supporting Evidence</h3>
              <ul className="list-disc ml-4 text-[14px] text-secondary space-y-1">
                <li>Furthermore;</li>
                <li>Additionally;</li>
                <li>For instance</li>
              </ul>
            </div>
            
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
              <h3 className="font-bold text-[15px] mb-2 text-on-surface">Summarizing / Concluding</h3>
              <ul className="list-disc ml-4 text-[14px] text-secondary space-y-1">
                <li>Ultimately;</li>
                <li>Overall;</li>
                <li>In short</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <div className="flex justify-center mt-4">
         <Link 
            href="/tatiana/speaking/take-interview"
            className="bg-primary text-white font-bold text-[15px] px-8 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center gap-2"
          >
            Start Practicing
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
         </Link>
      </div>
    </div>
  );
}
