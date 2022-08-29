const express = require("express");
const router = express.Router();
const controller = require("../controller/auth_cotroller");

router.route("/signUp").post(controller.signUp);
router.route("/logIn").post(controller.logIn);

module.exports = router;
