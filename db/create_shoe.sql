insert into shoes (brand, model, nickname, colorway, primary_color, style_code, size, details, release_date, price, associated_athlete, forefoot_cushioning_technology, heel_cushioning_technology, type, user_id) 
values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
returning id;