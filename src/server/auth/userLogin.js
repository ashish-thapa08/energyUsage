require('../connection/conn')
const express = require("express");
const router = express.Router();
router.post("/",async(req,resp)=>{
    let data = req.body;
    console.log(data)
    resp.send({msg:data})
})
module.exports=router;