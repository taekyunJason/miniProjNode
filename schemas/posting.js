const mongoose = require("mongoose");

const PostingSchema = new mongoose.Schema({
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
      },
      itemName: {
        type: String,
        required: true, 
      },  
      content: {
        type: [String],
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
      }
    });

    module.exports = mongoose.model("Posting", PostingSchema,);
  