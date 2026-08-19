import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { taskType } = await request.json();
    const supabase = await createClient();

    // 1. Fetch random context from our vector DB
    // We fetch a block of documents and pick one randomly
    const { data: docs, error: dbError } = await supabase
      .from('practice_documents')
      .select('content')
      .limit(100);

    if (dbError || !docs || docs.length === 0) {
      console.error('DB Error:', dbError);
      return NextResponse.json({ error: 'Failed to fetch source material or database is empty. Check if RLS is disabled.' }, { status: 500 });
    }

    const randomDoc = docs[Math.floor(Math.random() * docs.length)].content;

    // 2. Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
  model: "gemini-3.6-flash",
});

    // 3. Construct prompt based on taskType
    let prompt = "";
    if (taskType === "academic-discussion") {
      prompt = `You are a TOEFL instructor. Based on the following academic text, create a "Writing for an Academic Discussion" task.
      Format the output as JSON with:
      - topic: The main theme (e.g., "Urban Planning & Sustainability")
      - professorPrompt: A short 2-3 sentence prompt from Professor Adams asking for student opinions on an issue.
      - student1Name: "Sarah J."
      - student1Response: A short paragraph from a student taking one stance.
      - student2Name: "Mike K."
      - student2Response: A short paragraph from a student taking an alternative stance.
      
      Text: ${randomDoc}
      
      Return ONLY valid JSON. No markdown backticks.`;
    } else if (taskType === "take-interview") {
      prompt = `You are a TOEFL instructor. Based on the following text, create a "Take an Interview" speaking task.
      Format the output as JSON with:
      - topic: The overall theme
      - question: A conversational, interview-style question asking for the user's opinion or experience related to the topic.
      
      Text: ${randomDoc}
      
      Return ONLY valid JSON. No markdown backticks.`;
    } else if (taskType === "listen-and-repeat") {
      prompt = `You are a TOEFL instructor. Based on the following text, create a "Listen and Repeat" speaking task.
      Format the output as JSON with:
      - phrase: A single, natural English sentence (10-15 words) that tests pronunciation and rhythm.
      
      Text: ${randomDoc}
      
      Return ONLY valid JSON. No markdown backticks.`;
    } else if (taskType === "build-sentence") {
      prompt = `You are a TOEFL instructor. Based on the following text, create a "Build a Sentence" writing task.
      Format the output as JSON with:
      - originalSentence: A grammatically correct academic sentence (12-18 words).
      - shuffledParts: An array of strings where the sentence is broken into 4-6 chunks and shuffled randomly.
      
      Text: ${randomDoc}
      
      Return ONLY valid JSON. No markdown backticks.`;
    } else if (taskType === "write-email") {
      prompt = `You are a TOEFL instructor. Based on the following text, create a "Write an Email" task.
      Format the output as JSON with:
      - scenario: A short paragraph describing an academic or professional situation (e.g. asking a professor for an extension, proposing a solution to a committee).
      - task: A bulleted list of 3 specific things the user must address in their email.
      
      Text: ${randomDoc}
      
      Return ONLY valid JSON. No markdown backticks.`;
    } else {
      prompt = `You are a TOEFL instructor. Based on the following text, create a practice prompt for the task: ${taskType}.
      Return ONLY valid JSON with a "promptText" field.
      Text: ${randomDoc}
      
      Return ONLY valid JSON. No markdown backticks.`;
    }

    // 4. Call Gemini
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Parse JSON
    let parsed;
    try {
      const jsonStr = text.replace(/```json\n?/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse Gemini output as JSON", text);
      return NextResponse.json({ error: "AI generated invalid format." }, { status: 500 });
    }

    return NextResponse.json({ data: parsed });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
