var mongoose = require("mongoose");

var User_t = {
               id:{
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'User'
               },
               username: String
             };

var Date_t = {
                type: Date,
                default: Date.now
              };

var EventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  start_time: String,
  end_time: String,
  img_name: { type: String, default: "stub.png" },
  description: String,
  location: String,
  location_link: String,
  page_link: String,
  created_by: {
                id:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                username: String
              },
  created_on: {
                type: Date,
                default: Date.now
              },
  last_edited_by: User_t,
  last_edited_on: Date_t
});

// return model as object
module.exports = mongoose.model("Event", EventSchema);
