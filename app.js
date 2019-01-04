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
mongoose.connect("mongodb://127.0.0.1:27017/umisc", {useNewUrlParser: true}, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});

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

// seedDB();

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

// app.get("/events", function(req, res){
//   res.redirect("/events/" + (new Date).getMonth());
// });

// EVENTS PAGE
app.get("/events", function(req, res){
    // retrieve all events from db
    Event.find({}, function(err, events){
        if (err){
            console.log("Error!");
            return;
        }
        res.render("events", {events: events});
    });
});

app.get("/events/new", function(req, res){
    res.render("new-event");
});

app.post("/events", function(req, res){
    // req.body.event.description = req.santize(req.body.event.description);
    Event.create(req.body.event, function(err, event){
      if (err){
        console.log(err);
        return;
      }
      res.redirect("/events");
    });
});

app.get("/events/:id", function(req, res){
    Event.findById(req.params.id, function(err, event){
          if (err){
              res.redirect("/home");
              return;
          }
          res.render("show-event", {event:event});
    });
});

// ADMIN LOGIN PAGE
app.get("/admin", function(req, res){
  res.render("admin");
});

app.post("/admin", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/admin",
}), function(req, res){
    //
});

app.get("/logout", function(req, res){

    req.logout();
    res.redirect("/");
});

// REGISTER NEW ADMIN PAGE
// app.get("/register", function(req, res){
//   res.render("register");
// });
//
// app.post("/register", function(req, res){
//     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
//         if (err){
//             console.log(err);
//             return res.render('register');
//         }
//
//         // logs user in and runs 'serialize' method
//         passport.authenticate("local")(req, res, function(){
//            res.redirect("/home");
//         });
//     })
// });

// FALLBACK
app.get("/*", function(req, res){
  res.send("Error: This page does not exist");
});

app.listen(3000, function(){
  console.log("Successfully connected to server");
});
