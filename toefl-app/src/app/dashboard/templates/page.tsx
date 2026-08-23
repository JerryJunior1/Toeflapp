"use client";

import { useState } from "react";
import Link from "next/link";

const templates = [
  {
    id: "opinion",
    icon: "lightbulb",
    color: "#1a73e8",
    bgColor: "bg-[#1a73e8]/10",
    borderColor: "border-[#1a73e8]/30",
    tag: "Opinion",
    title: "Opinion Questions",
    description: "Asked for your view on a general topic, idea, or social trend.",
    examples: [
      "Do you think social media has a positive or negative impact on society?",
      "Do you agree that technology makes people less connected?",
      "Is it better to work in a team or individually?",
    ],
    framework: [
      { step: "Commit (5 sec)", icon: "flag", text: "State your position clearly and directly.", sample: "\"In my opinion, social media has had an overall negative impact on society.\"" },
      { step: "Detail — Reason 1 (10 sec)", icon: "looks_one", text: "Give your first reason with a brief explanation.", sample: "\"First, it has significantly shortened people's attention spans, making deep, meaningful interaction rare.\"" },
      { step: "Elaborate — Reason 2 (15 sec)", icon: "looks_two", text: "Add a second reason or personal example to develop your point.", sample: "\"Additionally, platforms are designed to show people only content they already agree with, which deepens social division rather than creating mutual understanding.\"" },
      { step: "Finish (5 sec)", icon: "check_circle", text: "Restate your answer in a new way to close strongly.", sample: "\"For these reasons, I believe the drawbacks of social media currently outweigh its benefits.\"" },
    ],
    tips: [
      "Never say 'Both have advantages and disadvantages' — always take a clear side.",
      "Use opinion starters: 'In my view...', 'I strongly believe...', 'From my perspective...'",
      "You don't have to believe your answer — just defend it fluently!",
    ],
    keyPhrases: ["In my opinion,", "I strongly believe that", "From my perspective,", "I am convinced that", "To my mind,"],
  },
  {
    id: "preference",
    icon: "compare_arrows",
    color: "#0d7a5f",
    bgColor: "bg-[#0d7a5f]/10",
    borderColor: "border-[#0d7a5f]/30",
    tag: "Preference",
    title: "Preference / Choice Questions",
    description: "You are given two options and must choose one and explain why.",
    examples: [
      "Do you prefer studying alone or in a group?",
      "Would you rather live in a big city or a small town?",
      "Do you prefer reading books or watching documentaries to learn?",
    ],
    framework: [
      { step: "Choose (3 sec)", icon: "flag", text: "Name your choice immediately in the first sentence.", sample: "\"I would definitely choose to study in a group rather than alone.\"" },
      { step: "Reason 1 (12 sec)", icon: "looks_one", text: "Explain the main advantage of your preference.", sample: "\"Studying with others allows you to share different perspectives and fills in gaps in your own understanding much faster than reading alone.\"" },
      { step: "Personal Example (15 sec)", icon: "person", text: "Tell a short personal story or situation that supports your choice.", sample: "\"For example, when I was preparing for an exam last year, my study group helped me understand a difficult concept in minutes that I had been struggling with for hours on my own.\"" },
      { step: "Contrast (10 sec)", icon: "block", text: "Briefly acknowledge the other option but reinforce your choice.", sample: "\"While studying alone has its merits for focus, the collaborative energy of a group makes learning far more efficient and enjoyable for me.\"" },
    ],
    tips: [
      "Commit to ONE choice immediately — never say 'it depends'.",
      "Use a personal example — it makes your answer feel authentic and more fluent.",
      "You only have 45 seconds — keep each point concise.",
    ],
    keyPhrases: ["I would definitely choose", "I strongly prefer", "Given the choice, I would opt for", "Without hesitation, I would pick", "I find that ... is far more ... than"],
  },
  {
    id: "experience",
    icon: "history_edu",
    color: "#c2790a",
    bgColor: "bg-[#c2790a]/10",
    borderColor: "border-[#c2790a]/30",
    tag: "Personal Experience",
    title: "Personal Experience Questions",
    description: "Asked to describe a specific event, habit, memory, or routine from your own life.",
    examples: [
      "Describe a memorable childhood event.",
      "Tell me about a time you had to work with someone very different from you.",
      "What is a hobby or activity you enjoy and why?",
    ],
    framework: [
      { step: "Set the Scene (8 sec)", icon: "location_on", text: "Introduce the experience — what, when, where.", sample: "\"When I was about 12 years old, I participated in a school science fair for the first time.\"" },
      { step: "Describe the Action (15 sec)", icon: "directions_run", text: "Explain what happened and what you specifically did.", sample: "\"My partner and I built a small water filtration system using sand and gravel. We spent several evenings testing it and adjusting the design to make it work properly.\"" },
      { step: "Explain the Outcome (12 sec)", icon: "emoji_events", text: "What was the result? Did something change? What did you achieve?", sample: "\"We ended up winning second place in our school, which was unexpected. It was the first time I realized I genuinely enjoyed solving practical problems.\"" },
      { step: "Reflect (10 sec)", icon: "psychology", text: "Connect it to a broader lesson or personal insight.", sample: "\"That experience sparked my interest in engineering, which ultimately shaped the career path I am on today.\"" },
    ],
    tips: [
      "Use past tense consistently: 'I went', 'I felt', 'I realized'.",
      "Use vivid, specific details — they sound more natural and fluent than generic statements.",
      "Transition words: 'First...', 'Then...', 'As a result...', 'Looking back...'",
    ],
    keyPhrases: ["I clearly remember when", "One experience that stands out is", "When I was [age/time],", "I recall a time when", "This reminded me that"],
  },
  {
    id: "hypothetical",
    icon: "explore",
    color: "#7b3fb3",
    bgColor: "bg-[#7b3fb3]/10",
    borderColor: "border-[#7b3fb3]/30",
    tag: "Hypothetical",
    title: "Prediction / Hypothetical Questions",
    description: "Asked what you would do in an imaginary situation or what you think the future holds.",
    examples: [
      "If you could travel anywhere in the world tomorrow, where would you go and why?",
      "If you could have any job for a week, what would you choose?",
      "How do you think technology will change education in the next 10 years?",
    ],
    framework: [
      { step: "Answer Directly (5 sec)", icon: "flag", text: "State your hypothetical choice immediately.", sample: "\"If I could travel anywhere tomorrow, I would choose Japan.\"" },
      { step: "Core Reason (15 sec)", icon: "looks_one", text: "Explain the main reason for your choice.", sample: "\"Japan fascinates me because of its perfect balance between ancient tradition and cutting-edge modernity. I would love to experience visiting a historic temple in Kyoto and then exploring the technology district in Tokyo, all in the same day.\"" },
      { step: "Vivid Detail (15 sec)", icon: "palette", text: "Paint a picture — what would you specifically do or see?", sample: "\"I can imagine waking up early to see the golden sunrise over Mount Fuji, then spending the evening trying authentic ramen in a tiny, dimly-lit restaurant that has been family-owned for over a hundred years.\"" },
      { step: "Personal Connection (10 sec)", icon: "favorite", text: "Tie it back to yourself — why does this matter to you personally?", sample: "\"Honestly, experiencing that kind of depth of culture is exactly what I find most fulfilling when I travel.\"" },
    ],
    tips: [
      "Use the conditional: 'I would', 'I could', 'it would be'.",
      "Be specific! 'Japan' is better than 'somewhere in Asia'. Specific details = natural fluency.",
      "For future prediction questions, use: 'I believe', 'I expect', 'It is likely that'.",
    ],
    keyPhrases: ["If I could..., I would", "In that situation, I would", "I believe that in the future,", "I think the most significant change will be", "Hypothetically speaking,"],
  },
];

