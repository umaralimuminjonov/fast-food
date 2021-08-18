const router = require("express").Router();
const { checkAuthenticated, checkNotAuthenticated } = require("../config/auth");
const passport = require("passport");

// Welcome Page
router.get("/", checkAuthenticated, async (req, res) => {
  try {
    res.render("dashboard", { admin: req.user });
  } catch {
    res.redirect("/");
  }
});

// Category Page
router.use("/", require("./categoryRouter"));

// Customers Page
router.use("/", require("./customerRouter"));

// Foods Page
router.use("/", require("./foodRouter"));

// Login
router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login");
});

router.post("/login", checkNotAuthenticated, (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/login");
});

module.exports = router;
