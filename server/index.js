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


app.put('/api/progress', ctrl.updateAge);
app.delete("/api/progress", ctrl.deleteAge);
// // //post endpoints
app.post("/api/measure", ctrl.updateMeasurements);
app.post('/api/macros', ctrl.updateMacros);
app.post("/api/register", auth.register);
app.post("/api/login", auth.login);
app.post("/api/post", ctrl.createProgress);
app.post('/api/profile', auth.createProfile);
///Get endpoints
app.get('/api/progress/single/:id', ctrl.singleProgress);
app.get('/api/CustInfo', ctrl.CustInfo);
app.get("/api/progress", ctrl.getProgress);
app.get("/api/tdee", ctrl.getTdee);
app.get('/api/getInfo', ctrl.getInfo)
app.get("/api/auth", auth.getUser);
app.get("/api/logout", auth.logout);


app.use(express.static(`${__dirname}/../build`));
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'../build/index.html'))
})
app.listen(port, () => console.log(` on port ${port}`));
