var express = require("express"),
    app = express(),
    mongoose = require("mongoose");

app.use(express.static("public"));
app.set("view engine", "ejs");

// ################################################################################
// ###############################/* DB STUFF */###################################
// ################################################################################

// connect to umisc database
mongoose.connect("mongodb://localhost:27017/umisc", {useNewUrlParser: true});

// define schema for an event (defines pattern for the data being entered)
// provides structure
var eventSchema = mongoose.Schema({
  name: String,
  date: String,
  description: String
});

var Event = mongoose.model("Event", eventSchema);

// ################################################################################
// ###############################/* Routing */####################################
// ################################################################################

// render landing page
app.get("/", function(req, res){
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

// fallback
app.get("/*", function(req, res){
  res.send("Error: This page does not exist");
});

app.listen(3000, function(){
  console.log("Successfully connected to server");
});
