INSERT INTO users(uuid, username, email, pswd)
  VALUES(${uuid}, ${username}, ${email}, ${pswd})
  RETURNING *
