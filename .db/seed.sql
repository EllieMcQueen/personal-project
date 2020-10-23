drop table if exists cust;
drop table if exists tdee;
drop table if exists progress;
create table if not exists cust (
    id serial primary key,
    name varchar(40),
    password text,
    profile_picture text
);

create table if not exists tdee (
    id serial primary key,
    weight decimal,
    height decimal,
    age decimal,
    lbm decimal,
    cust_id int references cust(id)
);

create table if not exists progress (
    id serial primary key,
    pic text,
    weight decimal,
    lbm decimal,
    cust_id int references cust(id),
    date varchar (20)
);

ALTER TABLE cust
ADD username varchar (50);

ALTER TABLE progress
ALTER column date TYPE DATE NOT NULL DEFAULT CURRENT_DATE;