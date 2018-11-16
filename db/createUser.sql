INSERT INTO users (first_name, last_name, email, hash, phone, profile_img)
VALUES (${first_name}, ${last_name}, ${email}, ${hash}, ${phone}, ${profile_img})
RETURNING *;