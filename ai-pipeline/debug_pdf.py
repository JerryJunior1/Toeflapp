from langchain_community.document_loaders import PyPDFLoader
import re

loader = PyPDFLoader('D:/Toeflapp/DocToefl/DOC-20260607-WA0001_260611_181849.pdf')
pages = loader.load()
full_text = "\n".join([p.page_content for p in pages])
print("First 1000 characters:\n", full_text[:1000])

raw_tasks = re.split(r'\n(?=\d+\.\s+[A-Z])', full_text)
print(f"Split into {len(raw_tasks)} raw tasks.")

if len(raw_tasks) > 1:
    print("\n--- FIRST MATCHED TASK ---")
    print(raw_tasks[1][:500])
