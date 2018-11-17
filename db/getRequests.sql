Select * from connections
where requestee_id = $1 AND status = 'sent'