/*=========================package/schema imports=============================*/

var methodOverride        = require("method-override"),
    localStrategy         = require("passport-local"),
    flash                 = require("connect-flash"),
    bodyParser            = require("body-parser"),
    passport              = require("passport"),
    mongoose              = require("mongoose"),
    express               = require("express"),
    seedDB                = require("./seeds"),  //remove before prod
    helmet                = require("helmet"),
    app                   = express();

var User  = require("./models/user");

var eventRoutes   = require("./routes/events"),
    blogRoutes    = require("./routes/blog-posts"),
    adminRoutes   = require("./routes/admin"),
    indexRoutes   = require("./routes/index"),
    contactRoutes = require("./routes/contact");

/*==================================app config================================*/

// connect to umisc database
// mongodb://umisc_admin:nimda_2019@ds253804.mlab.com:53804/umisc
// mongodb://127.0.0.1:27017/umisc
mongoose.connect("mongodb://umisc_admin:nimda_2019@ds253804.mlab.com:53804/umisc", 
                 {useNewUrlParser: true}, 
                 function(err, db) {
                    if (err) {
                        console.log('Unable to connect to the database.\n', err);
                    } else {
                        console.log('Successfully connected to database.');
                    }
});

app.use(flash());   // needs to be BEFORE passport config
app.use(helmet());

app.use(require("express-session")({
    secret: "I am Beyonce, always",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// move user data and flash errors to all views
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

/*====================================routing=================================*/

app.use(eventRoutes);
app.use(blogRoutes);
app.use(contactRoutes);
app.use(adminRoutes);
app.use(indexRoutes);

// local deployment
app.listen(3000, function(){
    console.log("Successfully connected to server.");
});

// production
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Successfully connected to server.");
});
