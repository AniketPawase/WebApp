const express = require('express');
const router = express.Router();
const { Posts } = require("../models");

// 1. Get All Posts
router.get("/", async (req, res) => {
    try {
        const listOfPosts = await Posts.findAll();
        res.json(listOfPosts);
    } catch (error) {
        console.error("Error fetching all posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 2. Create a new post
router.post("/", async (req, res) => {
    try {
        const post = req.body;
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

module.exports = router;
