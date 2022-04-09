const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  writer: {
    type: String,
  },
  pw: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
});

//몽고디비 고유의 id값을 가져오는 코드 
postSchema.virtual("postid").get(function () {//몽고디비에서 이렇게 사용해라! 라고 만든 것이기 때문에 임의로 변경해서는 안된다
  return this._id.toHexString();
});
postSchema.set("toJSON", {
  virtuals: true,
})

module.exports = mongoose.model("Post", postSchema);