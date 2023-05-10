CREATE TABLE purematch.users
(
 userid serial PRIMARY KEY,
 updatetime timestamp default current_timestamp,
 username varchar(500) not null,
 email varchar(500) not null,
 password varchar(500) not null
);