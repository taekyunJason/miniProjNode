const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: String,
  nickName: String,

  content: String,
  comment: String,
  date: Date,
  number: Number,
});

postSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("post", postSchema);
