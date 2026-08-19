-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Create a table for Scoring & Evaluation criteria (rubrics, grammar, etc.)
create table if not exists scoring_documents (
  id bigserial primary key,
  content text not null, -- The extracted text chunk
  metadata jsonb, -- Filename, page number, category
  embedding vector(768) -- Google Gemini embeddings are 768 dimensions
);

-- Create a table for Content Generation (practice topics, questions, etc.)
create table if not exists practice_documents (
  id bigserial primary key,
  content text not null,
  metadata jsonb,
  embedding vector(768)
);

-- Create a function to similarity search the scoring_documents table
create or replace function match_scoring_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    scoring_documents.id,
    scoring_documents.content,
    scoring_documents.metadata,
    1 - (scoring_documents.embedding <=> query_embedding) as similarity
  from scoring_documents
  where 1 - (scoring_documents.embedding <=> query_embedding) > match_threshold
  order by scoring_documents.embedding <=> query_embedding
  limit match_count;
$$;

-- Create a function to similarity search the practice_documents table
create or replace function match_practice_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    practice_documents.id,
    practice_documents.content,
    practice_documents.metadata,
    1 - (practice_documents.embedding <=> query_embedding) as similarity
  from practice_documents
  where 1 - (practice_documents.embedding <=> query_embedding) > match_threshold
  order by practice_documents.embedding <=> query_embedding
  limit match_count;
$$;
