const User = require("../models/user");

exports.fetchPortalPage =

    (req, res) =>
        res.render("admin");

exports.fetchRegistrationPage =

    (req, res) =>
        res.redner("register");

exports.registerUser =

    (req, res) => {

        // verify username
        User.register(new User({username: req.body.username}),req.body.password,
                                                                (err, user) => {

            if (err){
                console.log(err);
                req.flash("error", "Username already in use!");
                res.redirect('/register');
            }

            // logs user in and runs 'serialize' method
            passport.authenticate("local")(req, res, () => {
                req.flash("success", "Successfully Logged In!");
                res.redirect("/code");
            });
        })
    }

exports.loginUser =

    (req, res) => {

        //  verify user
        User.findById(req.user._id, (err, user) => {
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
        res.redirect("/events");
    }

exports.logoutUser =

    (req, res) => {

        // update last logout time
        User.findById(req.user._id, (err, user) => {
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
    }