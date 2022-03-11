const express = require("express")
const router = express.Router();
const Post = require("../module/postschema")
var bodyParser = require('body-parser')
router.use(bodyParser())

router.get("/post",async(req,res)=>{
    const post1= await Post.find({user: req.user})
    res.status(200).json({
        status:"success",
        post1
    })
})

router.post("/post",async(req,res)=>{
    const post = await Post.create({
        title:req.body.title,
        body:req.body.body,
        Image:req.body.Image,
        user:req.user
    })
    res.status(200).json({
        status:"succsess",
        post
    })
})

module.exports = router;