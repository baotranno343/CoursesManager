const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
//const ObjectId = Schema.ObjectId;

const User = new Schema({
  username: { type: String, maxLength: 255 },
  password: { type: String, maxLength: 255 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("User", User);
