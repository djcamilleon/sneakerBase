insert into features (shoe_id, feature)
values ($1, $2)
returning *;


-- insert into links (url_1, shoe_id)
-- values ($1, $2, $3);

-- insert into photos (photo_url, shoe_id)
-- values ($1, $2, $3, $4, $5);