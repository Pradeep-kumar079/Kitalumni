const express = require('express');
const router = express.Router();
const postmodel = require('../model/postmodel');
const usermodel = require('../model/usermodel');

router.get('/admin/reports', async (req, res) => {
  try {
    const reportedPosts = await postmodel
      .find({ "reports.0": { $exists: true } }) // Posts with at least one report
      .populate('user') // Post author
      .populate('reports.userId'); // Populate each reporter

    res.render('managereports', { reports: reportedPosts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
