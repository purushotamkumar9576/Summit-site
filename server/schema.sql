CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  goal TEXT NOT NULL CHECK (goal IN ('meetings', 'podcast', 'repeat')),
  status TEXT NOT NULL DEFAULT 'new',
  source TEXT NOT NULL DEFAULT 'summit-site',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS leads_email_unique ON leads (LOWER(email));
