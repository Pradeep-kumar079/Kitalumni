const Usermodel = require('../model/usermodel');

exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await Usermodel.countDocuments();
    const activeUsers = await Usermodel.countDocuments({
      lastActive: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24) } // users active in the last 24 hours
    });

    res.render('admin/dashboard', {
      totalUsers,
      activeUsers
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.editUserForm = async (req, res) => {
  try {
    const user = await Usermodel.findById(req.params.id);
    res.render('admin/editusermodel', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('User not found');
  }
};

exports.updateUser = async (req, res) => {
  try {
    await Usermodel.findByIdAndUpdate(req.params.id, {
      role: req.body.role
    });
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Update failed');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await Usermodel.findByIdAndDelete(req.params.id);
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Delete failed');
  }
};

exports.getuploadplacement = (req, res) => {
  res.render('admin/uploadplacement');
};
exports.postuploadPlacement = async (req, res) => {
  try {
    const { title, description, companyName, package } = req.body;
    const placementData = {
      title,
      description,
      companyName,
      package
    };

    // Save placement data to database (assuming you have a Placement model)
    await placements.create(placementData);
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Placement upload failed');
  }
};