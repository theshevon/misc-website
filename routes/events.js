var express = require("express");
var router = express.Router();
var Event = require("../models/event");

// GET ROUTE
router.get("/events", function(req, res){
    // retrieve all events from db
    Event.find({}, function(err, events){
        if (err){
            console.log("Error!");
            return;
        }
        res.render("events", {events: events});
    });
});

// CREATE ROUTE
router.get("/events/new", isLoggedIn, function(req, res){
    res.render("add-event");
});

// POST ROUTE
router.post("/events", isLoggedIn, function(req, res){
    Event.create(req.body.event, function(err, event){
      if (err){
        console.log(err);
        return;
      }
      res.redirect("/events/" + req.body.event.id);
    });
});

// SHOW ROUTE
router.get("/events/:id", function(req, res){
    Event.findById(req.params.id, function(err, event){
          if (err || !event){
            req.flash("error", "The event does not exist!")
            res.redirect("/home");
            return;
          }
          res.render("show-event", {event:event});
    });
});

// EDIT ROUTE
router.get("/events/:id/edit", isLoggedIn, function(req, res){
    Event.findById(req.params.id, function(err, event){
        if (err || !event){
            req.flash("error", "The event does not exist!")
            res.redirect("/events");
        } else{
            res.render("edit-event", {event:event});
        }
    });
});

// UPDATE ROUTE
router.put("/events/:id", isLoggedIn, function(req, res){
    Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, event){
        if (err){
            res.redirect("/events");
        } else{
            res.redirect("/events/" + req.params.id);
        }
    });
});

// DELETE ROUTE
router.delete("/events/:id", isLoggedIn, function(req, res){
    // destroy blog
    Event.findByIdAndRemove(req.params.id, function(err){
        if (err){
            res.redirect("/events");
        } else{
            res.redirect("/events");
        }
    });
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  req.flash("error", "Please Login First!");
  res.redirect("/admin");
}

module.exports = router;
