var feedReader = require("feed-reader"),
    express    = require("express");

var router     = express.Router();

router.get("/blog", function(req, res){

    // rss url of blog
    var feedURL = "https://medium.com/feed/@umisc";
    
    feedReader.parse(feedURL).then((feed) => {
        res.render("blog", {posts: feed.entries});
    }).catch((err) => {
        res.render("blog", {posts: []});
    });

});

module.exports = router;


