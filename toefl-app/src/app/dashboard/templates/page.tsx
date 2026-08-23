"use client";

import { useState } from "react";
import Link from "next/link";

type Section = { step: string; icon: string; text: string; sample: string };
type Template = {
  id: string; icon: string; color: string; bgColor: string; borderColor: string;
  tag: string; title: string; description: string; timing: string; target: string;
  section: "Speaking" | "Writing"; practiceHref: string; practiceLabel: string;
  examples: string[]; framework: Section[];
  tips: string[]; keyPhrases: string[];
};

const templates: Template[] = [
  // ── SPEAKING ──────────────────────────────────────────────────────────────
  {
    id: "opinion",
    section: "Speaking",
    icon: "lightbulb",
    color: "#1a73e8",
    bgColor: "bg-[#1a73e8]/10",
    borderColor: "border-[#1a73e8]/30",
    tag: "Opinion",
    title: "Opinion Questions",
    description: "Asked for your view on a general topic, idea, or social trend.",
    timing: "45 seconds — no prep time",
    target: "~80–100 words spoken",
    practiceHref: "/practice/speaking/take-interview",
    practiceLabel: "Take an Interview",
    examples: [
      "Do you think social media has a positive or negative impact on society?",
      "Do you agree that technology makes people less connected?",
      "Is it better to work in a team or individually?",
    ],
    framework: [
      { step: "Commit (5 sec)", icon: "flag", text: "State your position clearly and directly.", sample: "\"In my opinion, social media has had an overall negative impact on society.\"" },
      { step: "Detail — Reason 1 (10 sec)", icon: "looks_one", text: "Give your first reason with a brief explanation.", sample: "\"First, it has significantly shortened people's attention spans, making deep, meaningful interaction rare.\"" },
      { step: "Elaborate — Reason 2 (20 sec)", icon: "looks_two", text: "Add a second reason or personal example.", sample: "\"Additionally, platforms are designed to show content people already agree with, deepening social division rather than creating mutual understanding.\"" },
      { step: "Finish (10 sec)", icon: "check_circle", text: "Restate your answer in a new way to close strongly.", sample: "\"For these reasons, I believe the drawbacks of social media currently outweigh its benefits.\"" },
    ],
    tips: [
      "Never say 'Both have advantages' — always take a clear side.",
      "Use opinion starters: 'In my view...', 'I strongly believe...', 'From my perspective...'",
      "You don't have to actually believe your answer — just defend it fluently!",
    ],
    keyPhrases: ["In my opinion,", "I strongly believe that", "From my perspective,", "I am convinced that", "To my mind,"],
  },
  {
    id: "preference",
    section: "Speaking",
    icon: "compare_arrows",
    color: "#0d7a5f",
    bgColor: "bg-[#0d7a5f]/10",
    borderColor: "border-[#0d7a5f]/30",
    tag: "Preference",
    title: "Preference / Choice Questions",
    description: "You are given two options and must choose one and explain why.",
    timing: "45 seconds — no prep time",
    target: "~80–100 words spoken",
    practiceHref: "/practice/speaking/take-interview",
    practiceLabel: "Take an Interview",
    examples: [
      "Do you prefer studying alone or in a group?",
      "Would you rather live in a big city or a small town?",
      "Do you prefer reading books or watching documentaries to learn?",
    ],
    framework: [
      { step: "Choose (5 sec)", icon: "flag", text: "Name your choice immediately in the first sentence.", sample: "\"I would definitely choose to study in a group rather than alone.\"" },
      { step: "Reason 1 (12 sec)", icon: "looks_one", text: "Explain the main advantage of your preference.", sample: "\"Studying with others allows you to share different perspectives and fill gaps in your own understanding much faster than reading alone.\"" },
      { step: "Personal Example (18 sec)", icon: "person", text: "Tell a short personal story that supports your choice.", sample: "\"For example, when I was preparing for an exam last year, my study group helped me understand a difficult concept in minutes that I had struggled with for hours on my own.\"" },
      { step: "Contrast (10 sec)", icon: "block", text: "Briefly acknowledge the other option but reinforce your choice.", sample: "\"While studying alone has its merits for focus, the collaborative energy of a group makes learning far more efficient for me.\"" },
    ],
    tips: [
      "Commit to ONE choice immediately — never say 'it depends'.",
      "Use a personal example — it sounds authentic and more naturally fluent.",
      "You only have 45 seconds — keep each point concise.",
    ],
    keyPhrases: ["I would definitely choose", "I strongly prefer", "Given the choice, I would opt for", "Without hesitation, I would pick", "I find that ... is far more ... than"],
  },
  {
    id: "experience",
    section: "Speaking",
    icon: "history_edu",
    color: "#c2790a",
    bgColor: "bg-[#c2790a]/10",
    borderColor: "border-[#c2790a]/30",
    tag: "Experience",
    title: "Personal Experience Questions",
    description: "Asked to describe a specific event, habit, memory, or routine from your own life.",
    timing: "45 seconds — no prep time",
    target: "~80–100 words spoken",
    practiceHref: "/practice/speaking/take-interview",
    practiceLabel: "Take an Interview",
    examples: [
      "Describe a memorable childhood event.",
      "Tell me about a time you worked with someone very different from you.",
      "What is a hobby or activity you enjoy and why?",
    ],
    framework: [
      { step: "Set the Scene (8 sec)", icon: "location_on", text: "Introduce the experience — what, when, where.", sample: "\"When I was about 12 years old, I participated in a school science fair for the first time.\"" },
      { step: "Describe the Action (15 sec)", icon: "directions_run", text: "Explain what happened and what you specifically did.", sample: "\"My partner and I built a small water filtration system using sand and gravel. We spent several evenings testing and adjusting the design.\"" },
      { step: "Explain the Outcome (12 sec)", icon: "emoji_events", text: "What was the result? What did you achieve?", sample: "\"We ended up winning second place, which was completely unexpected. It was the first time I realized I genuinely enjoyed solving practical problems.\"" },
      { step: "Reflect (10 sec)", icon: "psychology", text: "Connect it to a broader lesson or personal insight.", sample: "\"That experience sparked my interest in engineering, which ultimately shaped the career path I am on today.\"" },
    ],
    tips: [
      "Use past tense consistently: 'I went', 'I felt', 'I realized'.",
      "Use vivid, specific details — they sound more natural than vague statements.",
      "Use transitions: 'First...', 'Then...', 'As a result...', 'Looking back...'",
    ],
    keyPhrases: ["I clearly remember when", "One experience that stands out is", "When I was [age/time],", "I recall a time when", "This reminded me that"],
  },
  {
    id: "hypothetical",
    section: "Speaking",
    icon: "explore",
    color: "#7b3fb3",
    bgColor: "bg-[#7b3fb3]/10",
    borderColor: "border-[#7b3fb3]/30",
    tag: "Hypothetical",
    title: "Prediction / Hypothetical Questions",
    description: "Asked what you would do in an imaginary situation or what you think the future holds.",
    timing: "45 seconds — no prep time",
    target: "~80–100 words spoken",
    practiceHref: "/practice/speaking/take-interview",
    practiceLabel: "Take an Interview",
    examples: [
      "If you could travel anywhere in the world tomorrow, where would you go and why?",
      "If you could have any job for a week, what would you choose?",
      "How do you think technology will change education in the next 10 years?",
    ],
    framework: [
      { step: "Answer Directly (5 sec)", icon: "flag", text: "State your hypothetical choice immediately.", sample: "\"If I could travel anywhere tomorrow, I would choose Japan.\"" },
      { step: "Core Reason (15 sec)", icon: "looks_one", text: "Explain the main reason for your choice.", sample: "\"Japan fascinates me because of its perfect balance between ancient tradition and cutting-edge modernity. I would love to visit a historic temple in Kyoto and explore the technology district in Tokyo in the same day.\"" },
      { step: "Vivid Detail (15 sec)", icon: "palette", text: "Paint a picture — what would you specifically do or see?", sample: "\"I can imagine waking up early to see the golden sunrise over Mount Fuji, then spending the evening trying authentic ramen in a tiny, dimly-lit restaurant that has been family-owned for a hundred years.\"" },
      { step: "Personal Connection (10 sec)", icon: "favorite", text: "Tie it back to yourself — why does this matter to you personally?", sample: "\"Experiencing that depth of culture is exactly what I find most fulfilling when I travel.\"" },
    ],
    tips: [
      "Use the conditional: 'I would', 'I could', 'it would be'.",
      "Be specific! 'Japan' is better than 'somewhere in Asia'. Specific details = natural fluency.",
      "For future predictions, use: 'I believe', 'I expect', 'It is likely that'.",
    ],
    keyPhrases: ["If I could..., I would", "In that situation, I would", "I believe that in the future,", "I think the most significant change will be", "Hypothetically speaking,"],
  },

  // ── WRITING ───────────────────────────────────────────────────────────────
  {
    id: "academic-discussion",
    section: "Writing",
    icon: "forum",
    color: "#125537",
    bgColor: "bg-[#125537]/10",
    borderColor: "border-[#125537]/30",
    tag: "Academic Discussion",
    title: "Write for an Academic Discussion",
    description: "Read a professor's prompt and two student posts, then contribute your own opinion to the thread.",
    timing: "10 minutes total",
    target: "100–130 words written",
    practiceHref: "/practice/writing/academic-discussion",
    practiceLabel: "Academic Discussion",
    examples: [
      "A professor asks: 'Should universities require all students to take a public speaking course?'",
      "A professor asks: 'Is it better for students to specialize early or study broadly before choosing a major?'",
      "A professor asks: 'Do you think remote work is more productive than working in an office?'",
    ],
    framework: [
      {
        step: "State Your Position (Sentence 1)",
        icon: "flag",
        text: "Directly answer the professor's question — no background info first.",
        sample: "\"I strongly agree with Maria's point that public speaking courses should be mandatory because clear communication is a fundamental skill for any career.\""
      },
      {
        step: "Engage with the Thread (Sentence 2)",
        icon: "chat",
        text: "Briefly reference a classmate's post to show you are participating in a discussion, not writing an essay.",
        sample: "\"While I see James's point about students needing to focus on their major subjects, I would argue that effective communication skills actually enhance performance in all other areas of study.\""
      },
      {
        step: "Support with a Reason + Example (Sentences 3–5)",
        icon: "looks_one",
        text: "Give one strong, specific reason and a concrete real-world example.",
        sample: "\"For instance, in my own experience, students who can clearly present their research findings are far more likely to secure internships and job opportunities. A strong idea poorly communicated will always be less effective than a simple idea communicated brilliantly.\""
      },
      {
        step: "Closing Sentence",
        icon: "check_circle",
        text: "Wrap up with one sentence that restates your position concisely.",
        sample: "\"For this reason, I firmly believe that public speaking should be a required course at every university.\""
      },
    ],
    tips: [
      "Target 100–130 words — quality and relevance beat length every time.",
      "Always reference at least one classmate's name to show discussion engagement.",
      "Do NOT write a traditional essay intro. Start directly with your opinion.",
      "Use your final 1 minute to proofread for typos and grammar errors.",
      "Be specific: 'at my university' or 'in my experience' beats vague generalizations.",
    ],
    keyPhrases: [
      "I strongly agree/disagree with [Name]",
      "While [Name] makes a valid point, I believe",
      "Building on what [Name] said,",
      "For this reason, I firmly believe",
      "From my perspective, however,",
    ],
  },
  // ── EMAIL TYPE 1: REQUEST ─────────────────────────────────────────────────
  {
    id: "email-request",
    section: "Writing",
    icon: "help",
    color: "#1a73e8",
    bgColor: "bg-[#1a73e8]/10",
    borderColor: "border-[#1a73e8]/30",
    tag: "Request",
    title: "Email — Making a Request",
    description: "Ask for something politely: an extension, information, permission, or a favour from a professor or office.",
    timing: "7 minutes total",
    target: "100–150 words written",
    practiceHref: "/practice/writing/write-email",
    practiceLabel: "Write an Email",
    examples: [
      "Write to your professor requesting a deadline extension because you have been ill.",
      "Write to the university library asking for access to a restricted research database.",
      "Write to the housing office requesting a room change and explaining your reasons.",
    ],
    framework: [
      { step: "Subject Line", icon: "title", text: "Be specific — mention what you are requesting.", sample: "Subject: Request for Deadline Extension — History 202 Essay" },
      { step: "Greeting", icon: "waving_hand", text: "Formal salutation matching the recipient.", sample: "Dear Professor Smith," },
      { step: "State Who You Are + Purpose", icon: "flag", text: "Introduce yourself and immediately state your request.", sample: "\"My name is [Name], and I am a student in your History 202 course. I am writing to respectfully request a two-day extension for the essay due this Friday.\"" },
      { step: "Give Your Reason", icon: "info", text: "Explain WHY you are making the request — be honest and brief.", sample: "\"Unfortunately, I have been suffering from a severe flu since Monday and have been unable to work on my assignment.\"" },
      { step: "Action + Offer", icon: "handshake", text: "State exactly what you need and offer something in return (a note, early submission, etc.).", sample: "\"Would it be possible to submit the essay by Sunday evening? I am happy to provide a medical certificate if required.\"" },
      { step: "Polite Closing", icon: "check_circle", text: "Thank them and sign off professionally.", sample: "\"Thank you very much for your understanding and consideration.\"\n\nSincerely,\n[Your Name]" },
    ],
    tips: [
      "Use 'Would it be possible to...' or 'I would be grateful if you could...' — never demand.",
      "Always explain your reason clearly but briefly — don't overshare personal details.",
      "Offer something back: a medical note, an early draft, or alternative submission.",
      "Never use contractions: 'I'll' → 'I will', 'don't' → 'do not'.",
    ],
    keyPhrases: [
      "I am writing to respectfully request",
      "Would it be possible to",
      "I would be grateful if you could",
      "I would appreciate your assistance with",
      "Please let me know if you require any further information",
    ],
  },
  // ── EMAIL TYPE 2: COMPLAINT ───────────────────────────────────────────────
  {
    id: "email-complaint",
    section: "Writing",
    icon: "report_problem",
    color: "#c0392b",
    bgColor: "bg-[#c0392b]/10",
    borderColor: "border-[#c0392b]/30",
    tag: "Complaint",
    title: "Email — Making a Complaint",
    description: "Report a problem or express concern about a service, situation, or experience — while remaining polite.",
    timing: "7 minutes total",
    target: "100–150 words written",
    practiceHref: "/practice/writing/write-email",
    practiceLabel: "Write an Email",
    examples: [
      "Write to the university IT department complaining that the student portal has been inaccessible for three days.",
      "Write to your landlord about a maintenance issue in your apartment that has not been fixed.",
      "Write to the cafeteria manager about the poor quality of food and long waiting times.",
    ],
    framework: [
      { step: "Subject Line", icon: "title", text: "Describe the problem clearly and factually.", sample: "Subject: Ongoing Issue with Student Portal Access — [Your Name]" },
      { step: "Greeting", icon: "waving_hand", text: "Formal salutation.", sample: "Dear IT Support Team," },
      { step: "State the Problem Clearly", icon: "flag", text: "Describe what the issue is, when it started, and how it affects you.", sample: "\"I am writing to report an ongoing technical issue with the student portal. For the past three days, I have been completely unable to log in to access my course materials and submit assignments.\"" },
      { step: "Provide Evidence / Details", icon: "info", text: "Give specific facts — dates, frequency, what you have already tried.", sample: "\"I have attempted to log in from three different devices and browsers, and I have also tried resetting my password twice, but the problem persists.\"" },
      { step: "State What You Want Done", icon: "build", text: "Politely but clearly explain what resolution you expect.", sample: "\"I kindly ask that this issue be resolved as soon as possible, as I have an assignment deadline approaching on Friday.\"" },
      { step: "Polite Closing", icon: "check_circle", text: "Stay professional — no aggressive language.", sample: "\"Thank you for your prompt attention to this matter. I look forward to your response.\"\n\nSincerely,\n[Your Name]" },
    ],
    tips: [
      "Stay factual and calm — never use angry or aggressive language in a formal complaint.",
      "Include specific dates, numbers, or events to make your complaint credible.",
      "Always say what outcome you want — don't just describe the problem.",
      "Use 'I would appreciate a prompt resolution' rather than 'You must fix this immediately'.",
    ],
    keyPhrases: [
      "I am writing to express my concern regarding",
      "I am reporting an issue with",
      "This situation has had a significant impact on",
      "I kindly request that this matter be resolved",
      "I would appreciate a prompt response",
    ],
  },
  // ── EMAIL TYPE 3: APOLOGY ─────────────────────────────────────────────────
  {
    id: "email-apology",
    section: "Writing",
    icon: "sentiment_dissatisfied",
    color: "#7b3fb3",
    bgColor: "bg-[#7b3fb3]/10",
    borderColor: "border-[#7b3fb3]/30",
    tag: "Apology",
    title: "Email — Sending an Apology",
    description: "Apologize for a mistake, missed deadline, or inconvenience you caused — and offer a solution.",
    timing: "7 minutes total",
    target: "100–150 words written",
    practiceHref: "/practice/writing/write-email",
    practiceLabel: "Write an Email",
    examples: [
      "Write to your professor apologizing for submitting an assignment late.",
      "Write to a group project partner apologizing for missing a scheduled meeting.",
      "Write to a company apologizing for cancelling an interview at short notice.",
    ],
    framework: [
      { step: "Subject Line", icon: "title", text: "Acknowledge the situation directly in the subject.", sample: "Subject: Apology for Late Submission — BIOL 101 Lab Report" },
      { step: "Greeting", icon: "waving_hand", text: "Formal salutation.", sample: "Dear Professor Johnson," },
      { step: "Apologize Sincerely — First Sentence", icon: "flag", text: "State your apology immediately and clearly — do not delay it.", sample: "\"I am writing to sincerely apologize for submitting my lab report two days after the deadline.\"" },
      { step: "Explain (Briefly)", icon: "info", text: "Give a short, honest explanation — do not make excuses or over-explain.", sample: "\"I experienced a family emergency last week that prevented me from completing the report on time.\"" },
      { step: "Take Responsibility + Offer a Solution", icon: "build", text: "Accept responsibility and propose how you will fix the situation.", sample: "\"I take full responsibility for not communicating this to you sooner. I have now completed the report and attached it to this email. I am willing to accept any late penalty you see fit to apply.\"" },
      { step: "Reassure + Close", icon: "check_circle", text: "Reassure them it won't happen again and close professionally.", sample: "\"I assure you this will not happen again. Thank you for your understanding.\"\n\nSincerely,\n[Your Name]" },
    ],
    tips: [
      "Apologize in the very first sentence — never bury it at the end.",
      "Keep your explanation short: one reason, no over-justification.",
      "Always offer a concrete solution or next step.",
      "Do not use 'I'm sorry if...' — it sounds insincere. Use 'I sincerely apologize for...'",
    ],
    keyPhrases: [
      "I am writing to sincerely apologize for",
      "Please accept my sincere apologies for",
      "I take full responsibility for",
      "I assure you this will not happen again",
      "I am committed to ensuring that",
    ],
  },
  // ── EMAIL TYPE 4: INFORMATION ─────────────────────────────────────────────
  {
    id: "email-information",
    section: "Writing",
    icon: "info",
    color: "#0d7a5f",
    bgColor: "bg-[#0d7a5f]/10",
    borderColor: "border-[#0d7a5f]/30",
    tag: "Information",
    title: "Email — Providing Information",
    description: "Respond to a request for information, or proactively inform someone about an update or change.",
    timing: "7 minutes total",
    target: "100–150 words written",
    practiceHref: "/practice/writing/write-email",
    practiceLabel: "Write an Email",
    examples: [
      "Write to a classmate who missed a lecture to summarize what was covered.",
      "Write to the student office informing them that you will be withdrawing from a course.",
      "Write to a new student answering their questions about the library facilities.",
    ],
    framework: [
      { step: "Subject Line", icon: "title", text: "Describe the information topic clearly.", sample: "Subject: Summary of Tuesday's Biology Lecture — [Date]" },
      { step: "Greeting", icon: "waving_hand", text: "Match the formality to the recipient.", sample: "Hi Sam, / Dear Ms. Rodriguez," },
      { step: "State the Purpose", icon: "flag", text: "Immediately explain why you are writing and what information you are providing.", sample: "\"I am writing in response to your question about what was covered in Tuesday's Biology lecture.\"" },
      { step: "Provide the Information Clearly (Point by Point)", icon: "checklist", text: "Present each piece of information clearly — use short sentences or a brief list if needed.", sample: "\"The lecture covered three main topics: first, cell membrane structure; second, the process of osmosis; and third, an introduction to enzyme activity. Professor Lee also announced that there will be a quiz on these topics next Thursday.\"" },
      { step: "Offer Further Help + Close", icon: "check_circle", text: "Offer to answer follow-up questions and close warmly.", sample: "\"Please let me know if you need any clarification on any of these points. Happy to help!\"\n\nBest regards,\n[Your Name]" },
    ],
    tips: [
      "Structure your information clearly — use first/second/third or separate short paragraphs.",
      "Be precise with facts — include names, dates, and specific details.",
      "Adjust your tone: formal for professors/offices, semi-formal for classmates.",
      "Do not add information that was NOT asked for — stay focused on what was requested.",
    ],
    keyPhrases: [
      "I am writing to inform you that",
      "In response to your inquiry regarding",
      "I wanted to let you know that",
      "Please find the requested information below",
      "Do not hesitate to contact me if you need further information",
    ],
  },
  // ── EMAIL TYPE 5: THANK YOU ───────────────────────────────────────────────
  {
    id: "email-thankyou",
    section: "Writing",
    icon: "favorite",
    color: "#c2790a",
    bgColor: "bg-[#c2790a]/10",
    borderColor: "border-[#c2790a]/30",
    tag: "Thank You",
    title: "Email — Expressing Gratitude",
    description: "Thank someone for their help, an opportunity, or a favour — and explain the positive impact it had.",
    timing: "7 minutes total",
    target: "100–150 words written",
    practiceHref: "/practice/writing/write-email",
    practiceLabel: "Write an Email",
    examples: [
      "Write to your professor thanking them for writing you a letter of recommendation.",
      "Write to a company contact thanking them for giving you an internship interview.",
      "Write to a university advisor thanking them for helping you plan your course schedule.",
    ],
    framework: [
      { step: "Subject Line", icon: "title", text: "Express gratitude clearly in the subject line.", sample: "Subject: Thank You — Letter of Recommendation / Internship Interview" },
      { step: "Greeting", icon: "waving_hand", text: "Formal salutation.", sample: "Dear Professor Wilson," },
      { step: "Express Gratitude Immediately", icon: "flag", text: "State your thanks in the very first sentence.", sample: "\"I am writing to sincerely thank you for taking the time to write a letter of recommendation on my behalf.\"" },
      { step: "Explain the Impact", icon: "emoji_events", text: "Tell them what their help meant to you — mention the specific result or opportunity.", sample: "\"Your support played an important role in my application, and I am delighted to share that I have been accepted into the Graduate Program at Stanford University.\"" },
      { step: "Acknowledge Their Effort", icon: "handshake", text: "Recognise what they did specifically and how it helped you personally.", sample: "\"I truly appreciate the thoughtfulness and detail you put into the letter. Your kind words gave me the confidence to pursue this opportunity.\"" },
      { step: "Warm Closing", icon: "check_circle", text: "Close with warmth and offer to stay in touch.", sample: "\"I hope to make you proud and would love to keep you informed of my progress. Thank you again from the bottom of my heart.\"\n\nWith gratitude,\n[Your Name]" },
    ],
    tips: [
      "Express gratitude in the FIRST sentence — do not delay it.",
      "Be specific about what you are thankful for and why it mattered.",
      "Mention a real outcome or result to make your thanks feel genuine.",
      "A thank-you email can be slightly warmer in tone — but still professional.",
    ],
    keyPhrases: [
      "I am writing to sincerely thank you for",
      "I truly appreciate your",
      "Your help has made a significant difference",
      "I am extremely grateful for",
      "I hope to make you proud",
    ],
  },
];

