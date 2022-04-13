const mongoose = require("mongoose");

const PostingSchema = new mongoose.Schema({
      postId: {
        type: String,
        required: true,
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
      itemName: {
        type: String,
        required: true, 
      },
      content: {
        type: String,
        required: true
      },    
      createdAt: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      likeCnt: {
        type: Number,
        required: true,
      },
      commentCnt: {
        type: Number,
        required: true,
      },
      userLike: {
        type: Array,
        required: true,
      }
    });
    // PostingSchema.virtual("postId").get(function () {//몽고디비에서 이렇게 사용해라! 라고 만든 것이기 때문에 임의로 변경해서는 안된다
    //   return this._id;
    // });
    // PostingSchema.set("toJSON", {
    //   virtuals: true,
    // })
    module.exports = mongoose.model("Posting", PostingSchema,);
  
