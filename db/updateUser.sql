UPDATE users
set (email, first_name, last_name, phone, profile_img) = (${email},${first_name},${last_name},${phone},${profile_img})
where id = ${id};
select * from users
WHERE id = ${id};