const express = require('express');
const router = express.Router();
const Usermodel = require('../model/usermodel'); // Make sure to import the model
const postmodel = require('../model/postmodel'); // Make sure to import the model
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/admin/users', async(req, res) => {
  const users = await Usermodel.find();
  res.render('manageusers',{ users });
}
);

module.exports = router;