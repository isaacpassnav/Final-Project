const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/login-failure",
    successRedirect: "/api-docs",
  })
);

router.get("/login-success", (req, res) => {
    res.send(`✅ Login successful! Welcome ${req.user.username}`);
});

router.get("/login-failure", (req, res) => {
    res.send("❌ Login failed. Please try again.");
});

module.exports = router;