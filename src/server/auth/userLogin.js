require('../connection/conn')
const express = require("express");
const userModel = require("../Model/User")
const bcrypt = require("bcrypt");
const router = express.Router();
router.post("/",async(req,resp)=>{
    let data = req.body;
    const userExist = await userModel.findOne({ email: data.email });
    if (userExist) {
        bcrypt.compare(data.password, userExist.password, (err, validate) => {
          if (err) {
            throw err;
          }
          if (validate) {
                return resp.send({ msg: "login success:)" });
              }
               else {
            resp.send({ errMsg: `Password Invalid!!!` });
          }
        });
      } else {
        resp.send({ errMsg1: `${data.email} does not exist in system!!!` });
      }
})
module.exports=router;