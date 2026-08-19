import os
import glob
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv
# pyrefly: ignore [missing-import]
from langchain_community.document_loaders import PyPDFLoader
# pyrefly: ignore [missing-import]
from langchain_text_splitters import RecursiveCharacterTextSplitter
# pyrefly: ignore [missing-import]
from sentence_transformers import SentenceTransformer
# pyrefly: ignore [missing-import]
from supabase import create_client, Client

# Load environment variables from Next.js project
load_dotenv(dotenv_path="../toefl-app/.env.local")

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not all([SUPABASE_URL, SUPABASE_KEY]):
    print("Missing Supabase environment variables.")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Use a local, open-source embedding model that produces 768-dimensional vectors
# This matches our Supabase pgvector(768) schema and completely avoids API errors/rate limits
print("Loading local embedding model (all-mpnet-base-v2)...")
embeddings_model = SentenceTransformer("all-mpnet-base-v2")

# Classify files based on filename keywords for simplicity
# If a filename contains 'grammar', 'rubric', 'mechanics', 'overview', etc., it goes to scoring_documents.
SCORING_KEYWORDS = ["grammar", "mechanics", "overview", "rubric", "collocation", "reasoning", "mechanics", "rules"]

def is_scoring_doc(filename):
    lower_name = filename.lower()
    for kw in SCORING_KEYWORDS:
        if kw in lower_name:
            return True
    return False

def ingest_pdfs():
    pdf_files = glob.glob("D:/Toeflapp/DocToefl/*.pdf")
    
    # Split text into chunks to not exceed AI context and allow accurate searching
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )

    for file_path in pdf_files:
        filename = os.path.basename(file_path)
        print(f"\nProcessing: {filename}")
        
        try:
            loader = PyPDFLoader(file_path)
            pages = loader.load()
            chunks = text_splitter.split_documents(pages)
            
            # Determine which table to use
            table_name = "scoring_documents" if is_scoring_doc(filename) else "practice_documents"
            
            success_count = 0
            for i, chunk in enumerate(chunks):
                # Generate embedding vector using sentence-transformers
                embedding = embeddings_model.encode(chunk.page_content).tolist()
                
                # Insert into Supabase
                data = {
                    "content": chunk.page_content,
                    "metadata": {"filename": filename, "page": chunk.metadata.get("page", 0)},
                    "embedding": embedding
                }
                
                res = supabase.table(table_name).insert(data).execute()
                success_count += 1
                
            print(f"Successfully embedded and stored {success_count} chunks into {table_name}")
            
        except Exception as e:
            print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    print("Starting ingestion pipeline...")
    ingest_pdfs()
    print("\nIngestion complete!")
