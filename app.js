/*=========================package/schema imports=============================*/

var passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride        = require("method-override"),
    localStrategy         = require("passport-local"),
    bodyParser            = require("body-parser"),
    nodemailer            = require("nodemailer"),
    passport              = require("passport"),
    mongoose              = require("mongoose"),
    express               = require("express"),
    seedDB                = require("./seeds"),
    app                   = express();

var Event = require("./models/event"),
    User  = require("./models/user");

/*==================================app config================================*/

// connect to umisc database
mongoose.connect("mongodb://localhost:27018/umisc", {useNewUrlParser: true});

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
  next();
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

/*==================================(testing)=================================*/

seedDB();

/*====================================routing=================================*/

// middleware to verify if admin user is logged in
function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect("/home");
}

// HOME PAGE
app.get("/", function(req, res){
  res.redirect("home");
});

app.get("/home", function(req, res){
  res.render("home");
});

// ABOUT PAGE
app.get("/about", function(req, res){
  res.render("about");
});

// CONTACT PAGE
app.get("/contact", function(req, res){
  res.render("contact");
});

// app.post("/contact", function(req, res){
//
//     const output = `
//         <p>You have a new contact request</p>
//         <h3>Contact Details</h3>
//         <ul>
//           <li>Name: ${req.body.name}</li>
//           <li>Company: ${req.body.company}</li>
//           <li>Email: ${req.body.email}</li>
//           <li>Phone: ${req.body.phone}</li>
//         </ul>
//         <h3>Message</h3>
//         <p>${req.body.message}</p>
//       `;
//
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: 'mail.YOURDOMAIN.com',
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//           user: 'YOUREMAIL', // generated ethereal user
//           pass: 'YOURPASSWORD'  // generated ethereal password
//       },
//       tls:{
//         rejectUnauthorized:false
//       }
//     });
//
//     // setup email data with unicode symbols
//     let mailOptions = {
//         from: '"Nodemailer Contact" <your@email.com>', // sender address
//         to: 'RECEIVEREMAILS', // list of receivers
//         subject: 'Node Contact Request', // Subject line
//         text: 'Hello world?', // plain text body
//         html: output // html body
//     };
//
//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//
//         res.render('contact', {msg:'Email has been sent'});
//     });
// });

var data = [
    {
      name: "Spring Event",
      date: new Date(2019, 01, 09),
      image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/landscape-spring-event-poster-template-3995484c4d32950ed2544533874e80ac_screen.jpg?ts=1461316394",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      name: "Spring Event 02",
      date: new Date(2019, 01, 11),
      image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/landscape-spring-event-poster-template-3995484c4d32950ed2544533874e80ac_screen.jpg?ts=1461316394",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      name: "Spring Event 03",
      date: new Date(2019, 02, 04),
      image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/landscape-spring-event-poster-template-3995484c4d32950ed2544533874e80ac_screen.jpg?ts=1461316394",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
]

// EVENTS PAGE
app.get("/events", function(req, res){
    // retrieve all events from db
    // Event.find({}, function(err, events){
    //     if (err){
    //         console.log("Error!");
    //     } else{
    //         res.render("events", {events: events})
    //     }
    // });
    res.render("events", {events: data});
});

// // show specific event details
// app.get("/events/:id", function(req, res){
//   res.render("event");
// });

// ADMIN LOGIN PAGE
app.get("/admin", function(req, res){
  res.render("admin");
});

// FALLBACK
app.get("/*", function(req, res){
  res.send("Error: This page does not exist");
});

app.listen(3000, function(){
  console.log("Successfully connected to server");
});
