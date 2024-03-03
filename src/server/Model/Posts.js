const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const Posts = mongoose.model("communityPost", postSchema);
module.exports = Posts;
