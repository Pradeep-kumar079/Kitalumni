// const express = require('express');
// const router = express.Router();
// const Post = require('../models/Post'); // Adjust the path as necessary

// // Route to render the edit form for a specific post
// router.get('/edit/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const post = await Post.findById(id);
//     if (!post) {
//       return res.status(404).send('Post not found');
//     }
//     res.render('editPost', { post });
//   } catch (error) {
//     console.error('Error fetching post:', error);
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;
