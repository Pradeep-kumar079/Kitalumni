const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth"); 
const profileController = require("../controllers/profileController");
const upload = require("../utils/upload"); // Import the upload middleware

router.get("/:id", isAuth, profileController.getProfile);
router.get("/:id/edit", isAuth, profileController.getEditProfile);
router.post("/:id/edit", isAuth, upload.single('profileimg'), profileController.postEditProfile);


module.exports = router;
