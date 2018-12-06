-- create table comments(
-- id serial primary key,
-- post_id INTEGER REFERENCES posts(id),
-- user_id INTEGER REFERENCES users(id),
-- text_content text,
-- img text,
-- created_at BIGINT 
-- )

INSERT INTO comments ( user_id, post_id, img, text_content, created_at) 
VALUES (${user_id}, ${post_id}, ${img}, ${text_content}, ${created_at});