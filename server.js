if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

const app = express();

// Passport config
require("./config/passport")(passport);

const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(flash());

// Express session
app.use(
  session({
    secret: "process.env.SESSION_SECRET",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/public"));

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes"));

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

start();
