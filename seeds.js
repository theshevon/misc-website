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
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      location: "Elizabeth Murdoch G06"
    },
    {
      name: "Pen Test Workshop",
      date: new Date(2019, 01, 11),
      image: "https://previews.123rf.com/images/sxwx/sxwx1810/sxwx181000080/110213731-new-years-party-invitation-poster-or-flyer-with-vinyl-lp-for-dj-and-retro-80s-neon-styled-landscape-.jpg",
      description: "It is a long established fact that a reader will be\
      distracted by the readable content of a page when looking at its \
      layout. The point of using Lorem Ipsum is that it has a more-or-less \
      normal distribution of letters, as opposed to using 'Content here, \
      content here', making it look like readable English. Many desktop \
      publishing packages and web page editors now use Lorem Ipsum as their \
      default model text, and a search for 'lorem ipsum' will uncover many web \
      sites still in their infancy. Various versions have evolved over the years,\
      sometimes by accident, sometimes on purpose (injected humour and the like).",
      location: "Peter Hall G07"
    },
    {
      name: "SQL Injections",
      date: new Date(2019, 02, 04),
      image: "https://static.pechakucha.org/pechakucha/uploads/event_picture/picture/5214fe8f4f5c29dcd1000001/large_wide_pk-portsmouth-16-poster-landscape.jpg",
      description: "Contrary to popular belief, Lorem Ipsum is not simply random\
       text. It has roots in a piece of classical Latin literature from 45 BC, \
       making it over 2000 years old. Richard McClintock, a Latin professor at \
       Hampden-Sydney College in Virginia, looked up one of the more obscure \
       Latin words, consectetur, from a Lorem Ipsum passage, and going through \
       the cites of the word in classical literature, discovered the undoubtable\
       source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \
       de Finibus Bonorum et Malorum.",
       location: "Sydney Myer"
    },
    {
      name: "Spring Event",
      date: new Date(2019, 01, 09),
      image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/landscape-spring-event-poster-template-3995484c4d32950ed2544533874e80ac_screen.jpg?ts=1461316394",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, \
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      location: "Elizabeth Murdoch G06"
    },
    {
      name: "Pen Test Workshop",
      date: new Date(2019, 01, 11),
      image: "https://previews.123rf.com/images/sxwx/sxwx1810/sxwx181000080/110213731-new-years-party-invitation-poster-or-flyer-with-vinyl-lp-for-dj-and-retro-80s-neon-styled-landscape-.jpg",
      description: "It is a long established fact that a reader will be\
      distracted by the readable content of a page when looking at its \
      layout. The point of using Lorem Ipsum is that it has a more-or-less \
      normal distribution of letters, as opposed to using 'Content here, \
      content here', making it look like readable English. Many desktop \
      publishing packages and web page editors now use Lorem Ipsum as their \
      default model text, and a search for 'lorem ipsum' will uncover many web \
      sites still in their infancy. Various versions have evolved over the years,\
      sometimes by accident, sometimes on purpose (injected humour and the like).",
      location: "Peter Hall G07"
    },
    {
      name: "SQL Injections",
      date: new Date(2019, 02, 04),
      image: "https://static.pechakucha.org/pechakucha/uploads/event_picture/picture/5214fe8f4f5c29dcd1000001/large_wide_pk-portsmouth-16-poster-landscape.jpg",
      description: "Contrary to popular belief, Lorem Ipsum is not simply random\
       text. It has roots in a piece of classical Latin literature from 45 BC, \
       making it over 2000 years old. Richard McClintock, a Latin professor at \
       Hampden-Sydney College in Virginia, looked up one of the more obscure \
       Latin words, consectetur, from a Lorem Ipsum passage, and going through \
       the cites of the word in classical literature, discovered the undoubtable\
       source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \
       de Finibus Bonorum et Malorum.",
       location: "Sydney Myer"
    }
]

function seedDB(){

  console.log("seeding now");
  // remove all events
  Event.remove({}, function(err){
    if (err){
      console.log(err);
      return;
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
