const Usermodel = require("../model/usermodel");

exports.getAlumniByYear = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const currentUser = await Usermodel.findById(req.session.userId).lean();

    const alumniUsers = await Usermodel.aggregate([
      { $match: { role: "alumni" } },
      {
        $group: {
          _id: "$graduate",
          branches: {
            $push: {
              branch: "$branch",
              _id: "$_id",
              username: "$username",
              profileimg: "$profileimg",
              email: "$email",
              usn: "$usn",
              role: "$role"
            }
          }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const selectedYearData = alumniUsers.find(item => item._id === year);
    if (!selectedYearData) return res.status(404).send("No alumni found for this graduation year.");

    const usersByBranch = selectedYearData.branches.reduce((acc, user) => {
      if (!acc[user.branch]) acc[user.branch] = [];
      acc[user.branch].push(user);
      return acc;
    }, {});

    res.render("users", { users: usersByBranch, currentUser, year });
  } catch (err) {
    res.status(500).send("Server error.");
  }
};

exports.getStudentsByYear = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const currentUser = await Usermodel.findById(req.session.userId).populate("connections").lean();

    const students = await Usermodel.aggregate([
      { $match: { role: "student", graduate: year } },
      {
        $lookup: {
          from: "users",
          localField: "connections",
          foreignField: "_id",
          as: "connectedUsers"
        }
      },
      {
        $group: {
          _id: "$branch",
          userList: {
            $push: {
              _id: "$_id",
              username: "$username",
              profileimg: "$profileimg",
              usn: "$usn",
              email: "$email",
              connections: "$connections"
            }
          }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const usersByBranch = {};
    students.forEach(branch => {
      usersByBranch[branch._id] = branch.userList;
    });

    res.render("students", { users: usersByBranch, currentUser, year });
  } catch (err) {
    res.status(500).send("Server error.");
  }
};
