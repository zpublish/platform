CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  pswd TEXT NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  joined_on timestamptz NOT NULL DEFAULT now()
);
