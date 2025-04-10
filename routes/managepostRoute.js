const express = require('express');
const router = express.Router();
const Usermodel = require('../model/usermodel'); 
const postmodel = require('../model/postmodel');
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const { isAdmin } = require('../middleware/isAdmin');

router.get('/admin/posts', async (req, res) => {
  console.log(' /admin/posts route hit');
  try {
    const users = await Usermodel.find();
    const posts = await postmodel.find().populate('user');
    res.render('manageposts', { users, posts }); 
  } catch (err) {
    console.error("Error loading admin posts:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/admin/posts/edit/:id', upload.fields([{ name: 'postimg' }, { name: 'videopost' }]), async (req, res) => {
  const { title, description } = req.body;
  const image = req.files?.postimg?.[0];
  const video = req.files?.videopost?.[0];

  console.log('Event Data:', { title, description });
  console.log('Files:', { image, video });

  const updateData = {
    title,
    description,
    postimg: image ? image.filename : undefined,
    videopost: video ? video.filename : undefined,
  };

  await postmodel.findByIdAndUpdate(req.params.id, updateData);
  res.redirect('/admin/posts');
}
);
router.post('/admin/posts/delete/:id', async (req, res) => {
  await postmodel.findByIdAndDelete(req.params.id);
  res.redirect('/admin/posts');
}
);
module.exports = router;