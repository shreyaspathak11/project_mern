const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google authentication route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google authentication callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

// Profile route
router.get("/profile", (req, res) => {
  if (req.user) {
    // Return the user's data
    res.send(req.user);
  } else {
    res.sendStatus(401);
  }
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
