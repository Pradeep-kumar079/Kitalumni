// controllers/homeController.js
const Usermodel = require("../model/usermodel");
const postmodel = require("../model/postmodel");
const { connection } = require("mongoose");
const currentUser = require("../middleware/isAuth");
const Event = require("../model/eventmodel");

// 🔁 Helper: Load common home data
const loadHomeData = async () => {
  const allposts = (await postmodel.find().populate("user", "username profileimg")).reverse();
  const findalumni = await Usermodel.find({ role: "alumni" });
  const batchs = await Usermodel.aggregate([
    {
      $group: {
        _id: "$graduate",
        users: { $push: "$$ROOT" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return { allposts, findalumni, batchs };
};

// -------------------- Render Home Page -------------------- //
exports.getHomePage = async (req, res) => {
  try {
    const user = req.session.userId
      ? await Usermodel.findById(req.session.userId).populate("connections")
      : null;
      const events = await Event.find().populate();

    const { allposts, findalumni, batchs } = await loadHomeData();
    console.log("User Data:", user);

    res.render("home", {
      user,
      allposts,
      batchs,
      findalumni,
      searchedUser: null,
      posts: [],
      events,
      currentUser: req.session.userId,
      currentUserId: req.session.userId,
    });
  } catch (error) {
    console.error("Error fetching home data:", error);
    res.status(500).send("Internal Server Error");
  }
};
// In your controller (e.g., searchController.js)
exports.searchUsersAndPostsJSON = async (req, res) => {
  try {
    const query = req.query.q?.trim() || '';
    let users = [];
    let posts = [];

    if (query.startsWith('#')) {
      const tag = query.substring(1);
      posts = await postmodel.find({
        hashtags: { $regex: new RegExp(`^${tag}`, 'i') }
      }).select('_id title');
    } else if (query.length > 0) {
      users = await Usermodel.find({
        username: { $regex: query, $options: 'i' }
      }).select('_id username profileimg');

      posts = await postmodel.find({
        title: { $regex: query, $options: 'i' }
      }).select('_id title');
    }

    res.json({ users, posts });
  } catch (error) {
    console.error("Live search error:", error);
    res.status(500).json({ users: [], posts: [] });
  }
};
