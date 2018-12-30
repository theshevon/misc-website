var mongoose = require("mongoose");

// USER - username, password hash
var userSchema = mongoose.Schema({
  username: String,
  pw_hash: String
});

// return model as object
module.export = mongoose.model("User", userSchema);
