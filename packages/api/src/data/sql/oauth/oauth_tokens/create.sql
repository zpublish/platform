CREATE TABLE oauth_tokens (
  id SERIAL PRIMARY KEY,
  access_token TEXT NOT NULL,
  access_token_expires_on timestamp without time zone NOT NULL,
  client_id TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  refresh_token_expires_on timestamp without time zone NOT NULL,
  scope TEXT,
  user_id INTEGER NOT NULL REFERENCES users(id)
);
