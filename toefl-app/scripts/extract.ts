import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function run() {
  console.log("Uploading file...");
  
  const file = await ai.files.upload({
    file: "D:/Toeflapp/DocToefl/DOC-20260607-WA0001_260611_181849.pdf",
    config: { mimeType: "application/pdf" }
  });
  console.log("Uploaded as:", file.name);

  console.log("Extracting 3 tasks...");
  
  const prompt = `This PDF contains a series of TOEFL Academic Discussion tasks. 
Each task consists of:
1. A numbered title
2. A table with the Professor's prompt and two student responses
3. An "Answer:" section

Extract the FIRST 3 tasks.
Output strictly as a JSON array (no markdown) with schema:
[
  {
    "topic_title": "string",
    "professor_prompt": "string",
    "student_1_name": "string",
    "student_1_response": "string",
    "student_2_name": "string",
    "student_2_response": "string",
    "model_answer": "string"
  }
]`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          { fileData: { fileUri: file.uri || "", mimeType: file.mimeType || "application/pdf" } }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json"
    }
  });

  const text = response.text;
  console.log("Raw Response:", text);
  
  if (!text) {
    console.error("No text returned from Gemini");
    return;
  }
  
  try {
    const tasks = JSON.parse(text);
    console.log(`Parsed ${tasks.length} tasks. Inserting...`);
    
    for (const t of tasks) {
      console.log(`Inserting: ${t.topic_title}`);
      await supabase.from('academic_tasks').insert(t);
    }
    console.log("Success!");
  } catch(e) {
    console.error("Parse/Insert failed", e);
  }
}

run();
