delete from comments
where id = $1;
-- SELECT c.*, u.first_name, u.last_name,u.profile_img
-- from comments c
-- join users u on u.id = c.user_id 
