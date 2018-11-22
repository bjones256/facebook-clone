SELECT p.*, u.first_name, u.last_name, u.profile_img
FROM posts p
JOIN users u ON u.id = p.user_id
where user_id = $1
order by created_at desc



-- SELECT p.*, u.first_name, u.last_name, u.profile_img
-- FROM posts p
-- JOIN users u ON u.id = p.user_id
-- order by created_at desc;