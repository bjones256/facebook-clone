-- get all posts where posts.user_id is equal to
    -- either requester or requestee column value is eqaul to user id
    -- and is_active is true
    -- in connection table
    --^^^have to create connection before ^^^
-- select*from 
-- posts
-- order by created_at desc

SELECT p.*, u.first_name, u.last_name, u.profile_img,u.id, p.id
FROM posts p
JOIN users u ON u.id = p.user_id
order by created_at desc;

-- SELECT p.*, u.first_name, u.last_name, u.profile_img, p.id
-- FROM posts p
-- JOIN users u ON u.id = p.user_id
-- order by created_at desc;

-- SELECT p.*, u.first_name as post_author_first, u.last_name as post_author_last, u.profile_img as post_author_img,u.id as post_author, p.id as post_id, c.user_id as commenter_id,c.text_content as comment,uc.profile_img as comment_author_img, uc.first_name as comment_author_first, uc.last_name as comment_author_last, c.created_at as comment_date
-- FROM posts p
-- JOIN users u ON u.id = p.user_id
-- JOIN comments c on c.post_id = p.id
-- JOIN users uc on uc.id = c.user_id
-- order by p.created_at desc;