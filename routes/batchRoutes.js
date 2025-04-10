const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const {
  getAlumniBatches,
  getStudentBatches,
  getBatchesList
} = require("../controllers/batchController");

router.get("/batches", isAuth, getAlumniBatches);
router.get("/batches-students", isAuth, getStudentBatches);
router.get("/users", isAuth, getBatchesList);

module.exports = router;
