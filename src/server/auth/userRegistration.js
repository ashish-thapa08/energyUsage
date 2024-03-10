require('../connection/conn')
const express = require("express");
const userModel = require("../Model/User")
const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = express.Router();
router.post("/", async (req, resp) => {
    try {
      let data = req.body;
      const userExist = await userModel.findOne({ email: data.email });
  
      if (userExist) {
        resp.send({ errMsg: `${data.email} already exists in system. Try another!!!` });
      } else {
        bcrypt.hash(data.password, saltRounds, async (err, hash) => {
          if (err) throw err;
          const user = new userModel({
            fullname: data.fullname,
            email: data.email,
            password: hash,
          });
          const savedUser = await user.save();
          resp.send({ msg: savedUser ? "success" : "Failed to save user" });
        });
      }
    } catch (err) {
      console.error("Error:", err);
      resp.status(500).send({ errMsg: "Internal Server Error" });
    }
  });
  router.get("/:user",async(req,resp)=>{
    const userExist = await userModel.findOne({ email: req.params.user });
    userExist&&resp.send({msg:userExist})
  })
module.exports=router;