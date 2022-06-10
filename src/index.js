const path = require("path");
const express = require("express");
var methodOverride = require("method-override");
const app = express();
const port = 3000;
const handlebars = require("express-handlebars");
const route = require("./routes");
const db = require("./config/db/");
const { debugPort } = require("process");
const session = require("express-session");
db.connect();
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride("_method"));
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 5 * 60 * 1000 },
  })
);
//Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => {
        return a + b;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
