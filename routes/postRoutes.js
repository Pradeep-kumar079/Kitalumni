const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth"); 
const postController = require("../controllers/postController");

// Get all posts
router.get("/allpost", isAuth, postController.getAllPosts);

// Get a single post
router.get("/allpost/:id", isAuth, postController.getSinglePost);


module.exports = router;
