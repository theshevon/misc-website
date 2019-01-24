var BlogPost  = require("../models/blog-post"),
    Event     = require("../models/event"),
    express   = require("express");

var router = express.Router();

router.get("/blog", function(req, res){

    // retrieve all blogs from db
    BlogPost.find({}, function(err, posts){
        if (err){
            req.flash("error", "Oops, something went wrong!");
            // redirect to home page
            res.redirect("/home");
        }
        res.render("blog", {posts: posts});
    });
});

// EVENT BLOG POST CREATION PAGE
router.get("/blog/new/:id", isLoggedIn, function(req, res){

    // find the event that the blog post is being written for
    Event.findById(req.params.id, function(err, event){
        if (err || !event){
            req.flash("error", "Oops, something went wrong!")
            res.redirect("/events");
        } else{
            res.render("create-post", {event:event});
        }
    });
});

// // EVENT ALTERING PAGE
// router.get("/blog/:id/edit", isLoggedIn, function(req, res){
//     Event.findById(req.params.id, function(err, event){
//         if (err || !event){
//             req.flash("error", "The event does not exist!")
//             res.redirect("/events/" + date.getFullYear() + "/" + date.getMonth());
//         } else{
//             res.render("edit-blog-post", {event:event});
//         }
//     });
// });

// CREATE AN EVENT
router.post("/blog", isLoggedIn, function(req, res){
    
    var writer = {
                    id: req.user._id,
                    username: req.user.username
                  };

    req.body.post.written_by = writer;
    req.body.post.last_edited_by = writer;

    BlogPost.create(req.body.event, function(err, event){
      if (err){
        req.flash("error", "Sorry, your request couldn't be completed at this time.")
        res.redirect("/events");
      }

      req.flash("success", "Blog Post Successfully Created");
      res.redirect("/blog");
    });
});

// // SHOW A SPECIFIC BLOG
// router.get("/blog/:id", function(req, res){

//     // find event by its ID
//     Event.findById(req.params.id, function(err, event){
//           if (err || !event){
//             req.flash("error", "The event does not exist!")
//             res.redirect("/events/" + date.getFullYear() + "/" + date.getMonth());
//           }
//           res.render("show-event", {event:event});
//     });
// });

// // UPDATE A BLOG
// router.put("/events/:id", isLoggedIn, function(req, res){
    
//     var editor = {
//                     id: req.user._id,
//                     username: req.user.username
//                  };

//     req.body.event.last_edited_by = editor;
//     req.body.event.last_edited_on = Date();

//     // find event by its ID and update it
//     Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, event){
//         if (err){
//             req.flash("error", "Error: Sorry, your request could not be completed at this time");
//             res.redirect("/events");
//         } else{
//             req.flash("success", "Event Successfully Updated");
//             res.redirect("/events/" + req.params.id);
//         }
//     });
// });

// // DELETE A SPECIFIC BLOG
// router.delete("/events/:id", isLoggedIn, function(req, res){

//     // find event by its ID and delete it
//     Event.findByIdAndDelete(req.params.id, function(err){
//         if (err){
//             req.flash("error", "Error: Sorry, your request could not be completed at this time");
//             res.redirect("back");
//         } else{
//             req.flash("success", "Event Successfully Deleted")
//             res.redirect("/events");
//         }
//     });
// });

/*==================================helper functions================================*/

/**
 * Middleware to check if a user has logged in.
 */
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
      return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/admin");
}
  
module.exports = router;


