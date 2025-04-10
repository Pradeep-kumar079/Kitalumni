const Usermodel = require("../model/usermodel");

exports.getAlumniBatches = async (req, res) => {
  try {
    const batches = await Usermodel.aggregate([
      { $match: { role: "alumni" } },
      {
        $group: {
          _id: "$graduate",
          users: {
            $push: {
              _id: "$_id",
              username: "$username",
              profileimg: "$profileimg",
              email: "$email",
              branch: "$branch"
            }
          }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    if (batches.length === 0) return res.status(404).send("No alumni batches found.");
    res.render("home", { batches });
  } catch (err) {
    res.status(500).send("Server error.");
  }
};

exports.getStudentBatches = async (req, res) => {
  try {
    const studentBatches = await Usermodel.aggregate([
      { $match: { role: "student" } },
      { $group: { _id: "$graduate" } },
      { $sort: { "_id": 1 } }
    ]);
    res.render("home", { batchs: studentBatches });
  } catch (err) {
    res.status(500).send("Server error.");
  }
};

exports.getBatchesList = async (req, res) => {
  try {
    const batches = await Usermodel.aggregate([
      { $match: { role: "alumni" } },
      { $group: { _id: "$graduate" } },
      { $sort: { _id: 1 } }
    ]);
    res.render("users", { batches });
  } catch (err) {
    res.render("users", { batches: [] });
  }
};
