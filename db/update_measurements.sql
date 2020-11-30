insert into measurements (ra, la, hw, lw, rl, ll, weight, date, cust_id)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning *