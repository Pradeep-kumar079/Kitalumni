const express = require("express");
const router = express.Router();
const Post = require("../model/postmodel");

router.post("/like", async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.json({ success: false });

    const index = post.likes.indexOf(userId);
    if (index === -1) {
      post.likes.push(userId); // Like
    } else {
      post.likes.splice(index, 1); // Unlike
    }

    await post.save();
    res.json({ success: true, likes: post.likes.length });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

module.exports = router;
