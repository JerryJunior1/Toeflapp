import os
import json
import time
import fitz  # PyMuPDF
# pyrefly: ignore [missing-import]
from google import genai
# pyrefly: ignore [missing-import]
from google.genai import types
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
    This image contains a TOEFL Academic Discussion task. 
    It usually includes:
    1. A numbered title
    2. A table with the Professor's prompt and two student responses
    3. An "Answer:" section
    
    Extract the task(s) on this page. If a task starts on this page but continues to the next, extract what you can, but ideally focus on tasks that START on this page. If the page only has the ending of a task, return an empty array [].
    
    Return strictly a JSON array of objects with the following schema:
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
            print(f"Inserting: {task.get('topic_title', 'Unknown')}")
            supabase.table('academic_tasks').insert(task).execute()
            
    except Exception as e:
        print(f"Error on page {page_num + 1}: {e}")
        
    finally:
        # Cleanup
        client.files.delete(name=file.name)
        if os.path.exists(image_path):
            os.remove(image_path)

def main():
    pdf_path = "D:/Toeflapp/DocToefl/DOC-20260607-WA0001_260611_181849.pdf"
    doc = fitz.open(pdf_path)
    
    for page_num in range(105, len(doc)):
        page = doc.load_page(page_num)
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2)) # High resolution
        img_path = f"temp_page_{page_num}.png"
        pix.save(img_path)
        
        extract_page(page_num, img_path)
        
        # Respect rate limits
        time.sleep(3)

if __name__ == "__main__":
    main()
