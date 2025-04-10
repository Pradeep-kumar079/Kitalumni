const Usermodel = require("../model/usermodel");
const postmodel = require("../model/postmodel");
const upload = require("../utils/upload");


// GET /upload - Render the upload page
exports.getUploadPage = async (req, res, next) => {
  try {
    console.log("Session at /upload:", req.session);

    if (!req.session.userId) {
      return res.status(401).send("Session not found. Please log in.");
    }

    let find = await Usermodel.findOne({ _id: req.session.userId });
    console.log("User Found:", find);
    res.render("upload", { find });
  } catch (err) {
    next(err);
  }
};

// POST /upload - Handle the post upload
exports.createUpload = async (req, res, next) => {
  try {
    console.log("Files received:", req.files);
    console.log("Body received:", req.body);
    console.log("Session Data:", req.session);

    if (!req.session.userId) {
      console.error("User not found in session");
      return res.status(401).send("User not found. Please log in.");
    }

    let find = await Usermodel.findOne({ _id: req.session.userId });
    if (!find) {
      console.error("User not found in DB");
      return res.status(400).send("User not found");
    }

    const post = {
      title: req.body.title,
      description: req.body.description,
      hashtags: req.body.hashtags,
      postimg: req.files.postimg ? req.files.postimg[0].filename : null,
      videopost: req.files.videopost ? req.files.videopost[0].filename : null,
      user: find._id,
    };

    const createpost = await postmodel.create(post);

    // Update user's posts array with the new post
    await Usermodel.findByIdAndUpdate(
      req.session.userId,
      { $push: { posts: createpost._id } },
      { new: true }
    );

    res.redirect("/home");
  } catch (err) {
    next(err);
  }
};
