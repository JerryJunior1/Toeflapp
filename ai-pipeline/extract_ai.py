import os
import json
import time
# pyrefly: ignore [missing-import]
import google.generativeai as genai
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
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def extract_tasks():
    file_path = "D:/Toeflapp/DocToefl/DOC-20260607-WA0001_260611_181849.pdf"
    print(f"Uploading {file_path} to Gemini...")
    
    # Upload the file
    sample_file = genai.upload_file(path=file_path, display_name="TOEFL Tasks")
    
    print(f"Uploaded file '{sample_file.display_name}' as: {sample_file.uri}")
    
    # Choose a model (e.g. gemini-1.5-flash)
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    
    prompt = """
    This PDF contains a series of TOEFL Academic Discussion tasks. 
    Each task consists of:
    1. A numbered title (e.g. "1. To maintain good health")
    2. A table containing:
       - The Professor's prompt
       - The first student's response (e.g., Claire)
       - The second student's response (e.g., Paul)
    3. Below the table, there is an "Answer:" section with a model response.
    
    Please extract the FIRST 5 tasks from this PDF and return them strictly as a JSON array of objects with the following schema:
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
    
    Ensure all text is accurately transcribed from the images in the PDF. Do not include markdown formatting (like ```json), just the raw JSON array.
    """
    
    print("Generating content with Gemini... this may take a minute.")
    response = model.generate_content([sample_file, prompt])
    
    try:
        raw_text = response.text.strip()
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:-3].strip()
            
        tasks = json.loads(raw_text)
        print(f"Successfully extracted {len(tasks)} tasks.")
        
        # Insert into Supabase
        for task in tasks:
            print(f"Inserting: {task['topic_title']}")
            supabase.table('academic_tasks').insert(task).execute()
            
        print("Done!")
    except Exception as e:
        print("Failed to parse or insert JSON.")
        print(e)
        print("Raw response:")
        print(response.text)
        
    # Clean up file
    genai.delete_file(sample_file.name)

if __name__ == "__main__":
    extract_tasks()
