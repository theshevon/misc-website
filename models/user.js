var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var Date_t = {
               type: Date,
               default: Date.now
             };

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    last_login: Date_t,
    last_logout: Date_t
});

// defines the serialize/ deserialize methods for the user automatically
UserSchema.plugin(passportLocalMongoose);

// return model as object
module.exports = mongoose.model("User", UserSchema);
