const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true
  },
  commentId: {
    type: String,
    unique: true,
    required: true
  },
  writer: {
    type: Object, 
    required: true
  },
  craetedAt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },

});

module.exports = mongoose.model("comment", CommentSchema);
