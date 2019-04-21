var Parser     = require('rss-parser'),
    parser     = new Parser(),
    express    = require("express");

var router     = express.Router();

router.get("/blog", function(req, res){

    // rss url of blog
    var feedURL = "https://medium.com/feed/@umisc";
    
    (async () => {
        
        // CURRENTLY HARDCODED FOR THE FIRST BLOG POST
        let feed = await parser.parseURL(feedURL);
        res.render("blog", {posts: feed.items});
    })();

});

module.exports = router;