export default function TemplatesPage() {
  const [activeTemplate, setActiveTemplate] = useState(templates[0].id);
  const t = templates.find(t => t.id === activeTemplate)!;

  return (
    <div className="w-full max-w-[960px] mx-auto flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-[16px]">menu_book</span>
          Speaking Section
        </div>
        <h1 className="font-headline text-[32px] font-bold text-on-surface">Response Templates</h1>
        <p className="text-[16px] text-on-surface-variant mt-2 max-w-2xl">
          Master the 4 question types in the TOEFL Interview section. Each template gives you a proven framework to structure your answer in the 45 seconds available.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3">
        {templates.map(tmpl => (
          <button
            key={tmpl.id}
            onClick={() => setActiveTemplate(tmpl.id)}
            style={{ color: activeTemplate === tmpl.id ? tmpl.color : undefined, borderColor: activeTemplate === tmpl.id ? tmpl.color : undefined }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-semibold transition-all ${
              activeTemplate === tmpl.id
                ? `bg-white shadow-md`
                : "border-surface-variant text-on-surface-variant hover:border-on-surface-variant bg-surface-container-low"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{tmpl.icon}</span>
            {tmpl.tag}
          </button>
        ))}
      </div>

      {/* Template Detail */}
      <div className={`rounded-xl border ${t.borderColor} bg-white p-6 md:p-8`}>
        {/* Title */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-12 h-12 rounded-xl ${t.bgColor} flex items-center justify-center shrink-0`}>
            <span className="material-symbols-outlined text-[24px]" style={{ color: t.color }}>{t.icon}</span>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: t.color }}>{t.tag}</span>
            <h2 className="font-headline text-[24px] font-bold text-on-surface">{t.title}</h2>
            <p className="text-[14px] text-on-surface-variant mt-1">{t.description}</p>
          </div>
        </div>

        {/* Example Questions */}
        <div className="mb-6">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-on-surface-variant mb-3">Example Questions</h3>
          <ul className="space-y-2">
            {t.examples.map((ex, i) => (
              <li key={i} className={`flex gap-3 items-start p-3 rounded-lg ${t.bgColor}`}>
                <span className="material-symbols-outlined text-[18px] mt-0.5" style={{ color: t.color }}>help</span>
                <span className="text-[14px] font-medium text-on-surface italic">"{ex}"</span>
              </li>
            ))}
          </ul>
        </div>

        <hr className="border-surface-variant mb-6" />

        {/* Framework Steps */}
        <div className="mb-6">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-on-surface-variant mb-4">The C-D-E-F Framework (45 seconds)</h3>
          <div className="space-y-4">
            {t.framework.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className={`w-9 h-9 rounded-full ${t.bgColor} flex items-center justify-center shrink-0 mt-0.5`}>
                  <span className="material-symbols-outlined text-[18px]" style={{ color: t.color }}>{step.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-bold text-on-surface">{step.step}</span>
                  </div>
                  <p className="text-[14px] text-on-surface-variant mb-2">{step.text}</p>
                  <div className={`p-3 rounded-lg ${t.bgColor} border ${t.borderColor}`}>
                    <p className="text-[14px] italic text-on-surface">{step.sample}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-surface-variant mb-6" />

        {/* Key Phrases */}
        <div className="mb-6">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-on-surface-variant mb-3">Memorize These Starter Phrases</h3>
          <div className="flex flex-wrap gap-2">
            {t.keyPhrases.map((phrase, i) => (
              <span key={i} className={`text-[13px] font-medium px-3 py-1.5 rounded-full border ${t.bgColor} ${t.borderColor}`} style={{ color: t.color }}>
                {phrase}
              </span>
            ))}
          </div>
        </div>

        {/* Pro Tips */}
        <div className={`rounded-xl ${t.bgColor} border ${t.borderColor} p-5`}>
          <h3 className="text-[13px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: t.color }}>
            <span className="material-symbols-outlined text-[18px]">tips_and_updates</span>
            Pro Tips
          </h3>
          <ul className="space-y-2">
            {t.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 items-start text-[14px] text-on-surface">
                <span className="material-symbols-outlined text-[16px] mt-0.5 shrink-0" style={{ color: t.color }}>check</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl bg-primary p-6 flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="text-white">
          <h3 className="font-headline text-[20px] font-bold">Ready to practice?</h3>
          <p className="text-[14px] opacity-80 mt-1">Apply this template in a real interview simulation now.</p>
        </div>
        <Link
          href="/practice/speaking/take-interview"
          className="bg-white font-bold text-[14px] px-6 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 shrink-0"
          style={{ color: t.color }}
        >
          <span className="material-symbols-outlined text-[18px]">mic</span>
          Take an Interview
        </Link>
      </div>
    </div>
  );
}
