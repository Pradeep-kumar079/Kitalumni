const Post = require("../model/postmodel"); 
const Usermodel = require("../model/usermodel");
const Suggestion = require("../model/Suggestion");

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const allposts = await Post.find().populate("user", "username profileimg");

let currentUser = req.session.user;
 

allposts.forEach((post) => {
  console.log("post.user._id:", post.user?._id?.toString());
});

console.log("currentUser._id:", currentUser?._id?.toString());

res.render("home", {
  allposts,
  currentUser,
});

  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get a single post by ID
exports.getSinglePost = async (req, res) => {
  try {
    let { id } = req.params;
    console.log("Post ID:", id);

    let post = await Post.findById(id).populate("user", "username profileimg"); // Populate if you need user info
    if (!post) {
      return res.status(404).send("Post not found");
    }

   
    console.log("Post found:", post);

    const suggestions = await Suggestion.find({ postId: post._id });
    console.log("Suggestions found:", suggestions);
    const user = await Usermodel.findById(req.session.userId);


    res.render("post", {
      post,
      suggestions: suggestions || [],
      currentUser: user || null,  
    });

  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send("Server Error");
  }
};
