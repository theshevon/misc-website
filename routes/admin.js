var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var date = new Date();

// ADMIN LOGIN PAGE
router.get("/admin", function(req, res){
  res.render("admin");
});

router.post("/admin", passport.authenticate("local", {
    failureRedirect: "/admin",
    failureFlash: "Invalid username or password"
}), function(req, res){
    // UPDATE LAST LOGIN
    User.findById(req.user._id, function(err, user){
        if (err || !user){
            req.flash("error", "Oops, something went wrong!");
            res.redirect("/admin");
        }
        user.last_login = Date(); 
        user.save();
    });
    req.flash("success", "Successfully Logged In As: " + req.user.username);
    res.redirect("/home");
});


router.get("/logout", isLoggedIn, function(req, res){
    // UPDATE LAST LOGOUT
    User.findById(req.user._id, function(err, user){
        if (err || !user){
            req.flash("error", "Oops, something went wrong!");
            res.redirect("/home");
        }
        user.last_logout = Date(); 
        user.save();
    });
    req.logout();
    req.flash("success", "Succesfully Logged Out!");
    res.redirect("/home");
});

// REGISTER NEW ADMIN PAGE
router.get("/register", function(req, res){
  res.render("register");
});

router.post("/register", function(req, res){
    User.register(new User({name: req.body.name, username: req.body.username}), req.body.password, function(err, user){
        if (err){
            console.log(err);
            req.flash("error", "Username already in use!");
            res.redirect('/register');
        }

        // logs user in and runs 'serialize' method
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successfully Logged In As: " + req.user.username);
            res.redirect("/home");
        });
    })
});

module.exports = router;

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
      return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/admin");
  }
