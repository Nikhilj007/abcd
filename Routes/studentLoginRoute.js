const express = require("express");
const router = new express.Router();

const { loginStudent } = require("../controllers/studentLoginController");

router.route("/login").post(loginStudent);
module.exports = router;
