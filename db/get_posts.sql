select * from cust
inner join macros on cust.id = macros.cust_id
inner join measurements on macros.post_id = measurements.id
where cust.id = $1;