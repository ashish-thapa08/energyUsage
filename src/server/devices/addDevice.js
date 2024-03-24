require('../connection/conn')
const express = require("express");
const userModel = require("../Model/User")
const deviceModel = require("../Model/Devices")
const router = express.Router();
router.post("/:user",async(req,resp)=>{
    let data = req.body;
    let user = req.params.user
    console.log(user)
    const userExist = await userModel.findOne({ email: user });
    if (userExist) {
        const device = new deviceModel({
            title: data.title,
            user:user,
            device: data.option,
            description:data.description
          });
          const addDevice = await device.save();
          resp.send({ msg: addDevice ? "Device Added" : "Failed to Add Device!!!" });
      } else {
        resp.send({ errMsg1: `${data.email} does not exist in system!!!` });
      }
})
router.get("/",async(req,resp)=>{
  const devices = await deviceModel.find();
  devices?resp.send({msg:devices}):resp.send({errMsg1:'Failed to fetched devices!!!'})
})
module.exports=router;