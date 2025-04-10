const Post = require("../model/postmodel");
const Suggestion = require("../model/Suggestion");

// Get suggestions for a post
exports.getPostSuggestions = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    const suggestions = await Suggestion.find({ postId: req.params.postId }).sort({ createdAt: -1 });

    res.render("post", { post, suggestions });
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).send("Internal Server Error");
  }
};

// Post a suggestion for a post
exports.addSuggestion = async (req, res) => {
  try {
    const { suggestion } = req.body;

    if (!suggestion || suggestion.trim() === "") {
      return res.status(400).send("Suggestion cannot be empty");
    }

    const newSuggestion = new Suggestion({
      postId: req.params.postId,
      text: suggestion.trim(),
    });

    await newSuggestion.save();
    res.redirect(`/post/${req.params.postId}`);
  } catch (err) {
    console.error("Error saving suggestion:", err);
    res.status(500).send("Internal Server Error");
  }
};
