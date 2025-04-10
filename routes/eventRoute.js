const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });

const Usermodel = require('../model/usermodel');
const Postmodel = require('../model/postmodel');
const Event = require('../model/eventmodel'); // <-- Import Event model

// Render event upload page
router.get('/event', (req, res) => {
  res.render('event'); 
});

// Handle event upload
router.post('/event', upload.fields([{ name: 'postimg' }, { name: 'videopost' }]), async (req, res) => {
  try {
    const { title, description, eventTime } = req.body;
    const image = req.files?.postimg?.[0];
    const video = req.files?.videopost?.[0];

    console.log('Event Data:', { title, description });
    console.log('Files:', { image, video });

    // Check if user is logged in
    if (!req.session.userId) {
      console.error("User not found in session");
      return res.status(401).send("User not found. Please log in.");
    }

    const user = await Usermodel.findById(req.session.userId);
    if (!user) {
      console.error("User not found in DB");
      return res.status(400).send("User not found");
    }

    // Save event to Event collection
    const newEvent = await Event.create({
      title,
      description,
      eventTime,
      postimg: image?.filename || null,
      videopost: video?.filename || null,
      user: user._id,
    });

    // Add event ID to user's events array
    await Usermodel.findByIdAndUpdate(user._id, {
      $push: { events: newEvent._id },
    });

    // Optional: also save to postmodel if you're treating events as posts
    // const post = await Postmodel.create({ ... });

    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error("Error uploading event:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/viewevent", async (req, res) => {
  try {
    const events = await Event.find().populate();
    res.render("viewevent", { events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Internal Server Error");
  }
});
 

module.exports = router;
