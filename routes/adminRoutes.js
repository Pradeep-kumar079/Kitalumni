const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const Usermodel = require('../model/usermodel');

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) return next();
  res.redirect('/login');
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.session.userRole === 'admin') return next();
  res.status(403).send('Access denied: Admins only');
};

// Optional: Direct dashboard route (for testing or override)
router.get('/admin/dashboard', isAuthenticated, isAdmin, async (req, res) => {
  const users = await Usermodel.find();
  res.render('admin/dashboard', { users });
});

// Admin Routes
router.get('/dashboard', isAuthenticated, isAdmin, adminController.getDashboard);
router.get('/user/edit/:id', isAuthenticated, isAdmin, adminController.editUserForm);
router.post('/user/edit/:id', isAuthenticated, isAdmin, adminController.updateUser);
router.post('/user/delete/:id', isAuthenticated, isAdmin, adminController.deleteUser);

//upload placement
router.get('/placement', isAuthenticated, isAdmin,adminController.getuploadplacement);
router.post('/placement', isAuthenticated, isAdmin, adminController.postuploadPlacement);

module.exports = router;
