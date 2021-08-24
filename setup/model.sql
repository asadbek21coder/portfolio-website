-- create database potrfolio;

create table messages (
    id serial not null primary key,
    username varchar(64) not null,
    email varchar(100) not null,
    message text not null,
    created_at timestamp default current_timestamp
);



insert into messages (
    username,
    email,
    message
) values (
    'davron007',
    'davronbek@gmail.com',
    'salom hammaga men Davronbekman!'
);