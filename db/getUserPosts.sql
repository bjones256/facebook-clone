Select * from posts
where user_id = $1
order by created_at desc