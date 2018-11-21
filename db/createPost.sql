INSERT INTO posts (user_id, img, text_content, created_at) 
VALUES (${user_id}, ${img}, ${text_content}, ${created_at});

-- get all post data from posts
SELECT posts.*, users.first_name as author, users.id
FROM posts 
--
JOIN users ON users.id = posts.user_id
-- bring back this users posts
WHERE posts.user_id = ${user_id}
