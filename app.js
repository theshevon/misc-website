var express = require("express");
var app = express();

app.set("view engine", "ejs");

// render landing page
app.get("/", function(req, res){
  res.send("this is the landing page");
});

// render 'About' page
app.get("/about", function(req, res){
  res.send("this is the about page");
});

// render 'Contact' page
app.get("/contact", function(req, res){
  res.send("this is the contact page");
});

// render 'Events' page
app.get("/events", function(req, res){
  res.send("this is the events page");
});

// fallback
app.get("/*", function(req, res)){
  res.send("Error: This page does not exist");
};

app.listen(3000, function(){
  console.log("Successfully connected to server");
});
