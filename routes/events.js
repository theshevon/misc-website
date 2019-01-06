var express = require("express");
var router = express.Router();
var Event = require("../models/event");

var date = new Date();

// REDIRECT TO MONTHLY EVENTS ROUTE
router.get("/events", function(req, res){
    res.redirect("/events/" + date.getFullYear() + "/" + date.getMonth());
});

// CREATE ROUTE
router.get("/events/new", isLoggedIn, function(req, res){
    res.render("add-event");
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
        res.render("events", {
                                month: month, 
                                year: year, 
                                events: events, 
                                prev: getUpdateTimeString(month, year, "prev"), 
                                next: getUpdateTimeString(month, year, "next")
                            });
    });
});

// POST ROUTE
router.post("/events", isLoggedIn, function(req, res){
    Event.create(req.body.event, function(err, event){
      if (err){
        console.log(err);
        return;
      }
      req.flash("success", "Event Successfully Added");
      res.redirect("/events/" + event.date.getFullYear() + "/" + event.date.getMonth());
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



// UPDATE ROUTE
router.put("/events/:id", isLoggedIn, function(req, res){
    Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, event){
        if (err){
            req.flash("error", "Error: Sorry, your request could not be completed at this time");
            res.redirect("/events");
        } else{
            req.flash("success", "Event Successfully Updated");
            res.redirect("back");
        }
    });
});

// DELETE ROUTE
router.delete("/events/:id", isLoggedIn, function(req, res){
    // destroy blog
    Event.findByIdAndRemove(req.params.id, function(err){
        if (err){
            req.flash("error", "Error: Sorry, your request could not be completed at this time");
            res.redirect("back");
        } else{
            req.flash("success", "Event Successfully Deleted")
            res.redirect("back");
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
        // console.log(event.name);
        // console.log(event.date.getMonth());
        // console.log(month);
        if (event.date.getMonth() === month && event.date.getFullYear() === year){
            specificEvents.push(event);
        }
    });

    return specificEvents;
}

function getUpdateTimeString(month, year, dir){
    if (dir === "prev"){
        if (month === 0){
            month = 11;
            year--;
        }else{
            month--;
        }
    }else{
        if (month === 11){
            month = 0;
            year++;
        }else{
            month++;
        }
    }
    return "/" + year + "/" + month + "/";
}


