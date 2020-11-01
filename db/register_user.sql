INSERT INTO cust (email, password)
VALUES ($1, $2)

returning id, email;