const sections = ["Speaking", "Writing"] as const;
type SectionType = typeof sections[number];

export default function TemplatesPage() {
  const [activeSection, setActiveSection] = useState<SectionType>("Speaking");
  const [activeTemplateId, setActiveTemplateId] = useState("opinion");

  const sectionTemplates = templates.filter(t => t.section === activeSection);
  const t = templates.find(tmpl => tmpl.id === activeTemplateId) || sectionTemplates[0];

  const handleSectionChange = (s: SectionType) => {
    setActiveSection(s);
    setActiveTemplateId(templates.find(tmpl => tmpl.section === s)!.id);
  };

  return (
    <div className="w-full max-w-[960px] mx-auto flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="font-headline text-[32px] font-bold text-on-surface">Response Templates</h1>
        <p className="text-[16px] text-on-surface-variant mt-2 max-w-2xl">
          Proven frameworks for every TOEFL task type. Study these templates, then apply them in practice.
        </p>
      </div>

      {/* Section switcher */}
      <div className="flex gap-2 bg-surface-container-low rounded-xl p-1 w-fit border border-surface-variant">
        {sections.map(s => (
          <button
            key={s}
            onClick={() => handleSectionChange(s)}
            className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all flex items-center gap-2 ${
              activeSection === s
                ? "bg-primary text-white shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {s === "Speaking" ? "mic" : "edit_note"}
            </span>
            {s}
          </button>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3">
        {sectionTemplates.map(tmpl => (
          <button
            key={tmpl.id}
            onClick={() => setActiveTemplateId(tmpl.id)}
            style={{ color: activeTemplateId === tmpl.id ? tmpl.color : undefined, borderColor: activeTemplateId === tmpl.id ? tmpl.color : undefined }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-semibold transition-all ${
              activeTemplateId === tmpl.id
                ? "bg-white shadow-md"
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
        {/* Title + Metadata */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl ${t.bgColor} flex items-center justify-center shrink-0`}>
            <span className="material-symbols-outlined text-[24px]" style={{ color: t.color }}>{t.icon}</span>
          </div>
          <div className="flex-1">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: t.color }}>{t.tag}</span>
            <h2 className="font-headline text-[24px] font-bold text-on-surface">{t.title}</h2>
            <p className="text-[14px] text-on-surface-variant mt-1">{t.description}</p>
          </div>
        </div>

        {/* Timing + Target */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-on-surface-variant bg-surface-container-low border border-surface-variant px-3 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-[14px]">timer</span>
            {t.timing}
          </div>
          <div className="flex items-center gap-2 text-[12px] font-semibold text-on-surface-variant bg-surface-container-low border border-surface-variant px-3 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-[14px]">format_list_numbered</span>
            Target: {t.target}
          </div>
        </div>

        {/* Example Questions */}
        <div className="mb-6">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-on-surface-variant mb-3">Example Prompts</h3>
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
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-on-surface-variant mb-4">Step-by-Step Framework</h3>
          <div className="space-y-4">
            {t.framework.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className={`w-9 h-9 rounded-full ${t.bgColor} flex items-center justify-center shrink-0 mt-0.5`}>
                  <span className="material-symbols-outlined text-[18px]" style={{ color: t.color }}>{step.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-on-surface mb-1">{step.step}</p>
                  <p className="text-[14px] text-on-surface-variant mb-2">{step.text}</p>
                  <div className={`p-3 rounded-lg ${t.bgColor} border ${t.borderColor} whitespace-pre-wrap`}>
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
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-on-surface-variant mb-3">Memorize These Phrases</h3>
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
          <h3 className="font-headline text-[20px] font-bold">Ready to apply this template?</h3>
          <p className="text-[14px] opacity-80 mt-1">Practice this task in a real simulation now.</p>
        </div>
        <Link
          href={t.practiceHref}
          className="bg-white font-bold text-[14px] px-6 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 shrink-0"
          style={{ color: t.color }}
        >
          <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
          {t.practiceLabel}
        </Link>
      </div>
    </div>
  );
}
