var mongoose = require("mongoose"),
    Event = require("./models/event");

var data = [
    {
      name: "Spring Event",
      date: new Date(2019, 01, 09),
      image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/landscape-spring-event-poster-template-3995484c4d32950ed2544533874e80ac_screen.jpg?ts=1461316394",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      name: "Spring Event 02",
      date: new Date(2019, 01, 11),
      image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/landscape-spring-event-poster-template-3995484c4d32950ed2544533874e80ac_screen.jpg?ts=1461316394",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      name: "Spring Event 03",
      date: new Date(2019, 02, 04),
      image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/landscape-spring-event-poster-template-3995484c4d32950ed2544533874e80ac_screen.jpg?ts=1461316394",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
]

function seedDB(){

  // remove all events
  Event.remove({}, function(err){
    if (err){
      console.log(err);
    }

    console.log("Succesfully removed all existing events");

    // add some Events
    data.forEach(function(seed){
      Event.create(seed, function(err, newSeed){
        if (err){
          console.log(err);
        } else{
          console.log("Added a new event");
        }
      });
    });
  });
}

module.exports = seedDB;
