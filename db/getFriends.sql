-- use id and return connections where id exists in either
-- the requester_id and requestee_id columns and _is_active
-- equals true
-- return the the friends data joined on the user_id that 
-- is not equal to currentUser id that is passed in from 
-- controller and id

-- Select * from connections
-- JOIN users ON 
-- users.id = connections.requester_id 
-- OR
-- users.id = connections.requestee_id
-- WHERE connections.is_active = true
-- AND
-- users.id != $1

-- Select * from connections
-- JOIN users ON 
-- users.id = connections.requester_id 
-- OR
-- users.id = connections.requestee_id
-- WHERE
-- users.id != 2
-- OR
-- connections.requestee_id = 2
-- OR
-- connections.requester_id = 2
-- AND
-- connections.is_active = true;

Select * from connections
JOIN users ON 
users.id = connections.requester_id 
OR
users.id = connections.requestee_id
where
(connections.requestee_id =$1
or
connections.requester_id =$1)
and
(users.id != $1
and
connections.is_active = true);

-- ^^^ I beleive this is working properly ^^^
-- Actually no i don't think it is.  Below is some other code that most works but isn't filtering out current users profile
-- Seems to work on everyone but id=1
-- Select * from connections
-- JOIN users ON 
-- users.id = connections.requester_id 
-- OR
-- users.id = connections.requestee_id
-- WHERE
-- users.id != 1
-- AND
-- connections.is_active = true
-- AND
-- connections.requestee_id = 1
-- OR
-- connections.requester_id = 1


-- SELECT posts.*, users.first_name as author, users.id
-- FROM posts 
-- --
-- JOIN users ON users.id = posts.user_id
-- -- bring back this users posts
-- WHERE posts.user_id = ${user_id}