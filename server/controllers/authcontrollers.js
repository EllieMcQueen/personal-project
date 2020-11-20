const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");

    const { email, password } = req.body;

    const [user] = await db.check_user([email]);
    console.log(email, password, user);
    if (user) {
      return res.status(409).send("user already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const [newUser] = await db.register_user([email, hash]);
    console.log(newUser);
    req.session.cust = newUser;

    res.status(200).send(req.session.cust);
  },
  login: async (req, res) => {
    const { email, password } = req.body,
      db = req.app.get("db");
    //console.log (req.body)
    const [foundUser] = await db.check_user([email]);
    console.log(foundUser);
    if (!foundUser) {
      return res.status(400).send("Email is not found");
    }
    console.log(foundUser);
    const authenticated = bcrypt.compareSync(password, foundUser.password);
    if (!authenticated) {
      return res.status(401).send("Password is incorrect");
    }

    delete foundUser.password;
    console.log(foundUser);
    req.session.cust = foundUser;
    res.status(202).send(req.session.cust);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getUser: async (req, res) => {
    if (req.session.cust) {
      res.status(200).send(req.session.cust);
    } else {
      res.status(404).send("no session found");
    }
  },
  getPost: async (req, res) => {
    const db = req.app.get("db");
    const [posts] = await db.get_post();
    return res.status(200).send([posts]);
  },
  createProfile: async (req, res) => {
    const db = req.app.get("db");
    const { fname, age, gender, height} = req.body;
    const { id } = req.session.cust;
    console.log(req.body, id);
    await db.create_profile(fname, age, gender, height, id);
    res.sendStatus(200);
  },
  //   getUserPost: async (req, res) => {
  //     const { id, myPosts } = req.body;
  //     const{ searchString } = req.query
  //     console.log( req.body )
  //     const db = req.app.get("db");
  //     if (myPosts && searchString) {
  //       const [foundPosts] = await db.get_post_by_title([id]);
  //       res.status(200).send(foundPosts);
  //     } else if (!myPosts && !searchString) {
  //       console.log("first else if")
  //       const foundPosts = await db.get_posts();
  //       res.status(200).send(foundPosts);
  //     } else if (!myPosts && searchString) {
  //       const [foundPosts] = await db.get_title_not_auth([id]);
  //       res.status(200).send(notUser);
  //     } else {
  //       const [foundPosts] = await db.get_posts();
  //       res.status(200).send(getAll);
  //     }
  //   },
};
