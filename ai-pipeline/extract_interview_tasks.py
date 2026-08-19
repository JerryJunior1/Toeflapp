import os
import json
import time
import fitz  # PyMuPDF
# pyrefly: ignore [missing-import]
from google import genai
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv
# pyrefly: ignore [missing-import]
from supabase import create_client, Client

# Load environment variables
load_dotenv(dotenv_path="../toefl-app/.env.local")

# Supabase init
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Gemini init
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def extract_pdf_tasks(pdf_path, start_page=0):
    print(f"\nProcessing {os.path.basename(pdf_path)}...")
    doc = fitz.open(pdf_path)
    
    for page_num in range(start_page, len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text("text")
        
        if not text.strip():
            continue
            
        print(f"--- Extracting from page {page_num+1} ---")
        prompt = f"""
        This text contains a TOEFL Speaking Interview practice task. 
        It generally includes:
        1. A scenario introduction (e.g., "You are being interviewed for a documentary...")
        2. A set of questions asked by the interviewer (usually 3 or 4 questions).
        3. A model answer/response for each question.
        
        Extract the task(s) from the text. Sometimes a task spans multiple pages. If the page contains the start of a task, extract it. If it only contains the end of a previous task without a new scenario context, return an empty array [].

        RAW TEXT:
        {text}
        
        Return STRICTLY a JSON array of objects with the following schema:
        [
          {{
            "task_title": "A short descriptive title for the task (e.g. 'Sports in Society' or 'Hobbies')",
            "scenario_context": "The full introductory scenario string",
            "questions": [
               {{
                 "question": "The text of the question asked",
                 "model_response": "The text of the model answer provided"
               }}
            ]
          }}
        ]
        
        Ensure all text is accurately transcribed. Do not include markdown formatting (like ```json), just the raw JSON array.
        """
        
        try:
            response = client.models.generate_content(
                model='gemini-3.6-flash',
                contents=prompt
            )
            
            raw_text = response.text.strip()
            if raw_text.startswith("```json"):
                raw_text = raw_text[7:-3].strip()
            elif raw_text.startswith("```"):
                raw_text = raw_text[3:-3].strip()
                
            tasks = json.loads(raw_text)
            print(f"Extracted {len(tasks)} tasks.")
            
            category = 'Just Interview' if 'Real Questions and Answers' in pdf_path else 'TOEFL Format'
            
            for task in tasks:
                print(f"Inserting: {task['task_title']} ({category})")
                supabase.table('interview_tasks').insert({
                    "task_title": task['task_title'],
                    "scenario_context": task['scenario_context'],
                    "questions": task['questions'],
                    "category": category
                }).execute()
                
        except Exception as e:
            err_msg = str(e)
            print(f"Error on page {page_num + 1}: {err_msg}")
            if "429" in err_msg or "Resource has been exhausted" in err_msg:
                print("QUOTA EXHAUSTED! Please provide a new API key.")
                return False # Stop everything
            
        time.sleep(2) # Prevent rapid API bursts
    return True # Finished this PDF successfully

if __name__ == "__main__":
    pdf_paths = [
        "D:/Toeflapp/DocToefl/TOEFL_Speaking_Interview questions_260811_020759.pdf", # 0
        "D:/Toeflapp/DocToefl/Speaking- TF-AD_260608_201449.pdf", # 1 (processed up to page 10)
        "D:/Toeflapp/DocToefl/speaking- interview_260618_081243.pdf", # 2
        "D:/Toeflapp/DocToefl/Speaking- ETM-ET_260728_192233.pdf", # 3
        "D:/Toeflapp/DocToefl/TOEFL Speaking Practice Real Questions and Answers_260803_190227.pdf" # 4
    ]
    
    # We finished pdf_paths[1], pdf_paths[4], pdf_paths[0], and pdf_paths[2] completely!
    # Now we resume pdf_paths[3] from page 16
    extract_pdf_tasks(pdf_paths[3], start_page=16)

