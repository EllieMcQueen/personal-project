select * from cust
inner join macros on cust.id = macros.cust_id
inner join measurements on macros.post_id = measurements.id
where cust.id = $1;


-- select * from measurements
-- join macros on macros.cust_id = measurements.cust_id
-- where measurements.cust_id = $1;