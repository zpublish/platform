SELECT
  uuid
  username,
  joined_on,

  FROM users

  -- LEFT JOIN posts
  --   ON posts.user_id = users.id
  WHERE id = $1;
