const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordCheck: {
    type: String,
  },
  userNickname: {
    type: String,
    required: true,
  },
  userAge: {
    type: String,
    required: true,
  },
  result: Boolean,
});

module.exports = mongoose.model("User", UserSchema);
