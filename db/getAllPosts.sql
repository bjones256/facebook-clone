-- get all posts where posts.user_id is equal to
    -- either requester or requestee column value is eqaul to user id
    -- and is_active is true
    -- in connection table
    --^^^have to create connection before ^^^
-- select*from 
-- posts
-- order by created_at desc
SELECT p.*, u.first_name, u.last_name, u.profile_img
FROM posts p
JOIN users u ON u.id = p.user_id
order by created_at desc;