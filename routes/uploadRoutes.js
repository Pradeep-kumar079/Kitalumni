const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const isAuth = require("../middleware/isAuth");

// Import your file upload middleware (configured with multer or similar)
const upload = require("../utils/upload");

// GET /upload - Render the upload page
router.get("/upload", isAuth, uploadController.getUploadPage);

// POST /upload - Handle post upload with file upload fields
router.post(
  "/upload",
  isAuth,
  upload.fields([
    { name: 'postimg', maxCount: 1 },
    { name: 'videopost', maxCount: 1 }
  ]),
  uploadController.createUpload
);

module.exports = router;
