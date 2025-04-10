const Usermodel = require("../model/usermodel");
const postmodel = require("../model/postmodel");

exports.getProfile = async (req, res) => {
  try {
    const user = await Usermodel.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const allposts = await postmodel.find({ _id: { $in: user.posts } });
    const sessionUserId = req.session.userId;

    const isConnected = sessionUserId && user.connections.includes(sessionUserId);

    res.render("profile", { 
      user, 
      allposts, 
      sessionUserId, 
      connectionCount: user.connections ? user.connections.length : 0,
      isConnected
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getEditProfile = async (req, res) => {
  try {
    let id = req.params.id.trim();

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Invalid User ID format");
    }

    let user = await Usermodel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (!req.session.userId || req.session.userId.toString() !== user._id.toString()) {
      return res.status(403).send("You are not authorized to edit this profile");
    }

    res.render("editprofile", { user, loggedInUser: req.session.userId.toString() });  
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.postEditProfile = async (req, res) => {
  try {
    const id = req.params.id.trim();

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).send("Invalid User ID format");
    }

    const user = await Usermodel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (!req.session.userId || req.session.userId.toString() !== user._id.toString()) {
      return res.status(403).send("You are not authorized to edit this profile");
    }

    const { username, bio, email, usn, branch, graduate } = req.body;

    if (bio && bio.length > 300) {
      return res.status(400).send("Bio must contain less than 300 characters");
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (typeof bio !== "undefined") updateData.bio = bio;
    if (email) updateData.email = email;
    if (usn) updateData.usn = usn;
    if (branch) updateData.branch = branch;
    if (graduate) updateData.graduate = graduate;
    if (req.file) updateData.profileimg = req.file.filename;

    const updatedUser = await Usermodel.findByIdAndUpdate(id, updateData, { new: true });
    console.log("Updated user:", updatedUser);
    console.log("Form data received:", req.body);


    // Optionally update session
    req.session.userEmail = updatedUser.email;
    return res.redirect(`/profile/${id}`);

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Internal Server Error");
  }
};
