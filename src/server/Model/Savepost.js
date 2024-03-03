const mongoose = require("mongoose");
const savepostSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  }
});
const savePosts = mongoose.model("savePost", savepostSchema);
module.exports = savePosts;
