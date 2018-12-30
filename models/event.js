var mongoose = require("mongoose");

// EVENT - name, date, description, creator and date/time of creation
var eventSchema = mongoose.Schema({
  date: Date,
  name: String,
  image: String,
  description: String,
  created_by: {
                type: mongoose.Schema.Types.objectId,
                ref: "User"
              },
  created_on: {
                type: Date,
                default: Date.now
              },
  last_edited_by: {
                    type: mongoose.Schema.Types.objectId,
                    ref: "User"
                  },
  last_edited_on: {
                   type: Date,
                   default: Date.now
                  },
});

// return model as object
module.exports = mongoose.model("Event", eventSchema);
