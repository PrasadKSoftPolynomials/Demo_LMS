const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");
const verifyToken = require(
  "../../middleware/auth.middleware"
);

router.get(
  "/profile",
  verifyToken,
  authController.profile
);
router.post(
  "/register",
  authController.register
);

router.post(
  "/login",
  authController.login
);

module.exports = router;