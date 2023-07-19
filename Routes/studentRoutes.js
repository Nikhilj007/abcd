const express = require("express");
const router = new express.Router();
const {
  Register,
  Students,
  updateStudents,
  DeleteStudent,
} = require("../controllers/studentControllers");

router.route("/newStudent").post(Register);
router.route("/").get(Students);
router.route("/updateStudent/:id").patch(updateStudents);
router.route("/deleteStudent/:id").delete(DeleteStudent);

module.exports = router;
