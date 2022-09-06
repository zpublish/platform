CREATE TABLE oauth_authorization_codes (
  id SERIAL PRIMARY KEY,
  authorization_code TEXT NOT NULL,
  expires_at timestamptz NOT NULL DEFAULT now(),
  redirect_uri TEXT,
  client_id TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id)
);
