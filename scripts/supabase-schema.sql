-- ========================================================
-- TAXORA SUPABASE SCHEMA INITIALIZATION
-- Paste this script into your Supabase project SQL Editor
-- ========================================================

-- 1. Create Storage Bucket for official tax documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'tax-documents',
  'tax-documents',
  true,
  26214400, -- 25MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain']
)
ON CONFLICT (id) DO NOTHING;

-- Storage Bucket Policies
CREATE POLICY "Public Read on tax-documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'tax-documents');

CREATE POLICY "Public/Service Insert on tax-documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'tax-documents');

-- 2. Contributors Table (Nepal CAs, Auditors, and Tax Advisors)
CREATE TABLE IF NOT EXISTS tax_contributors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE,
  full_name TEXT NOT NULL,
  ican_number TEXT,
  firm_name TEXT,
  email TEXT NOT NULL UNIQUE,
  bio TEXT,
  linkedin_url TEXT,
  is_verified_ca BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Q&A Knowledge Base
CREATE TABLE IF NOT EXISTS tax_qa_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  short_topic TEXT NOT NULL,
  category TEXT NOT NULL CHECK (char_length(trim(category)) > 0),
  fiscal_year TEXT NOT NULL DEFAULT '2081/82',
  language TEXT NOT NULL CHECK (language IN ('en', 'np')),
  keywords TEXT[] DEFAULT '{}',
  answer TEXT NOT NULL,
  citations JSONB DEFAULT '[]',
  reasoning_steps TEXT[] DEFAULT '{}',
  rate_table JSONB,
  contributor_id UUID REFERENCES tax_contributors(id) ON DELETE SET NULL,
  is_anonymous BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('verified', 'pending_review', 'rejected')),
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Official Tax Reference Documents (PDFs & Directives)
CREATE TABLE IF NOT EXISTS tax_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('Directive', 'Circular', 'Act', 'Rule', 'Rajpatra', 'Precedent', 'Advisory Note')),
  issuing_authority TEXT NOT NULL,
  fiscal_year TEXT NOT NULL,
  file_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  summary TEXT,
  contributor_id UUID REFERENCES tax_contributors(id) ON DELETE SET NULL,
  is_anonymous BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('verified', 'pending_review', 'rejected')),
  download_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_tax_qa_category ON tax_qa_entries(category);
CREATE INDEX IF NOT EXISTS idx_tax_qa_language ON tax_qa_entries(language);
CREATE INDEX IF NOT EXISTS idx_tax_qa_status ON tax_qa_entries(status);
CREATE INDEX IF NOT EXISTS idx_tax_docs_type ON tax_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_tax_docs_status ON tax_documents(status);

-- Enable RLS
ALTER TABLE tax_qa_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_contributors ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read on verified QA" ON tax_qa_entries
  FOR SELECT USING (status = 'verified');

CREATE POLICY "Allow anonymous and auth insert on QA" ON tax_qa_entries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on verified Docs" ON tax_documents
  FOR SELECT USING (status = 'verified');

CREATE POLICY "Allow anonymous and auth insert on Docs" ON tax_documents
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on contributors" ON tax_contributors
  FOR SELECT USING (true);

CREATE POLICY "Allow upsert on contributors" ON tax_contributors
  FOR ALL USING (true);
