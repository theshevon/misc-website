var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var date = new Date();

// USER LOGIN PAGE 
router.get("/admin", function(req, res){
  res.render("admin");
});

// LOGIN USER
router.post("/admin", passport.authenticate("local", {
    failureRedirect: "/admin",
    failureFlash: "Invalid username or password"
}), function(req, res){

    //  verify user
    User.findById(req.user._id, function(err, user){
        if (err || !user){
            // redirect to login page
            req.flash("error", "Oops, something went wrong!");
            res.redirect("/admin");
        }
        // update last login time
        user.last_login = Date(); 
        user.save();
    });

    // login user and redirect to home page
    req.flash("success", "Successfully Logged In As: " + req.user.username);
    res.redirect("/home");
});


// USER LOGOUT
router.get("/logout", isLoggedIn, function(req, res){

    // update last logout time
    User.findById(req.user._id, function(err, user){
        if (err || !user){
            req.flash("error", "Oops, something went wrong!");
            res.redirect("/home");
        }
        user.last_logout = Date(); 
        user.save();
    });

    // logout user and redirect to home page
    req.logout();
    req.flash("success", "Succesfully Logged Out!");
    res.redirect("/home");
});

// NEW USER REGISTRATION PAGE
router.get("/register", function(req, res){
  res.render("register");
});

// REGISTER NEW USER
router.post("/register", function(req, res){

    // verify username 
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

/**
 * Middleware to check if a user has logged in.
 */
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
      return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/admin");
}

module.exports = router;