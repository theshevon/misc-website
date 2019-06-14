var Event   = require("../models/event"),
    express = require("express");
var router  = express.Router();

router.use(express.static(__dirname + "/public"));

// REDIRECT TO HOME
router.get("/", function(req, res){
  res.redirect("/home");
});

// MONTHLY EVENTS PAGE
router.get("/home", function(req, res){

  var date = new Date();
      month = date.getMonth(),
      year  = date.getFullYear();

  // retrieve all events from db
  Event.find({}, function(err, events){
      if (err){
          req.flash("error", "Oops, something went wrong!");
          // redirect to home page
          res.redirect("/home");
      }
      events = getEventsForSpecificTime(events, month, year);
      res.render("home", {
                            events    : events,
                            month     : month,
                            year      : year
                          });
  });
});

// ABOUT PAGE
router.get("/about", function(req, res){
  res.render("about");
});

// FALLBACK
router.get("/*", function(req, res){
  res.render("error");
});

module.exports = router;

/*==================================helper functions==========================*/

/**
 * Finds the events corresponding to a specified month and year, orders them
 * chronologically and returns an array of Event objects
 */
function getEventsForSpecificTime(allEvents, month, year){

  var events = [];

  // find the events
  allEvents.forEach(function(event){
      if (event.date.getMonth() === month && event.date.getFullYear() === year){
          events.push(event);
      }
  });

  // sort them in ascending order of date
  events.sort((event1, event2) => event1.date - event2.date);

  return events;
}
