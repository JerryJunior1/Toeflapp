import fitz

def extract(pdf_path, out_path):
    doc = fitz.open(pdf_path)
    with open(out_path, 'w', encoding='utf-8') as f:
        for i in range(min(5, len(doc))):
            f.write(f"--- PAGE {i} ---\n")
            f.write(doc[i].get_text())
            f.write("\n")

extract('D:/Toeflapp/DocToefl/UPDATED TOEFL Email Writing_260811_225644.pdf', 'pdf1.txt')
extract('D:/Toeflapp/DocToefl/writing- email_260628_190525.pdf', 'pdf2.txt')
