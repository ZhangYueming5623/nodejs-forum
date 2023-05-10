CREATE TABLE purematch.postpics
(
    id serial PRIMARY KEY,
    postid int not null,
    pic_name varchar(500) not null,
    bucketkey varchar(500) not null
);