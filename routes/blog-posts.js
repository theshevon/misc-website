var feedReader    = require("feed-reader"),
    express   = require("express");

var router = express.Router();

router.get("/blog", function(req, res){

    var feedURL = "https://medium.com/feed/@RyanHoliday";
    
    feedReader.parse(feedURL).then((feed) => {
        res.render("blog", {posts:feed.entries});
    }).catch((err) => {
        console.log(err);
    });

});

module.exports = router;


