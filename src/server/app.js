require("dotenv").config();
const express = require("express");
const app = express();
let bodyParser = require("body-parser");
let cors = require("cors");
const port = process.env.PORT;
const connection = require("./connection/conn");
const userRegistration = require('./auth/userRegistration')
const userLogin = require('./auth/userLogin')
const forgotpwEmailvalidation = require('./auth/forgotpwEmailvalidation')
const communityPost = require('./posts/addPost');
const userComment = require('./posts/userComment')
const savePosts = require("./posts/savePost");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3002",
    credentials: true,
  })
);
app.get("/", (req, resp) => {
  connection && resp.send("Server Connected!!!");
});
app.use("/user-registration", userRegistration);
app.use("/profile", userRegistration);
app.use("/user-login", userLogin);
app.use("/forgotPassword",forgotpwEmailvalidation);
app.use("/createPost",communityPost);
app.use("/getPost",communityPost);
app.use("/savePost",savePosts)
app.use("/removePost",savePosts)
app.use("/updatePost",savePosts)
app.use("/savedposts",savePosts)
app.use("/userComment",userComment)
app.use("/getuserComment",userComment)
app.use("/editComment",userComment)
app.use("/deleteComment",userComment)
app.listen(port, () => {
    console.log(`port running on ${port}`);
  });