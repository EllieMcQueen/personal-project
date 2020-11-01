drop table if exists cust;
drop table if exists tdee;
drop table if exists progress;
drop table if exists measurements;
create table if not exists cust (
    id serial primary key,
    email varchar(80),
    password text,
);

create table if not exists tdee (
    id serial primary key,
    weight decimal,
    height decimal,
    age decimal,
    bmi decimal,
    tdee decimal,
    cust_id int references cust(id),
    fname varchar(50),
    gender varchar(6)
);

create table if not exists measurements ( 
    ra decimal,
    la decimal,
    hw decimal,
    lw decimal,
    rl decimal,
    ll decimal,
    cust_id int references cust(id)
);

create table if not exists progress (
    id serial primary key,
    pic text,
    weight decimal,
    lbm decimal,
    Date date,
    cust_id int references cust(id)
    -- add activity level
);

-- alter table tdee
-- add column fname varchar(50)
--alter table tdee
--add column gender varchar(6)