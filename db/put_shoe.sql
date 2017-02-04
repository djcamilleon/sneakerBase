update shoes 
set brand = $2, model = $3, nickname = $4, colorway = $5, primary_color = $6, details = $7, release_date = $8, price = $9, associated_athlete = $10, forefoot_cushioning_technology = $11, heel_cushioning_technology = $12, type = $13
where id = $1;