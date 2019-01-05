var express = require("express");
var router = express.Router();
var Event = require("../models/event");

var date = new Date();

// REDIRECT TO MONTHLY EVENTS ROUTE
router.get("/events", function(req, res){
    res.redirect("/events/" + date.getFullYear() + "/" + (date.getMonth()+1));
});

// CREATE ROUTE
router.get("/events/new", isLoggedIn, function(req, res){
    res.render("add-event");
});

// GET ROUTE
router.get("/events/:year/:month", function(req, res){

    var month = Number(req.params.month),
        year  = Number(req.params.year);

    // retrieve all events from db
    Event.find({}, function(err, events){
        if (err){
            console.log("Error!");
            return;
        }
        events = getEventsForSpecificTime(events, month, year);
        res.render("events", {month: month, 
                              year: year, 
                              events: events, 
                              prev: getUpdateTimeString(month, year, "prev"), 
                              next: getUpdateTimeString(month, year, "next")});
    });
});

// POST ROUTE
router.post("/events/:year/:month", isLoggedIn, function(req, res){
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
            res.redirect("/events");
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

// HELPER FUNCTIONS

function getEventsForSpecificTime(events, month, year){
    
    specificEvents = [];
    events.forEach(function(event){
        if (event.date.getMonth() === month && event.date.getFullYear() === year){
            specificEvents.push(event);
        }
    });

    return specificEvents;
}

function getUpdateTimeString(month, year, dir){
    if (dir === "prev"){
        if (month === 1){
            console.log("prev");
            month = 12;
            year--;
        }else{
            month--;
        }
    }else{
        if (month === 12){
            month = 1;
            year++;
        }else{
            month++;
        }
    }

    return "/" + year + "/" + month + "/";
}


