INSERT INTO oauth_authorization_codes(authorization_code, expires_at, redirect_uri, client_id, user_id)
  VALUES(${authorization_code}, ${expires_at}, ${redirect_uri}, ${client_id}, (SELECT id from users WHERE uuid='${user_id}'))
  RETURNING *
