-- drop table if EXISTS  url;

CREATE  TABLE if not exists url
(
  id  SERIAL PRIMARY KEY,
  url VARCHAR NOT NULL
);
