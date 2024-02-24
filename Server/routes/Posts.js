const express = require('express')
const router = express.Router();
const { Posts }= require("../models")

//1. GetAll Posts
router.get("/",async(req,res)=>{
    //res.send("Hello");
    const listOfPosts = await Posts.findAll();
    //     {
    //     attributes:['title','id']
    // });
    res.json(listOfPosts);
});

//2. Create a new post
router.post("/",async (req,res)=>{
    const post = req.body;
    await Posts.create(post);
    console.log(post)
    res.json(post);
});

//3. get Post by ID
router.get('/:id',async (req,res)=>{
    const id = req.params.id;
    const post = await Posts.findByPk(id)
    res.json(post);
})


module.exports = router;