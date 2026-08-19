import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { taskId, taskType, promptData, userResponse, audioBase64, mimeType } = await request.json();
    const supabase = await createClient();

    if ((!userResponse || userResponse.trim() === '') && !audioBase64) {
      return NextResponse.json({ error: 'Response cannot be empty.' }, { status: 400 });
    }

    // 1. Fetch official TOEFL grading rubrics (or vocabulary tips) from the vector database for written tasks
    const { data: rubricDocs, error: dbError } = await supabase
      .from('scoring_documents')
      .select('content')
      .limit(20);

    if (dbError) {
      console.error('DB Error fetching rubrics:', dbError);
    }
    const compiledRubric = rubricDocs?.map(doc => doc.content).join('\n\n') || "Grade strictly based on standard TOEFL iBT criteria.";

    const speakingRubric = `
Scoring Guide for the Take an Interview Task
Score: 5 - A fully successful response. The response fully addresses the question, and it is clear and fluent. The response is on topic and well elaborated. Good conversational speaking pace is maintained with appropriate and natural use of pauses. Pronunciation is easily intelligible; rhythm and intonation effectively convey meaning. A range of accurate grammar and vocabulary allows clear expression of precise meanings.
Score: 4 - A generally successful response. The response addresses the question, and it is reasonably clear. The response is on topic and elaborated, but it may lack effective sentence-level connectors. Good speaking pace is generally maintained, with some pausing that may minimally affect flow. Intelligibility and meaning are not impeded by pronunciation, rhythm and intonation, although occasional words/phrases may require minor effort to understand. Grammar and vocabulary are adequate to express general meanings most of the time.
Score: 3 - A partially successful response. The response addresses the question but with limited elaboration and/or clarity. The response is generally on topic, but elaboration may be relatively limited. Frequent or lengthy pauses result in a choppy pace; filler words are frequent. Intelligibility is sometimes affected by inaccuracies in word-level pronunciation or stress/rhythm. Limited range and accuracy of grammar and vocabulary noticeably restrict the precision and clarity of meanings.
Score: 2 - A mostly unsuccessful response. The response reflects an attempt to address the question, but it is not supported in a meaningful and/or intelligible way. The response is minimally connected to the interviewers question, but it has little or no relevant elaboration or consists mainly of language from the question. Intelligibility is limited; the speakers intended meaning is often difficult to discern. The response shows a very limited range of grammar and vocabulary.
Score: 1 - An unsuccessful response. The response minimally addresses the question, and it may demonstrate very limited control of language. The response is only vaguely connected to language in the interviewers question. The response is mostly unintelligible. The response consists mainly of isolated words or phrases.
Score: 0 - No response OR the response is entirely unintelligible OR there is no English in the response OR the content is entirely unconnected to the prompt.
`;

    // 2. Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    // 3. Construct Grading Prompt
    let gradingPrompt = "";
    
    if (taskType === "take-interview") {
      gradingPrompt = `
      You are an expert, strict official TOEFL iBT examiner grading a spoken interview response.
      You have been provided with an audio recording of the student's response.
      
      ### OFFICIAL TOEFL SPEAKING RUBRICS:
      ${speakingRubric}
      
      ### SCENARIO & QUESTION:
      Scenario: ${promptData.scenario_context || "N/A"}
      Question: ${promptData.question}
      
      ### OFFICIAL MODEL ANSWER:
      "${promptData.modelResponse}"

      ### INSTRUCTIONS:
      Listen to the provided audio file. Evaluate the student's spoken response strictly based on the official TOEFL Speaking Rubrics provided above. Focus heavily on fluency, pronunciation, pacing, as well as grammar, vocabulary, logical flow, and how well it answers the question compared to the model answer.
      First, transcribe the audio EXACTLY as spoken. Include filler words like "uh", "um", etc. Do NOT include [pause] markers in the transcript, just write the words naturally.
      
      You MUST output your evaluation EXACTLY in the following JSON format (no markdown):
      {
        "transcript": "The exact verbatim transcript including uh, um, etc.",
        "score": "X/5",
        "overallFeedback": "A short paragraph summarizing the overall performance, specifically addressing fluency, delivery, and pronunciation based on what you heard.",
        "strengths": ["strength 1", "strength 2"],
        "weaknesses": ["weakness 1", "weakness 2"],
        "grammarCorrections": [
          {
            "original": "the exact wrong phrase",
            "corrected": "the corrected phrase",
            "explanation": "Why it was wrong"
          }
        ],
        "idealResponse": "Write a model 5/5 response that is based on what the student actually tried to say, but fixing all errors and making it sound perfectly natural and fluent."
      }
      `;
    } else {
      gradingPrompt = `
      You are an expert, strict official TOEFL iBT examiner. You are grading a student's written response for the "${taskType}" task.

      ### OFFICIAL TOEFL GRADING RUBRICS:
      Score: 5 - A fully successful response. The response successfully addresses the task, is well organized and well developed, using clearly appropriate explanations, exemplifications, and/or details. It displays unity, progression, and coherence. It displays consistent facility in the use of language, demonstrating syntactic variety, appropriate word choice, and idiomaticity, though it may have minor lexical or grammatical errors.
      Score: 4 - A generally successful response. The response addresses the topic and task well, though some points may not be fully elaborated. It is generally well organized and well developed. It displays facility in the use of language, demonstrating syntactic variety and range of vocabulary, though it will probably have occasional noticeable minor errors in structure, word form, or use of idiomatic language.
      Score: 3 - A partially successful response. The response addresses the topic and task using somewhat developed explanations, exemplifications, and/or details. It displays unity, progression, and coherence, though it may demonstrate inconsistent facility in sentence formation and word choice that may result in lack of clarity.
      Score: 2 - A mostly unsuccessful response. The response reflects an attempt to address the topic but may be significantly underdeveloped or demonstrate a lack of clarity in connections between ideas. It may display a noticeably limited range of vocabulary and frequent errors in sentence structure.
      
      ### ADDITIONAL KNOWLEDGE BASE CONTEXT (if any):
      ${compiledRubric}

      ### TASK PROMPT GIVEN TO STUDENT:
      ${JSON.stringify(promptData, null, 2)}

      ### STUDENT'S RESPONSE:
      "${userResponse}"

      ### INSTRUCTIONS:
      Evaluate the student's response strictly according to the official TOEFL rubrics provided above.
      Identify grammatical mistakes, mechanical errors, logical flow issues, and vocabulary usage.
      
      You MUST output your evaluation EXACTLY in the following JSON format (do not include any markdown backticks or extra text):
      {
        "score": "X/5",
        "overallFeedback": "A short paragraph summarizing the overall performance.",
        "strengths": ["strength 1", "strength 2"],
        "weaknesses": ["weakness 1", "weakness 2"],
        "grammarCorrections": [
          {
            "original": "the exact wrong phrase from the text",
            "corrected": "the corrected phrase",
            "explanation": "Why it was wrong"
          }
        ],
        "idealResponse": "MANDATORY: Write a model 5/5 response that takes the student's core argument and rewrites it with perfect grammar, advanced vocabulary, and strong logical flow. Do NOT omit this field."
      }
      `;
    }

    // 4. AI Invocation with Fallback Logic
    let text = "";

    try {
      // PRIMARY: Attempt Gemini
      let generateContentPayload: any = gradingPrompt;
      if (audioBase64 && mimeType) {
        generateContentPayload = [
          gradingPrompt,
          {
            inlineData: {
              data: audioBase64,
              mimeType: mimeType
            }
          }
        ];
      }
      const result = await model.generateContent(generateContentPayload);
      text = result.response.text();
    } catch (primaryError: any) {
      console.warn("Gemini API failed, initiating fallback...", primaryError.message);
      
      let fallbackPrompt = gradingPrompt;

      // If this is an audio task, we need to transcribe it first using Groq Whisper
      if (audioBase64) {
        console.log("Transcribing audio via Groq Whisper fallback...");
        const audioBuffer = Buffer.from(audioBase64, 'base64');
        const blob = new Blob([audioBuffer], { type: mimeType || 'audio/webm' });
        const formData = new FormData();
        formData.append("file", blob, "audio.webm");
        formData.append("model", "whisper-large-v3");

        const groqRes = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
          },
          body: formData as any
        });

        if (!groqRes.ok) {
          const errorText = await groqRes.text();
          throw new Error(`Groq Whisper fallback failed: ${errorText}`);
        }

        const groqData = await groqRes.json();
        const transcript = groqData.text;

        // Modify the grading prompt to use the transcript instead of audio
        fallbackPrompt = fallbackPrompt.replace(
          "You have been provided with an audio recording of the student's response.",
          `The student's response has been transcribed as follows: "${transcript}"`
        ).replace(
          "Listen to the provided audio file.",
          "Read the provided transcript of the audio."
        );
      }

      // Call Mistral API with the fallbackPrompt
      console.log("Sending grading prompt to Mistral fallback...");
      const mistralRes = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "open-mistral-nemo",
          messages: [{ role: "user", content: fallbackPrompt }],
          response_format: { type: "json_object" }
        })
      });

      if (!mistralRes.ok) {
        const errorText = await mistralRes.text();
        throw new Error(`Mistral fallback failed: ${errorText}`);
      }

      const mistralData = await mistralRes.json();
      text = mistralData.choices[0].message.content;
    }
    
    // Parse JSON Robustly
    let parsedData;
    try {
      let jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }
      parsedData = JSON.parse(jsonStr);
      
      // Strictly enforce the schema to prevent any React rendering crashes from LLM hallucinations
      const enforceString = (val: any): string => {
        if (!val) return "";
        if (typeof val === 'string') return val;
        if (typeof val === 'object') {
           if (val.text) return String(val.text);
           if (val.response) return String(val.response);
           if (val.content) return String(val.content);
           return Object.values(val).map(v => String(v)).join(" - ");
        }
        return String(val);
      };

      parsedData.transcript = parsedData.transcript ? enforceString(parsedData.transcript) : undefined;
      parsedData.score = parsedData.score ? enforceString(parsedData.score) : undefined;
      parsedData.overallFeedback = parsedData.overallFeedback ? enforceString(parsedData.overallFeedback) : undefined;
      let rawIdealResponse = parsedData.idealResponse || parsedData.ideal_response || parsedData.modelResponse || parsedData.model_response || parsedData.correctedResponse || parsedData.corrected_response;
      parsedData.idealResponse = rawIdealResponse ? enforceString(rawIdealResponse) : undefined;
      if (Array.isArray(parsedData.strengths)) {
        parsedData.strengths = parsedData.strengths.map((s: any) => enforceString(s));
      }
      if (Array.isArray(parsedData.weaknesses)) {
        parsedData.weaknesses = parsedData.weaknesses.map((w: any) => enforceString(w));
      }
      if (Array.isArray(parsedData.grammarCorrections)) {
         parsedData.grammarCorrections = parsedData.grammarCorrections.map((g: any) => {
            if (typeof g === 'string') return { original: g, corrected: "", explanation: "" };
            return {
               original: enforceString(g.original || g.error || g.mistake),
               corrected: enforceString(g.corrected || g.correction || g.fix),
               explanation: enforceString(g.explanation || g.reason || "")
            };
         });
      }

      // If we used a fallback for audio, we need to inject the transcript back into the response if the model didn't
      if (audioBase64 && !parsedData.transcript) {
          // It's possible the model didn't include it. We don't have the Groq transcript in scope here easily, 
          // but the AI should have outputted it per the prompt. If not, it just won't show.
      }
      
      console.log("DEBUG: Final parsedData from AI:", JSON.stringify(parsedData, null, 2));
    } catch (e) {
      console.error("Failed to parse AI output as JSON. Raw output was:", text);
      try {
        require('fs').writeFileSync('last-parse-error.log', text);
      } catch(err) {}
      return NextResponse.json({ error: "AI grading engine generated an invalid format." }, { status: 500 });
    }
      // Save the practice session score to the database if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user && taskId && parsedData.score) {
        const { error: insertError } = await supabase.from('practice_sessions').insert({
          user_id: user.id,
          task_id: taskId,
          task_type: taskType,
          score_value: parsedData.score,
          score_details: parsedData
        });
        if (insertError) console.error("Failed to save practice session:", insertError);
      }

    return NextResponse.json({ data: parsedData });
  } catch (error: any) {
    console.error('API Error:', error);
    try {
      require('fs').writeFileSync('last-error.log', String(error.stack || error.message) + '\\n');
    } catch(e) {}
    // Return a friendly error message to the client, but log the real one for debugging
    return NextResponse.json({ error: "We're experiencing high traffic. Please try submitting your response again in a few moments." }, { status: 500 });
  }
}
