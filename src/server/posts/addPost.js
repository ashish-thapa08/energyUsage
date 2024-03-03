require('../connection/conn')
const express = require("express");
const userModel = require("../Model/User")
const postModel = require("../Model/Posts")
const router = express.Router();
router.post("/:user",async(req,resp)=>{
    let data = req.body;
    let user = req.params.user
    console.log(user)
    const userExist = await userModel.findOne({ email: user });
    if (userExist) {
        const post = new postModel({
            title: data.title,
            user:user,
            device: data.option,
            description:data.description
          });
          const addPost = await post.save();
          resp.send({ msg: addPost ? "Post Added" : "Failed to Add Post!!!" });
      } else {
        resp.send({ errMsg1: `${data.email} does not exist in system!!!` });
      }
})
router.get("/",async(req,resp)=>{
  const posts = await postModel.find();
  posts?resp.send({msg:posts}):resp.send({errMsg1:'Failed to fetched posts!!!'})
})
module.exports=router;