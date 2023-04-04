DROP TABLE posts;
DROP TABLE users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login text UNIQUE,
    password text
);

CREATE TABLE posts (
    id SERIAL,
    user_id integer REFERENCES users (id),
    date timestamp,
    value text
);