const StudentProgress = require("../Models/progressModel");

const createWeekProgress = async (req, res) => {
  try {
    const {
      studentId,
      weekNumber,
      moneySpent,
      moneyEarned,
      itemSold,
      loss,
      profit,
    } = req.body;

    const progress = await StudentProgress.findOne({ studentId });

    if (!progress) {
      // If progress data doesn't exist for the student, create a new document
      await StudentProgress.create({
        studentId,
        weeklyData: [
          {
            weekNumber,
            moneySpent,
            moneyEarned,
            itemSold,
            loss,
            profit,
          },
        ],
      });

      res.status(201).json({ message: "Week data created successfully" });
    } else {
      // If progress data exists, update the week data
      const updatedProgress = await StudentProgress.findOneAndUpdate(
        { studentId },
        {
          $push: {
            weeklyData: {
              weekNumber,
              moneySpent,
              moneyEarned,
              itemSold,
              loss,
              profit,
            },
          },
        },
        { new: true }
      );

      res.status(200).json({
        message: "Week data updated successfully",
        progress: updatedProgress,
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating/updating week data" });
  }
};

const ReadProgress = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    console.log(studentId);
    const progress = await StudentProgress.findOne({ studentId });
    if (progress) {
      res.status(200).json(progress);
    } else {
      res.status(400).send("Student not found, please check");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred", error);
  }
};
const updateWeekProgress = async (req, res) => {
  try {
    const {
      studentId,
      weekNumber,
      moneySpent,
      moneyEarned,
      itemSold,
      loss,
      profit,
    } = req.body;

    const updatedProgress = await StudentProgress.findOneAndUpdate(
      { studentId, "weeklyData.weekNumber": weekNumber },
      {
        $set: {
          "weeklyData.$.moneySpent": moneySpent,
          "weeklyData.$.moneyEarned": moneyEarned,
          "weeklyData.$.itemSold": itemSold,
          "weeklyData.$.loss": loss,
          "weeklyData.$.profit": profit,
        },
      },
      { new: true }
    );

    if (!updatedProgress) {
      // If progress data or week data not found, return an error
      return res.status(404).json({ error: "Week data not found" });
    }

    res.status(200).json({
      message: "Week data updated successfully",
      StudentProgress: updatedProgress,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating week data" });
  }
};
const deleteweekProgress = async (req, res) => {
  try {
    const studentId = req.params.id;

    const delStudent = await StudentProgress.findOne({ studentId });
    if (!delStudent) {
      res
        .status(404)
        .json({ message: "Student ID not correct or student not found" });
      return;
    }
    const result = await StudentProgress.deleteOne({ studentId });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Student deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the student" });
  }
};
module.exports = {
  createWeekProgress,
  ReadProgress,
  updateWeekProgress,
  deleteweekProgress,
};
