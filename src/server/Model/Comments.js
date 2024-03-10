const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  postId:{
    type:String,
    required:true
  }
});
const Comments = mongoose.model("comment", commentSchema);
module.exports = Comments;
