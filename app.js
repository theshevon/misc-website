// Backend functionality for UMISC website.
// Written by Shevon Mendis, 2018

var methodOverride = require("method-override"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    express        = require("express"),
    app            = express(),
    seedDB         = require("./seeds");

/*==================================app config================================*/

seedDB();

// connect to umisc database
mongoose.connect("mongodb://localhost:27017/umisc", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

/*============================mongoose schema config==========================*/

var Event = require("./models/event"),
    User  = require("./models/user");

/*====================================routing=================================*/

// render landing page
app.get("/", function(req, res){
  res.redirect("home");
});

// render home page
app.get("/home", function(req, res){
  res.render("home");
});

// render 'About' page
app.get("/about", function(req, res){
  res.render("about");
});

// render 'Contact' page
app.get("/contact", function(req, res){
  res.render("contact");
});

// render 'Events' page
app.get("/events", function(req, res){
  //  retrieve all events from db
  res.render("events");
});

// show specific event details
app.get("/events/:id", function(req, res){
  res.render("event");
});

// show secret page
app.get("/events/admin", function(req, res){
  res.render("event");
});

// fallback
app.get("/*", function(req, res){
  res.send("Error: This page does not exist");
});

app.listen(3000, function(){
  console.log("Successfully connected to server");
});
