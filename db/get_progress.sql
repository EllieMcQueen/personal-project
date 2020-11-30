select * from measurements
join macros on macros.id = measurements.id
where measurements.cust_id = $1;