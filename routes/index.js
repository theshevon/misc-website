var express = require("express");
var router  = express.Router();

// REDIRECT TO HOME
router.get("/", function(req, res){
  res.redirect("/home");
});

// HOME PAGE
router.get("/home", function(req, res){
  res.render("home");
});

// ABOUT PAGE
router.get("/about", function(req, res){
  res.render("about");
});

// FALLBACK
router.get("/*", function(req, res){
  res.render("error");
});

module.exports = router;
