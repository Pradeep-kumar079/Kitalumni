const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const {
  connectUser,
  disconnectUser,
  acceptRequest
} = require("../controllers/connectController");

router.get("/connect/:id", (req, res) => res.status(405).send("Method Not Allowed. Please use POST."));
router.post("/connect", connectUser);
router.post("/disconnect", isAuth, disconnectUser);
router.get("/accept-request", acceptRequest);

module.exports = router;
