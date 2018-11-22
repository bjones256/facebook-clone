-- this will call onchange from search box 

SELECT * FROM users WHERE user_vectors @@ to_tsquery($1);