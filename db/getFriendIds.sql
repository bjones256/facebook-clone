Select users.id from  users
-- Select * from connections
JOIN connections ON 
connections.requester_id = users.id
OR
connections.requestee_id = users.id
where
(connections.requestee_id =$1
or
connections.requester_id =$1)
and
(users.id != $1
and
connections.is_active = true);
