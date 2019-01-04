var express = require("express");
var router = express.Router();

// HOME PAGE
router.get("/", function(req, res){
  res.redirect("home");
});

router.get("/home", function(req, res){
  res.render("home");
});

// ABOUT PAGE
router.get("/about", function(req, res){
  res.render("about");
});

// FALLBACK
router.get("/*", function(req, res){
  res.send("Error: This page does not exist");
});

module.exports = router;
