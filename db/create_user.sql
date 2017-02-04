insert into users (google_id, first_name, last_name, token)
values ($1, $2, $3, $4)

returning (google_id, first_name, last_name, token);