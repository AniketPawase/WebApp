const express = require('express');
const router = express.Router();
const { Posts,Likes } = require("../models");
const {validateToken} = require('../middlewares/AuthMIddleware')


// 1. Get All Posts
router.get("/",validateToken, async (req, res) => {
    try {
        const listOfPosts = await Posts.findAll({
            include : [Likes]
        });
        const likedPosts = await Likes.findAll({
            where: {UserId:req.user.id}
        });
        res.json({listOfPosts : listOfPosts,likedPosts:likedPosts});
    } catch (error) {
        console.error("Error fetching all posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 2. Create a new post
router.post("/",validateToken, async (req, res) => {
   
    try {
        const post = req.body;
        post.username = req.user.username;
        post.UserId=req.user.id
        await Posts.create(post);
        console.log(post);
        res.json(post); 
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 3. Get Post by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Posts.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 4. Delete our own post
router.delete('/:postId', validateToken, async (req, res) => {
    const postId = req.params.postId;

    try {
        await Posts.destroy({
            where: {
                id: postId,
            }
        });

        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "An error occurred while deleting the post" });
    }
});


//Getting posts by UserId
// 5. Get Post by ID
router.get('/byUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const listOfPosts = await Posts.findAll({
            where:{
                UserId: id
            },
            include : [Likes] 
        });
        if (!listOfPosts) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(listOfPosts);
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//6.Edit the Posts Title
router.put('/title',validateToken,async (req,res)=>{
    const {newTitle, id} = req.body;

    await Posts.update(
        {title: newTitle},
        {where:{
            id: id
        }})
        res.json(newTitle);
})

//6.Edit the Posts Body
router.put('/postText',validateToken,async (req,res)=>{
    const {newText, id} = req.body;

    await Posts.update(
        {postText: newText},
        {where:{
            id: id
        }})
        res.json(newText);
})

module.exports = router;
