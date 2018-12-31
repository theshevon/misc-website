var mongoose = require("mongoose");

var Date_t = {
               type: Date,
               default: Date.now
             };
             
var userSchema = mongoose.Schema({
  username: String,
  pw_hash: String,
  last_login: Date_t,
  last_logout: Date_t
});

// return model as object
module.export = mongoose.model("User", userSchema);
