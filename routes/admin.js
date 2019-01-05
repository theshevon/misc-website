var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ADMIN LOGIN PAGE
router.get("/admin", function(req, res){
  res.render("admin");
});

router.post("/admin", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/admin",
    successFlash: "Successfully Logged In",
    failureFlash: "Invalid username or password."
}), function(req, res){
    //
});


router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Succesfully Logged Out!");
    res.redirect("/home");
});

// REGISTER NEW ADMIN PAGE
router.get("/register", function(req, res){
  res.render("register");
});

router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err){
            console.log(err);
            return res.render('register');
        }

        // logs user in and runs 'serialize' method
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Succesfully Logged In As:");
            res.redirect("/home");
        });
    })
});

module.exports = router;
