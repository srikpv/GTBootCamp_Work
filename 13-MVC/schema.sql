-- DROP DATABASE IF EXISTS `burger_db`;
-- CREATE DATABASE `burger_db`;

use burger_db;
CREATE table burger (
	id int NOT NULL auto_increment,
    name varchar(50) NOT NULL, 
    devoured tinyint NOT NULL,
    primary key(id)
)