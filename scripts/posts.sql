CREATE TABLE purematch.posts
(
 postid serial PRIMARY KEY,
 updatetime timestamp default current_timestamp,
 userid integer not null,
 title varchar(500) not null,
 description varchar(3000)
);