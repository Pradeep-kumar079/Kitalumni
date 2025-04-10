const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth") 
const suggestionController = require("../controllers/suggestionController");

// Get post suggestions
router.get("/post/:postId", isAuth, suggestionController.getPostSuggestions);

// Post a suggestion
router.post("/post/:postId/suggestion", isAuth, suggestionController.addSuggestion);

module.exports = router;
