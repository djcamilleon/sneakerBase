CREATE TABLE shoes (
  id SERIAL PRIMARY KEY,
  brand VARCHAR(255),
  model VARCHAR(255),
  nickname VARCHAR(255),
  colorway VARCHAR(255),
  primary_color VARCHAR(255),
  style_code VARCHAR(255),
  size VARCHAR(255),
  details TEXT,
  release_date VARCHAR(255),
  price VARCHAR(255),
  associated_athlete VARCHAR(255),
  forefoot_cushioning_technology TEXT,
  heel_cushioning_technology TEXT,
  type VARCHAR(255),
  user_id INTEGER
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  token TEXT
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  shoe_id INTEGER,
  feature TEXT
);

CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  url_1 TEXT,
  shoe_id INTEGER
);
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  photo_url TEXT,
  shoe_id INTEGER
);

-- insert into shoes (brand, model, nickname, colorway, primary_color, style_code, size, details, release_date, price, associated_athlete, forefoot_cushioning_technology, heel_cushioning_technology, type, user_id) 
-- values(

-- insert into users (google_id, first_name, last_name, token)
-- values

-- insert into features (shoe_id, feature)
-- values

-- insert into links (shoe_id, url_1)
-- values

-- insert into photos (photo_url, shoe_id)
-- values

