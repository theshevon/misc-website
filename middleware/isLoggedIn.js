/**
 * Middleware to check if a user has logged in.
 */

module.exports =

    function isLoggedIn(req, res, next){
        if (req.isAuthenticated()){
        return next();
        }
        req.flash("error", "Please Login First!");
        res.redirect("/admin");
    }
