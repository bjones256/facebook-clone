INSERT INTO users (first_name, last_name, email, hash, phone, profile_img)
VALUES (${first_name}, ${last_name}, ${email}, ${hash}, ${phone}, ${profile_img})
RETURNING *;

-- create seach vector
UPDATE 
    users

SET 
    user_vectors = (to_tsvector(first_name) || to_tsvector(last_name) || to_tsvector(email) || to_tsvector(phone))