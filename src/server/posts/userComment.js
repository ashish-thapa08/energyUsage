require('../connection/conn')
const express = require("express");
const userModel = require("../Model/User")
const commentModel = require("../Model/Comments")
const router = express.Router();
router.post("/",async(req,resp)=>{
    let data = req.body;
    const userExist = await userModel.findOne({ email: data.user });
    if (userExist) {
        const comment = new commentModel({
            comment: data.comment,
            user:data.user,
            postId:data.postId

          });
          const hitComment = await comment.save();
          resp.send({ msg: hitComment ? true : "Network Err!!!" });
      } else {
        resp.send({ errMsg1: `${data.email} does not exist in system!!!` });
      }
})
router.get("/",async(req,resp)=>{
  const comments = await commentModel.find();
  comments?resp.send({msg:comments}):resp.send({errMsg1:'Failed to fetched posts!!!'})
})
router.put("/",async(req,resp)=>{
  let data = req.body;
  const updatedCmnt = await commentModel.findByIdAndUpdate(data.id, { comment:data.comment }, { new: true });
  updatedCmnt&&resp.send({msg:true});
})
router.delete("/:id",async(req,resp)=>{
  const id = req.params.id;
  console.log(id)
  const remove = await commentModel.findOneAndDelete({_id:id})
      if(remove){
          resp.send({msg:true})
      }
      else{
          resp.send({err:'Server Issues!!!'})
      }
 
})
module.exports=router;