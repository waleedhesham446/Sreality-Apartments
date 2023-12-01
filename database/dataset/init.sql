CREATE TABLE apartments (
  title TEXT,
  image_url TEXT
);

COPY apartments
FROM '/docker-entrypoint-initdb.d/apartments.csv'
DELIMITER ','
CSV HEADER;