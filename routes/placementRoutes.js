const express = require("express");
const router = express.Router();
const Placement = require("../model/placementmodel");
const Internship = require("../model/internshipSchema");
const multer = require("multer");
const upload = multer({ dest: "upload/" });
const Event = require("../model/eventSchema");
const Usermodel = require("../model/usermodel");
const Postmodel = require("../model/postmodel");

// GET /placements
router.get("/placement", async (req, res) => {
  try {
    const placements = await Placement.find();
    const internships = await Internship.find();
    res.render("uploadplacement", { placements, internships });
   
  } catch (err) {
    console.error("Error fetching placements:", err);
    res.status(500).send("Server Error");
  }
});

// POST /placement
router.post("/placement", upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const image = req.files['image'] ? req.files['image'][0].filename : null;
    const video = req.files['video'] ? req.files['video'][0].filename : null;

    const placedStudents = [];

    if (Array.isArray(req.body.studentNames)) {
      for (let i = 0; i < req.body.studentNames.length; i++) {
        placedStudents.push({
          name: req.body.studentNames[i],
          rollNo: req.body.studentRolls[i],
          branch: req.body.studentBranches[i],
        });
      }
    }

    const newPlacement = new Placement({
      company: req.body.company,
      role: req.body.role,
      package: req.body.package,
      placementDate: req.body.placementDate,
      placedStudents,
      image,
      video,
    });

    await newPlacement.save();
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error("Placement upload error:", err);
    res.status(500).send("Server Error");
  }
});
router.get("/internships", async (req, res) => {
  try {
    const internship = await Internship.find();
    res.render("uploadinternship", { internship });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}
);
router.post("/internships", upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const image = req.files['image'] ? req.files['image'][0].filename : null;
    const video = req.files['video'] ? req.files['video'][0].filename : null;

    const internStudents = [];

    if (Array.isArray(req.body.studentNames)) {
      for (let i = 0; i < req.body.studentNames.length; i++) {
        internStudents.push({
          name: req.body.studentNames[i],
          rollNo: req.body.studentRolls[i],
          branch: req.body.studentBranches[i],
        });
      }
    }

    const newInternship = new Internship({
      company: req.body.company,
      internRole: req.body.role,
      duration: req.body.duration,
      stipend: req.body.package,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      internStudents,
      image,
      video,
    });

    await newInternship.save();
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error("Internship upload error:", err);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
