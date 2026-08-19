import os
import re
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv
# pyrefly: ignore [missing-import]
from supabase import create_client, Client
# pyrefly: ignore [missing-import]
from langchain_community.document_loaders import PyPDFLoader

# Load environment variables
load_dotenv(dotenv_path="../toefl-app/.env.local")

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not all([SUPABASE_URL, SUPABASE_KEY]):
    print("Missing Supabase credentials!")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def extract_tasks():
    file_path = "D:/Toeflapp/DocToefl/DOC-20260607-WA0001_260611_181849.pdf"
    print(f"Loading PDF: {file_path}")
    loader = PyPDFLoader(file_path)
    pages = loader.load()
    
    full_text = "\n".join([page.page_content for page in pages])
    
    # Split the document by numbers followed by a dot (e.g., "\n1. ", "\n2. ")
    raw_tasks = re.split(r'\n(?=\d+\.\s+[A-Z])', full_text)
    
    tasks_inserted = 0

    for i, raw_task in enumerate(raw_tasks):
        if i == 0 and not raw_task.strip().startswith("1."):
            continue # Skip title page / preamble
            
        try:
            # Extract Title
            title_match = re.search(r'^\d+\.\s*(.+)', raw_task, re.IGNORECASE)
            if not title_match:
                continue
            topic_title = title_match.group(1).strip()
            
            # Extract Professor
            prof_match = re.search(r'Professor[:\n\s]+(.*?)(?=\n[A-Z][a-z]+:)', raw_task, re.DOTALL)
            if not prof_match:
                # Sometimes the professor's name is "Professor Smith:" etc.
                prof_match = re.search(r'Professor\s*[a-zA-Z]*[:\n\s]+(.*?)(?=\n[A-Z][a-z]+:)', raw_task, re.DOTALL)
                
            if not prof_match:
                continue
            professor_prompt = prof_match.group(1).strip()
            
            # Extract Students (find all names before the "Answer:" block)
            # Find the section between the professor and "Answer:"
            students_section_match = re.search(r'Professor.*?[:\n\s]+.*?\n([A-Z][a-z]+:.*?)(?=Answer:)', raw_task, re.DOTALL)
            if not students_section_match:
                continue
            students_section = students_section_match.group(1)
            
            # Find all student names and their responses
            students = re.findall(r'^([A-Z][a-z]+):(.*?(?=\n[A-Z][a-z]+:|\Z))', students_section, re.DOTALL | re.MULTILINE)
            
            if len(students) < 2:
                continue
                
            s1_name, s1_response = students[0][0], students[0][1].strip()
            s2_name, s2_response = students[1][0], students[1][1].strip()
            
            # Extract Answer
            answer_match = re.search(r'Answer:\s*(.*)', raw_task, re.DOTALL | re.IGNORECASE)
            if not answer_match:
                continue
            model_answer = answer_match.group(1).strip()
            
            # Clean up newlines in text blocks
            topic_title = topic_title.replace('\n', ' ')
            professor_prompt = professor_prompt.replace('\n', ' ')
            s1_response = s1_response.replace('\n', ' ')
            s2_response = s2_response.replace('\n', ' ')
            model_answer = model_answer.replace('\n', ' ')
            
            print(f"Parsed task: {topic_title}")
            
            # Insert to Supabase
            data = {
                "topic_title": topic_title,
                "professor_prompt": professor_prompt,
                "student_1_name": s1_name,
                "student_1_response": s1_response,
                "student_2_name": s2_name,
                "student_2_response": s2_response,
                "model_answer": model_answer
            }
            
            res = supabase.table('academic_tasks').insert(data).execute()
            tasks_inserted += 1
            
        except Exception as e:
            print(f"Error parsing a task: {e}")
            
    print(f"Successfully inserted {tasks_inserted} tasks into the database.")

if __name__ == "__main__":
    extract_tasks()
