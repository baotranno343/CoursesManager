const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
//const ObjectId = Schema.ObjectId;

const Lesson = new Schema({
  name: { type: String, maxLength: 255 },
  des: { type: String, maxLength: 255 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  slug_course: { type: String, maxLength: 255 },
});
module.exports = mongoose.model("Lesson", Lesson);
