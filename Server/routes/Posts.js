const express = require('express')
const router = express.Router();
const { Posts }= require("../models")

router.get("/",(req,res)=>{
    res.send("Hello");
});

router.post("/",(req,res)=>{
    const post = req.body;
    
});


module.exports = router;