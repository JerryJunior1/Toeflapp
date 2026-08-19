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

def extract_page(page_num, image_path):
    print(f"\nProcessing page {page_num + 1}...")
    
    # Upload image
    file = client.files.upload(file=image_path, config={'display_name': f'Page {page_num+1}'})
    
    prompt = """
    This image contains a TOEFL Email Writing task. 
    It usually includes:
    1. A topic category (e.g., "TRAVEL & LEISURE")
    2. A task title/number (e.g., "Task 1 of 40" or just "Task 1")
    3. A Prompt Scenario (e.g., "You and your friend, John, are planning a trip...")
    4. Instructions with bullet points (e.g., "In your email, do the following: ...")
    5. A Model Response (the full text of the email including To, Subject, and body)
    
    Extract the task(s) on this page. If a task starts on this page but continues to the next, extract what you can, but ideally focus on tasks that START on this page. If the page only has the ending of a task, return an empty array [].
    
    Return strictly a JSON array of objects with the following schema:
    [
      {
        "topic_category": "string",
        "task_title": "string",
        "prompt_scenario": "string",
        "prompt_instructions": "string (include the bullet points)",
        "model_response": "string"
      }
    ]
    
    Ensure all text is accurately transcribed. Do not include markdown formatting (like ```json), just the raw JSON array.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-3.6-flash',
            contents=[file, prompt]
        )
        
        raw_text = response.text.strip()
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:-3].strip()
        elif raw_text.startswith("```"):
            raw_text = raw_text[3:-3].strip()
            
        tasks = json.loads(raw_text)
        print(f"Extracted {len(tasks)} tasks from page {page_num + 1}.")
        
        for task in tasks:
            print(f"Inserting: {task['task_title']} | {task['topic_category']}")
            supabase.table('email_tasks').insert({
                "topic_category": task['topic_category'],
                "task_title": task['task_title'],
                "prompt_scenario": task['prompt_scenario'],
                "prompt_instructions": task['prompt_instructions'],
                "model_response": task['model_response']
            }).execute()
            
    except Exception as e:
        print(f"Error on page {page_num + 1}: {e}")

if __name__ == "__main__":
    # Choose which PDF to process
    # pdf_path = "D:/Toeflapp/DocToefl/UPDATED TOEFL Email Writing_260811_225644.pdf"
    pdf_path = "D:/Toeflapp/DocToefl/writing- email_260628_190525.pdf"
    
    doc = fitz.open(pdf_path)
    
    # ADJUST STARTING RANGE HERE BASED ON QUOTA LIMITS
    # We need to process pages 0 and 5 (which failed with 503) and 13-17 (which were unextracted)
    pages_to_process = [0, 5, 13, 14, 15, 16, 17]
    for page_num in pages_to_process:
        page = doc.load_page(page_num)
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
        img_path = f"temp_email_page_{page_num}.png"
        pix.save(img_path)
        
        extract_page(page_num, img_path)
        
        # Cleanup
        if os.path.exists(img_path):
            os.remove(img_path)
            
        time.sleep(2) # Prevent rapid API bursts
