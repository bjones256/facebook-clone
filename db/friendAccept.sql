UPDATE connections 
SET  (is_active, status) = (${is_active}, ${status})
WHERE id = ${id}