const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");

module.exports = (passport) => {
  const authenticateAdmin = async (email, password, done) => {
    // Match admin
    const admin = await Admin.findOne({ email });
    if (!admin) return done(null, false, { message: "Admin not exist" });

    // Match password
    const validatePassword = await bcrypt.compare(password, admin.password);
    if (!validatePassword)
      return done(null, false, { message: "Incorrect password" });

    done(null, admin);
  };

  passport.use(
    new LocalStrategy({ usernameField: "email" }, authenticateAdmin)
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
