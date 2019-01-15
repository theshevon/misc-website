var expressSanitizer = require('express-sanitizer'),
    nodemailer       = require("nodemailer"),
    express          = require("express");

var router = express.Router();

router.use(expressSanitizer());

// CONTACT PAGE
router.get("/contact", function(req, res){
  res.render("contact");
});

router.post("/contact", function(req, res){

    //  sanitise all inputs

    var output = req.body.message.body + "\n" + "\n" + req.body.message.name;

    if (req.body.message.org) output += " - " + req.body.message.org + "\n";

    output += req.body.message.email;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'shevonmendis7@gmail.com', // generated ethereal user
          pass: 'f@kePassword'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: req.body.message.name + ' <' + req.body.message.email + '>', // sender address
        to: 'shevonmendis98@gmail.com', // list of receivers
        subject: req.body.message.subject, // Subject line
        text: output // 
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {

        console.log("mailed");
        if (error) {
          req.flash("error", "Sorry, your request could not be completed at this time!");
          res.redirect('/contact');
        }
        console.log('Message sent: %s', info.messageId);
        
        req.flash("success", "Your message has been sent!");
        res.redirect('/contact');
    });
});

module.exports = router;
