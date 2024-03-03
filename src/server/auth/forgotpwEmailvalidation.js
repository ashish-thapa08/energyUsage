require('../connection/conn')
const express = require("express");
const userModel = require("../Model/User")
const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = express.Router();
router.post("/",async(req,resp)=>{
    let data = req.body;
    console.log(data)
    const userExist = await userModel.findOne({ email: data.email });
    if (userExist) {
        return resp.send({ msg: userExist.email });
      } else {
        console.log(data.email)
        resp.send({ errMsg1: `${data.email} does not exist in system!!!` });
      }
})
router.put("/", async (req, resp) => {
    const data = req.body;
    bcrypt.hash(data.password, saltRounds, async (err, hash) => {
      if (err) throw err;
      const newValues = {
        $set: {
          password: hash,
        },
      };
      const update = await userModel.updateOne({ email: data.email }, newValues);
      if (update) {
        resp.send({msg:`${data.email} Password Recover Successfully!`});
      }
    });
  });
module.exports=router;