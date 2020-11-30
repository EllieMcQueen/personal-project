SELECT * FROM cust
JOIN macros ma on ma.cust_id = cust.id
JOIN measurements me on me.cust_id = cust.id
WHERE me.id = $1
