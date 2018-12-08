-- this will call onchange from search box 

-- SELECT * FROM users WHERE user_vectors @@ to_tsquery($1);
SELECT * FROM users 
where
LOWER(users.first_name) like LOWER($1)
limit 10

--  or 
-- users.last_name like ('J%')
;