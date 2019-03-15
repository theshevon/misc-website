var expressSanitizer = require('express-sanitizer'),
    sgMailer         = require("@sendgrid/mail"),
    express          = require("express");

const sgMail = require('@sendgrid/mail');
var router = express.Router();

router.use(expressSanitizer());

// CONTACT PAGE
router.get("/contact", function(req, res){
  res.render("contact");
});

router.post("/contact", function(req, res){
    console.log("I'm at the top");
    //  sanitise all inputs
    req.body.message = req.sanitize(req.body.message);

    // create output
    var output = req.body.message.body + "\n" + "\n" + req.body.message.name;
    if (req.body.message.org) output += " - " + req.body.message.org + "\n";
    output += req.body.message.email;

    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   sgMail.setApiKey("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");
    const msg = {
      to: 'shevonmendis98@gmail.com',
      from: 'shevonmendis98@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    sgMail.send(msg);

});

module.exports = router;
