const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const {
  getAlumniByYear,
  getStudentsByYear
} = require("../controllers/studentController");

router.get("/users/:year", isAuth, getAlumniByYear);
router.get("/users/:year/students", isAuth, getStudentsByYear);

module.exports = router;
