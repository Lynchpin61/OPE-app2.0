CREATE TABLE savedeval.reviews (
  id INT NOT NULL AUTO_INCREMENT,
  product_url TEXT,
  name VARCHAR(255) NOT NULL,
  stars INT,
  date_reviewed DATE NOT NULL,
  dateiso_scraped DATETIME NOT NULL,
  review TEXT,
  PRIMARY KEY (id),
  CONSTRAINT uc_review_unique UNIQUE (name, date_reviewed)
);


CREATE SCHEMA savedeval;

CREATE TABLE savedeval.`users` (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);