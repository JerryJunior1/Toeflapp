"use client";

import Link from "next/link";

export default function TatianaWritingTemplates() {
  return (
    <div className="w-full max-w-[900px] mx-auto flex flex-col gap-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
          <span className="material-symbols-outlined text-[16px]">school</span>
          Tatiana — Writing
        </div>
        <h1 className="font-headline text-[36px] font-bold text-on-surface">Writing Templates & Tips</h1>
        <p className="text-[16px] text-on-surface-variant mt-2 leading-relaxed">
          Master the official C1-level structures and templates required to score highly on the writing section of the TOEFL exam.
        </p>
      </div>

      {/* Task 1: Build a Sentence */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-bold text-primary flex items-center gap-2 border-b border-surface-variant pb-2">
          <span className="material-symbols-outlined">format_shapes</span>
          1. Build a Sentence (Task 1)
        </h2>
        <div className="card bg-surface-container-low border border-surface-variant rounded-2xl p-6 md:p-8 flex flex-col gap-6">
          <p className="text-[15px] text-on-surface leading-relaxed">
            This task tests your mastery of advanced English syntax. Based on the answer keys across the 10 tests, here are the most common C1-level grammatical patterns you need to master:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
              <h3 className="font-bold text-[16px] text-on-surface mb-2">Indirect Questions</h3>
              <p className="text-[14px] text-on-surface-variant mb-3">
                When a question is embedded inside another phrase (like "Do you know..."), the word order changes back to a normal statement (Subject + Verb) instead of a question format.
              </p>
              <div className="bg-primary/5 border-l-2 border-primary p-3 text-[13px] text-on-surface rounded-r-lg space-y-2">
                <p><strong>Pattern:</strong> "Do you know..." + question word (who/what/if) + subject + verb.</p>
                <p>✅ <em>"Do you know what the requirements are?"</em> (Not: what are the requirements).</p>
                <p>✅ <em>"Do you know who made that decision?"</em></p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
              <h3 className="font-bold text-[16px] text-on-surface mb-2">Relative Clauses</h3>
              <p className="text-[14px] text-on-surface-variant mb-3">
                Look for words like that, which, who or past participles acting as adjectives to connect two ideas.
              </p>
              <div className="bg-primary/5 border-l-2 border-primary p-3 text-[13px] text-on-surface rounded-r-lg space-y-2">
                <p>✅ <em>"Have you contacted the company that shipped it?"</em></p>
                <p>✅ <em>"The resources recommended by the professor were very helpful."</em></p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
              <h3 className="font-bold text-[16px] text-on-surface mb-2">Conditional & Time Clauses</h3>
              <p className="text-[14px] text-on-surface-variant mb-3">
                Watch for conjunctions like if, whether, unless, when, or before.
              </p>
              <div className="bg-primary/5 border-l-2 border-primary p-3 text-[13px] text-on-surface rounded-r-lg space-y-2">
                <p>✅ <em>"We can't start the meeting unless everyone joins."</em></p>
                <p>✅ <em>"We need to decide whether we should invest now or wait."</em></p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
              <h3 className="font-bold text-[16px] text-on-surface mb-2">Passive Voice</h3>
              <p className="text-[14px] text-on-surface-variant mb-3">
                Identify if the subject is receiving the action rather than doing it. Look for the verb "to be" + past participle.
              </p>
              <div className="bg-primary/5 border-l-2 border-primary p-3 text-[13px] text-on-surface rounded-r-lg space-y-2">
                <p>✅ <em>"Has the issue been reported to your provider?"</em></p>
              </div>
            </div>
            
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
              <h3 className="font-bold text-[16px] text-on-surface mb-2">Modal Verbs (Passive/Perfect)</h3>
              <p className="text-[14px] text-on-surface-variant mb-3">
                Look for have, been, be, might, could.
              </p>
              <div className="bg-primary/5 border-l-2 border-primary p-3 text-[13px] text-on-surface rounded-r-lg space-y-2">
                <p>✅ <em>"The document might still be stored in the recycle bin."</em></p>
                <p>✅ <em>"The message may not have been seen yet."</em></p>
                <p>✅ <em>"He wondered whether the results could be trusted."</em></p>
              </div>
            </div>
            
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
              <h3 className="font-bold text-[16px] text-on-surface mb-2">Complex Comparisons & Infinitives</h3>
              <div className="bg-primary/5 border-l-2 border-primary p-3 text-[13px] text-on-surface rounded-r-lg space-y-2 mt-2">
                <p><strong>Comparisons:</strong><br/>✅ <em>"It has fewer features than the one that was released last year."</em></p>
                <p><strong>Verbs + Infinitives (to + verb):</strong><br/>✅ <em>"Living abroad often teaches people to become more independent."</em><br/>✅ <em>"I didn't expect it to last so long."</em></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Task 2: Write an Email */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-bold text-[#0d7a5f] flex items-center gap-2 border-b border-surface-variant pb-2">
          <span className="material-symbols-outlined">mail</span>
          2. Write an Email (Task 2)
        </h2>
        <div className="card bg-surface-container-low border border-surface-variant rounded-2xl p-6 md:p-8 flex flex-col gap-8">
          <p className="text-[15px] text-on-surface leading-relaxed">
            The email tasks always ask you to address three specific bullet points (e.g., explain a problem, apologize/suggest a solution, and ask a question). A C1 response requires a polite, professional tone and smooth transitions.
          </p>

          <div>
            <h3 className="text-[18px] font-bold text-on-surface mb-4">The Universal Structure Template</h3>
            <div className="bg-[#0d7a5f]/5 border border-[#0d7a5f]/20 rounded-xl p-5 space-y-4 text-[14px]">
              <div>
                <strong className="text-[#0d7a5f]">Greeting:</strong>
                <ul className="list-disc ml-5 mt-1 text-on-surface-variant">
                  <li>Formal: "Dear [Title/Name or Department]," (e.g., "Dear Library Staff,")</li>
                  <li>Informal (to a friend/classmate): "Hi [Name],"</li>
                </ul>
              </div>
              <div>
                <strong className="text-[#0d7a5f]">Opening & Bullet Point 1 (The Context/Problem):</strong>
                <p className="mt-1 text-on-surface-variant">"I hope you are doing well. I am writing to [inform you about / share concerns about / ask for more details about]..."</p>
                <p className="text-on-surface-variant">"I recently found out that..." or "I am writing because I received..."</p>
              </div>
              <div>
                <strong className="text-[#0d7a5f]">Bullet Point 2 (The Details/Explanation):</strong>
                <p className="mt-1 text-on-surface-variant">Use linking words to explain cause and effect: "This is very important to me because..." or "Without access to the room, it is difficult for me to..."</p>
              </div>
              <div>
                <strong className="text-[#0d7a5f]">Bullet Point 3 (The Request/Solution):</strong>
                <p className="mt-1 text-on-surface-variant">Use polite modal verbs (Could/Would) instead of demands: "Could you please let me know..." or "I would greatly appreciate it if you could look into this error..."</p>
              </div>
              <div>
                <strong className="text-[#0d7a5f]">Sign-off:</strong>
                <p className="mt-1 text-on-surface-variant">"Thank you very much for your time and help."</p>
                <p className="text-on-surface-variant">"Best regards, / Sincerely, [Your Name]"</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[18px] font-bold text-on-surface mb-4">Situational Phrases</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
                <h4 className="font-bold text-[15px] mb-3">A. Making a Request</h4>
                <div className="space-y-3 text-[13px] text-on-surface-variant">
                  <p><strong>Opening:</strong> "I am writing to ask for more details about..." or "I am writing to see if I could make a small change to..."</p>
                  <p><strong>Explaining why:</strong> "This is very important to me because I need to arrange..." or "...because it allows me to gain practical experience..."</p>
                  <p><strong>The "Ask":</strong> "Could you please provide more details about..." or "Could you please clarify which..."</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
                <h4 className="font-bold text-[15px] mb-3">B. Reporting a Problem</h4>
                <div className="space-y-3 text-[13px] text-on-surface-variant">
                  <p><strong>Opening:</strong> "I am writing to share concerns about..." or "I am writing to inform you of a problem with..."</p>
                  <p><strong>Pushing back politely:</strong> "However, I believe there has been a misunderstanding."</p>
                  <p><strong>The "Ask":</strong> "Could you please review my charge and clarify your system's records?" or "Could you please look into this matter..."</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
                <h4 className="font-bold text-[15px] mb-3">C. Apologizing</h4>
                <div className="space-y-3 text-[13px] text-on-surface-variant">
                  <p><strong>Opening:</strong> "I am writing to inform you that... had to cancel at the last minute due to an unexpected personal issue."</p>
                  <p><strong>The Apology:</strong> "I sincerely apologize for any inconvenience this may cause..."</p>
                  <p><strong>The Solution:</strong> "I will gladly replace the [item] with a new copy or cover the cost of any repairs..."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Task 3: Academic Discussion */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-bold text-secondary flex items-center gap-2 border-b border-surface-variant pb-2">
          <span className="material-symbols-outlined">edit_note</span>
          3. Academic Discussion (Task 3)
        </h2>
        <div className="card bg-surface-container-low border border-surface-variant rounded-2xl p-6 md:p-8 flex flex-col gap-8">
          <p className="text-[15px] text-on-surface leading-relaxed">
            To score a C1, you must synthesize the provided arguments, contribute your own unique perspective, and use advanced cohesive devices (e.g., Moreover, Ultimately, While, For instance).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-[16px] text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">balance</span> Option A: The "Take a Firm Stand"
              </h3>
              <p className="text-[13px] text-on-surface-variant mb-3 italic">Use this when you strongly agree with one student and disagree with the other.</p>
              <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-5 text-[14px] text-on-surface space-y-3 leading-relaxed">
                <p>I agree with [Student A]'s view that [paraphrase their main point]. One important reason is that [introduce your own unique supporting idea], which can [explain the positive result/effect]. Moreover, [add a real-world example or further detail to strengthen your point].</p>
                <p>While [Student B] suggests that [paraphrase Student B's opposing point], this perspective may be less convincing because [provide your counterargument]. For example, [give a specific example proving Student B's fear is unfounded or manageable].</p>
                <p>Ultimately, although [concede a minor point to the opposing side], [restate why your chosen side is superior].</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[16px] text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">handshake</span> Option B: The "Nuanced / Middle-Ground"
              </h3>
              <p className="text-[13px] text-on-surface-variant mb-3 italic">Use this when both students make good points and the truth lies somewhere in the middle.</p>
              <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-5 text-[14px] text-on-surface space-y-3 leading-relaxed">
                <p>I believe [Topic] is largely [state your balanced view], although [acknowledge the opposing side's condition]. As [Student A] suggests, [paraphrase Student A]. For instance, [add your own unique example expanding on Student A's point]. Such experiences can meaningfully [explain the impact].</p>
                <p>At the same time, I understand [Student B]'s point/concern that [paraphrase Student B]. [Add your own thoughts validating this concern]. However, [explain how to overcome this challenge or why it doesn't apply to every situation].</p>
                <p>Therefore / In my view, [summarize your combined approach]. By combining [Element A] with [Element B], we can [state the ultimate positive outcome].</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
            <h3 className="font-bold text-[18px] text-on-surface mb-4">The C1 Lexicon</h3>
            <p className="text-[14px] text-on-surface-variant mb-4">
              Avoid basic words like "good," "bad," "big," or "important." Memorize these advanced collocations to sprinkle into your templates:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
              <div className="space-y-2">
                <p>Instead of <span className="line-through opacity-70">"I agree with..."</span><br/><strong className="text-secondary">"I agree with [Name]'s view that..."</strong></p>
                <p className="pt-2">Instead of <span className="line-through opacity-70">"This is a bad idea because..."</span><br/><strong className="text-secondary">"...this perspective may be less convincing because..."</strong></p>
              </div>
              
              <div className="space-y-2 border-l border-surface-variant pl-4">
                <p className="font-semibold text-on-surface">To describe a positive effect:</p>
                <ul className="list-disc ml-4 text-secondary space-y-1">
                  <li>"...dramatically boost a student's final academic performance."</li>
                  <li>"...effectively prepares young people for highly competitive real-world career environments..."</li>
                  <li>"...provides a foundation that supports lifelong learning..."</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-error/5 border border-error/20 rounded-lg">
               <p className="font-bold text-error flex items-center gap-2 mb-1">
                 <span className="material-symbols-outlined">warning</span> The Final C1 Secret for Task 3:
               </p>
               <p className="text-[14px] text-on-surface">
                 You are graded heavily on <strong>"making a contribution in your own words."</strong> This means you cannot just copy what the fictional students said. If Student A says "bike lanes reduce pollution", you must add a completely new detail, such as: <em>"These benefits are especially important in large cities with serious traffic and air quality problems."</em>
               </p>
            </div>
          </div>

        </div>
      </section>
      
      <div className="flex justify-center mt-4">
         <Link 
            href="/tatiana/writing/build-sentence"
            className="bg-primary text-white font-bold text-[15px] px-8 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center gap-2"
          >
            Start Practicing
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
      </div>
    </div>
  );
}
