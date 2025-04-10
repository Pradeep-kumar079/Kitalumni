const express = require('express');
const router = express.Router();
const Post = require('../model/postmodel'); // Adjust the path as necessary

// Route to render the edit form for a specific post
router.get('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('editPost', { post });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('Server Error');
  }
});


// Route to handle the form submission for editing a post
router.post('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find the post by ID and update it with new data
    const updatedPost = await Post.findByIdAndUpdate(id, { title, description }, { new: true });

    if (!updatedPost) {
      return res.status(404).send('Post not found');
    }

    // Redirect or respond as needed
    res.redirect(`/post/${updatedPost._id}`);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
