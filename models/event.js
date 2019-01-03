var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var User_t = {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User'
             };

var Date_t = {
               type: Date,
               default: Date.now
             };

var EventSchema = new mongoose.Schema({
  date: Date,
  name: String,
  image: String,
  description: String,
  location: String,
  link: String,
  created_by: User_t,
  created_on: Date_t,
  last_edited_by: User_t,
  last_edited_on: Date_t
});

// return model as object
module.exports = mongoose.model("Event", EventSchema);
