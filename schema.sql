CREATE TABLE shoes (
  id SERIAL PRIMARY KEY,
  brand VARCHAR(255),
  display_model VARCHAR(255),
  sort_model VARCHAR(255),
  nickname VARCHAR(255),
  colorway VARCHAR(255),
  primary_color VARCHAR(255),
  accent_color1 VARCHAR(255),
  accent_color2 VARCHAR(255),
  link_nickname VARCHAR(255),
  style_code VARCHAR(255),
  size VARCHAR(255),
  designer VARCHAR(255),
  model_details TEXT,
  colorway_details TEXT,
  release_date VARCHAR(255),
  price VARCHAR(255),
  associated_athlete VARCHAR(255),
  forefoot_cushioning_technology TEXT,
  heel_cushioning_technology TEXT,
  type VARCHAR(255),
  user_id INTEGER
);

insert into shoes (brand, display_model, sort_model, nickname, colorway, primary_color, accent_color1, accent_color2, lonk_nickname, style_code, size, designer, model_details, colorway_details, release_date,price, associated_athlete, forefoot_cushioning_technology, heel_cushioning_technology, type, user_id) 
values

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  shoe_id INTEGER,
  feature TEXT
);

insert into features (shoe_id, feature)
values

CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  url_1 TEXT,
  shoe_id INTEGER
);

insert into links (shoe_id, url_1)
values

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  photo_url TEXT,
  shoe_id INTEGER
);

insert into photos (photo_url, shoe_id)
values

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  token TEXT
);

insert into users (google_id, first_name, last_name, token)
values