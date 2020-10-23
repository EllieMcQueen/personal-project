const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body,
      db = req.app.get("db");

    const [user] = await db.check_user([username]);
    if (user) {
      return res.status(400).send("Username already in use");
    }

    let salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt);

    const profile_picture = `https://robohash.org/${username}?set=set3`;

    const [newUser] = await db.register_user([username, hash, profile_picture]);
    req.session.user = newUser;
    res.status(201).send(req.session.user);
  },
  login: async (req, res) => {
    const { username, password } = req.body,
      db = req.app.get("db");

    const [foundUser] = await db.check_user([username]);
    if (!foundUser) {
      return res.status(400).send("Username is not found");
    }

    const authenticated = bcrypt.compareSync(password, foundUser.password);
    if (!authenticated) {
      return res.status(401).send("Password is incorrect");
    }

    delete foundUser.password;
    req.session.user = foundUser;
    res.status(202).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }
};