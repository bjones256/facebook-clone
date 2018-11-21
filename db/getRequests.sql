-- Select * from connections
-- where requestee_id = $1 AND status = 'sent'
Select connections.*, users.first_name, users.last_name, users.profile_img from connections
JOIN users ON 
users.id = connections.requester_id 
where requestee_id = $1 AND status = 'sent'