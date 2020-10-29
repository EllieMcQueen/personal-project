const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { emaail, password } = req.body,
      db = req.app.get("db");

    const [cust] = await db.check_user([email]);
    if (cust) {
      return res.status(400).send("Username already in use");
    }

    let salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt);

    // const profile_picture = `https://robohash.org/${username}?set=set3`;

    const [newCust] = await db.register_user([email, hash]);
    req.session.cust = newCust;
    res.status(201).send(req.session.cust);
  },
  login: async (req, res) => {
    const { email, password } = req.body,
      db = req.app.get("db");

    const [foundCust] = await db.check_user([email]);
    if (!foundCust) {
      return res.status(400).send("Username is not found");
    }

    const authenticated = bcrypt.compareSync(password, foundCust.password);
    if (!authenticated) {
      return res.status(401).send("Password is incorrect");
    }

    delete foundCust.password;
    req.session.cust = foundCust;
    res.status(202).send(req.session.cust);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }
};