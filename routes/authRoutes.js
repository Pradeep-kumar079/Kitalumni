const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  logoutUser,
  renderLogoutGreeting,
  renderForgotPassword,
  forgotPassword,
  renderResetPassword,
  resetPassword
} = require("../controllers/authController");

const isAuth = require("../middleware/isAuth"); // adjust if needed


// Register Routes
router.get("/register", authController.getRegisterPage);
router.post("/register", authController.registerUser);

// Login Routes
router.get("/login", authController.getLoginPage);
router.post("/login", authController.loginUser);



router.get("/lgtmsg", isAuth, renderLogoutGreeting);
router.post("/logout", isAuth, logoutUser);

router.get("/forgot-password", renderForgotPassword);
router.post("/forgot-password", forgotPassword);

router.get("/reset-password/:token", renderResetPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
