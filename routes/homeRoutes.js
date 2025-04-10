// routes/homeRoutes.js
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const isAuth = require("../middleware/isAuth");

// Route: /home/
router.get("/home", isAuth, homeController.getHomePage);

// Route: /home/search?q=

router.get('/search-json', isAuth, homeController.searchUsersAndPostsJSON);

module.exports = router;
