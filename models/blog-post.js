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

var BlogPostSchema = new mongoose.Schema({
  event:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        },
  written_by: User_t,
  written_on: Date_t,
  last_edited_by: User_t,
  last_edited_on: Date_t
});

// return model as object
module.exports = mongoose.model("BlogPost", BlogPostSchema);
