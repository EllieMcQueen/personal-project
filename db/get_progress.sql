SELECT * FROM progress
WHERE cust_id = $1;
SELECT * FROM measurements 
WHERE cust_id = $1;
SELECT * FROM macros
WHERE cust_id = $1;