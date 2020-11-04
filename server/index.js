require("dotenv").config();
const path = require('path'),
      express = require("express"),
      massive = require("massive"),
      session = require("express-session"),
      ctrl = require("./controllers/controller"),
      auth = require("./controllers/authcontrollers"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  port = SERVER_PORT,
  app = express();

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

app.post("/api/register", auth.register);
app.post("/api/login", auth.login);
app.get("/api/logout", auth.logout);
app.post("/api/measure", ctrl.updateMeasurements);
app.post('/api/macros', ctrl.updateMacros);
// // //post endpoints
app.get("api/progress", ctrl.getProgress);
app.get("api/tdee", ctrl.getTdee);
app.get('/api/getInfo', ctrl.getInfo)
// app.get('api/getMeasurements', ctrl.getMeasurements)
app.get('/api/getCustInfo', ctrl.getCustInfo)
app.post("/api/post", ctrl.createProgress);
app.get("/api/auth", auth.getUser);
app.post('/api/profile', auth.createProfile);
//app.post('/api/macros', ctrl.createMacros);

//app.get('/api/getnewmacros', ctrl.getNewMacros);
// app.delete("/api/post", ctrl.deletePost);
// app.get("/api/posts", ctrl.getPost);
// //user endpoints
// // app.put("/api/user/:id", controller.updateUsername);
app.use(express.static(__dirname+'/../build'))
app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname,'../build/index.html'))
})
app.listen(port, () => console.log(` on port ${port}`));
