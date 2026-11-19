-- ========================================================
-- TAXORA MIGRATION: Custom Q&A Categories + Unique Contributor Email
-- Run this in Supabase SQL Editor if your database was initialized
-- with the earlier category enum constraint.
-- ========================================================

-- 1. Allow "Income Tax" and contributor-defined custom categories
ALTER TABLE tax_qa_entries
  DROP CONSTRAINT IF EXISTS tax_qa_entries_category_check;

ALTER TABLE tax_qa_entries
  DROP CONSTRAINT IF EXISTS tax_qa_entries_category_nonempty_check;

ALTER TABLE tax_qa_entries
  ADD CONSTRAINT tax_qa_entries_category_nonempty_check
  CHECK (char_length(trim(category)) > 0);

-- 2. Ensure contributor email supports upsert conflict resolution
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'tax_contributors'::regclass
      AND contype = 'u'
      AND conname = 'tax_contributors_email_key'
  ) THEN
    ALTER TABLE tax_contributors
      ADD CONSTRAINT tax_contributors_email_key UNIQUE (email);
  END IF;
END $$;
