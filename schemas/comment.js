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
  userId: {
    type: String,
    required: true
  },
  userNickname: {
    type: String,
    required: true
  },
  userAge: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },

});

module.exports = mongoose.model("comment", CommentSchema);
