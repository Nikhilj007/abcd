const express = require("express");
const {
  createWeekProgress,
  ReadProgress,
  updateWeekProgress,
} = require("../controllers/progressControllers");
const router = express.Router();

router
  .route("/:studentId")
  .post(createWeekProgress)
  .get(ReadProgress)
  .patch(updateWeekProgress);

module.exports = router;
