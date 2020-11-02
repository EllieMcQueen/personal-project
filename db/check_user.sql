select * from cust
inner join tdee on cust.id = tdee.cust_id
where email = $1;