const express = require('express');
const router = express.Router();
const usermodel = require('../model/usermodel');
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const Postmodel = require('../model/postmodel');
const Event = require('../model/eventSchema'); // <-- Import Event model
const placements = require('../model/placementmodel');


router.get("/viewinternships" , async(req, res) => {
    try {
        const internship = await placements.find();
        res.render("internship", { internship });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    res.render("internship");
}}
);

module.exports = router;