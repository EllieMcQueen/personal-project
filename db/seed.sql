
-- drop table if exists progress;
-- drop table if exists macros;
-- drop table if exists measurements;
-- drop table if exists initial;
-- drop table if exists cust;
-- create table if not exists cust (
--     id serial primary key,
--     email varchar(80),
--     password text
-- );
-- create table if not exists initial (
--     id serial primary key,
--     height decimal,
--     age decimal,
--     fname varchar(50),
--     gender varchar(6),
--     cust_id int references cust(id)
-- );


-- create table if not exists measurements ( 
--     id serial primary key,
--     ra decimal,
--     la decimal,
--     hw decimal,
--     lw decimal,
--     rl decimal,
--     ll decimal,
--     weight decimal,
--     Date date,
--     cust_id int references cust(id),
--     post_id int references initial(id)
-- );

-- create table if not exists progress (
--     id serial primary key,
--     pic text,
--     weight decimal,
--     Date date,
--     activity text,
--     cust_id int references cust(id)
-- );


-- create table if not exists macros (
--     id serial primary key,
--     calories decimal,
--     fats decimal,
--     carbs decimal,
--     protein decimal,
--     cust_id int references cust(id),
--     post_id int references initial(id)
--     );


-- alter table tdee
-- add column fname varchar(50)
--alter table tdee
--add column gender varchar(6)
--alter table measurements
--add column weight decimal
--alter table progress
--add column activity decimal
-- inner join tdee on cust.id = tdee.cust_id;
--select * from cust
--inner join measurements on cust.id = measurements.cust_id;
--inner join progress on cust.id = progress.cust_id;
--inner join macros on cust.id = macros.cust_id;