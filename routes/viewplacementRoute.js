const express = require('express');
const router = express.Router();
const Event = require('../model/eventSchema');
const Usermodel = require('../model/usermodel');
const Postmodel = require('../model/postmodel');
const placements = require('../model/placementmodel');
const multer = require('multer');
const upload = multer({ dest: 'upload/' });

router.get("/viewplacement", async (req, res) => {
  try {
    const placement = await placements.find();
    res.render("placement", { placement });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}
);

module.exports = router;