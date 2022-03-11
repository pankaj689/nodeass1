const express = require("express");
const mongoose = require('mongoose');
const User=require("../module/loginschema")
var bodyParser = require('body-parser')
const router=express.Router();
const { body, param,validationResult } = require('express-validator');
router.use(bodyParser())

router.get("/",async(req,res)=>{
    const user = await User.find()
    res.json({user})
})
//Post router to create the data
router.post("/",body("email").isEmail(),async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const user=await User.create(req.body)
        res.status(200).json({
            status:"success",
            // data:user
        })
    }catch (e){
        res.status(401).json({
            status:"failed",
            message:e.message
        })
    }
   
})


// wrong API ,Nothing is found linkaddress(*) use
router.get("*",(req,res)=>{
      
    return res.status(404).json({
         status:"failed",
         message:"wrong API"
     })
})

//Put opretion to update data
router.put("/:id",async(req,res)=>{
    try {
        console.log("req.body1",req.body)
        await User.updateOne({_id:req.params.id},req.body)  //{_id:req.query.params.id
        console.log("req.body1",req.body)
        return res.json({
            "status":"sucsess",
            // data:user2
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status:"faile",
            message:e.message
        })   
    }
})  

//Delet item

router.delete("/:id",async(req,res)=>{
    try {
        await User.deleteOne({_id:req.params.id})  //{_id:req.query.params.id
        return res.status(200).json({
            "status":"sucsess",
            // data:user2
        });
    } catch (e) {
        console.log(e)
        return res.status(401).json({
            status:"faile",
            message:e.message
        })   
    }
})
module.exports = router;