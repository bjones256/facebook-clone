Select * from connections
where
connections.requester_id =$1
and
connections.is_active = false