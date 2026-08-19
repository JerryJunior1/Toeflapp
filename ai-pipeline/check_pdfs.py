import fitz
import sys

def dump_pdf_text(pdf_path, num_pages=2):
    print(f"\n--- DUMPING: {pdf_path} ---")
    try:
        doc = fitz.open(pdf_path)
        for i in range(min(num_pages, len(doc))):
            page = doc.load_page(i)
            text = page.get_text("text")
            print(f"--- Page {i+1} ---")
            print(text[:1500]) # First 1500 chars
            print("...")
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")

pdfs = [
    r"D:\Toeflapp\DocToefl\TOEFL_Speaking_Interview questions_260811_020759.pdf",
    r"D:\Toeflapp\DocToefl\Speaking- TF-AD_260608_201449.pdf",
    r"D:\Toeflapp\DocToefl\TOEFL Speaking Practice Real Questions and Answers_260803_190227.pdf"
]

for p in pdfs:
    dump_pdf_text(p)
