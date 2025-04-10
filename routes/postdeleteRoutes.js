const express = require('express');
const router = express.Router();
const Post = require('../model/postmodel'); // Adjust the path as necessary

// Route to handle the deletion of a post
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).send('Post not found');
    }
    res.redirect('/'); // Redirect to the homepage or another appropriate page
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
