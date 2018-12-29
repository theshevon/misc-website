// Backend functionality for UMISC website.
// Written by Shevon Mendis, 2018

var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();

/*==================================app config================================*/

// connect to umisc database
mongoose.connect("mongodb://localhost:27017/umisc", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

/*===============================mongoose config==============================*/

var eventSchema = mongoose.Schema({
  name: String,
  date: Date,
  description: String
});

var Event = mongoose.model("Event", eventSchema);

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
  res.send("about");
});

// render 'Contact' page
app.get("/contact", function(req, res){
  res.send("contact");
});

// render 'Events' page
app.get("/events", function(req, res){
  //  retrieve all events from db
  res.send("events");
});

app.get("/events/:id", function(req, res){
  res.send("event");
});

// fallback
app.get("/*", function(req, res){
  res.send("Error: This page does not exist");
});

app.listen(3000, function(){
  console.log("Successfully connected to server");
});
