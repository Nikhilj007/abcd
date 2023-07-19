const express = require("express");
const {
  createWeekProgress,
  ReadProgress,
  updateWeekProgress,
  deleteweekProgress,
} = require("../controllers/progressControllers");
const router = express.Router();

router
  .route("/:studentId")
  .post(createWeekProgress)
  .get(ReadProgress)
  .patch(updateWeekProgress)
  .delete(deleteweekProgress);

module.exports = router;
