var express = require("express");
var router = express.Router();
var Event = require("../models/event");

// REDIRECT TO MONTHLY EVENTS ROUTE
router.get("/events", function(req, res){
    var date = new Date();
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
    
    var creator = {
                    id: req.user._id,
                    username: req.user.username
                  };

    req.body.event.created_by = creator;
    req.body.event.last_edited_by = creator;

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
    
    var editor = {
                    id: req.user._id,
                    username: req.user.username
                 };

    req.body.event.last_edited_by = editor;
    req.body.event.last_edited_on = Date();

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

    // delete event
    Event.findByIdAndRemove(req.params.id, function(err){
        if (err){
            req.flash("error", "Error: Sorry, your request could not be completed at this time");
            res.redirect("back");
        } else{
            req.flash("success", "Event Successfully Deleted")
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

function getEventsForSpecificTime(allEvents, month, year){
    
    events = [];

    // find the events for the particular month
    allEvents.forEach(function(event){
        if (event.date.getMonth() === month && event.date.getFullYear() === year){
            events.push(event);
        }
    });

    // sort them in ascending order of date
    events.sort((event1, event2) => event1.date - event2.date);

    return events;
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


