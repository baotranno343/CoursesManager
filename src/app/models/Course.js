const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
//const ObjectId = Schema.ObjectId;

const Course = new Schema({
  name: { type: String, maxLength: 255 },
  des: { type: String, maxLength: 255 },
  img: { type: String, maxLength: 255 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  slug: { type: String, slug: "name", unique: true },
});
module.exports = mongoose.model("Course", Course);
