require('../connection/conn')
const express = require("express");
const userModel = require("../Model/User")
const savepostModel = require("../Model/Savepost")
const Posts = require("../Model/Posts")
const router = express.Router();
router.post("/",async(req,resp)=>{
    let data = req.body;
    console.log(data)
    const userExist = await userModel.findOne({ email: data.user });
    if (userExist) {
        const count = await savepostModel.findOne({postId:data.id,user:data.user})
        if(count){
            const del =  await savepostModel.findOneAndDelete({postId:data.id,user:data.user});
            del&&resp.send({msg:'unlike'})
        }
        else{
            const savepost = new savepostModel({
                postId: data.id,
                user:data.user,
              });
              const savePost = await savepost.save();
              resp.send({ msg: savePost ? true : false});
        }
      } else {
        resp.send({ errMsg1: `${data.user} does not exist in system!!!` });
      }
})
router.delete("/:id",async(req,resp)=>{
    const id = req.params.id;
    const remove = await Posts.findOneAndDelete({_id:id})
    if(remove){
        const del =  await savepostModel.deleteMany({postId:id});
        if(del){
            resp.send({msg:true})
        }
        else{
            resp.send({err:'Server Issues!!!'})
        }
    }
    else{
        resp.send({err:'Server Issues!!!'})
    }
})
router.put("/:id",async(req,resp)=>{
    try {
        const postId = req.params.id;
        const { title, device,description } = req.body; // Assuming you want to update title and description

        // Find the post by ID and update it
        const updatedPost = await Posts.findByIdAndUpdate(postId, { title,device,description }, { new: true });

        // Send the updated post as a response
        updatedPost&&resp.send({msg:true});
    } catch (error) {
        console.error('Error updating post:', error);
        resp.status(500).json({ error: 'Internal server error' });
    }
})
// Backend route to check if a post is saved
router.get("/:user", async (req, resp) => {
    try {
        const user = req.params.user;
        // Query your database to check if the post is saved by the user
        const savedPost = await savepostModel.find({user: user });
        // Respond with a boolean value indicating whether the post is saved or not
        resp.json(savedPost); // Convert savedPost to a boolean
    } catch (error) {
        console.error('Error checking if post is saved:', error);
        resp.status(500).json(false); // Return false in case of an error
    }
});

module.exports=router;