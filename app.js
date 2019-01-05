/*=========================package/schema imports=============================*/

var methodOverride        = require("method-override"),
    localStrategy         = require("passport-local"),
    flash                 = require("connect-flash"),
    bodyParser            = require("body-parser"),
    nodemailer            = require("nodemailer"),
    passport              = require("passport"),
    mongoose              = require("mongoose"),
    express               = require("express"),
    seedDB                = require("./seeds"),
    helmet                = require("helmet"),
    app                   = express();

var Event = require("./models/event"),
    User  = require("./models/user");

var eventRoutes   = require("./routes/events"),
    adminRoutes   = require("./routes/admin"),
    indexRoutes   = require("./routes/index"),
    contactRoutes = require("./routes/contact");

var date = new Date();
/*==================================app config================================*/

// connect to umisc database
mongoose.connect("mongodb://127.0.0.1:27017/umisc", {useNewUrlParser: true}, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
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

// move user data to all view templates
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

/*==================================(testing)=================================*/

// seedDB();

/*====================================routing=================================*/

app.use(eventRoutes);
app.use(contactRoutes);
app.use(adminRoutes);
app.use(indexRoutes);

app.listen(3000, function(){
  console.log("Successfully connected to server");
});
