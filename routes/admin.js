const isLoggedIn      = require("../middleware/isLoggedIn"),
      adminController = require("../controllers/admin"),
      passport        = require("passport"),
      express         = require("express");

const router = express.Router();

/*=================================GET ROUTES=================================*/

// fetch admin portal login page
router.get("/admin", adminController.fetchPortalPage);

// logout user
router.get("/logout", isLoggedIn, adminController.logoutUser);

// fetch user registration page
// router.get("/register", adminController.fetchRegistrationPage);

/*================================POST ROUTES=================================*/

// login user
router.post("/admin", passport.authenticate("local", {
                        failureRedirect: "/admin",
                        failureFlash: "Invalid username or password"
                    }),
                    adminController.loginUser);

// register a new user
// router.post("/register", adminController.registerUser);

module.exports = router;
