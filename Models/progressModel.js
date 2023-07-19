const mongoose = require("mongoose");

const weekDataSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true },
  moneySpent: { type: Number, required: true },
  moneyEarned: { type: Number, required: true },
  itemSold: { type: Number, required: true },
  loss: { type: Number, required: true },
  profit: { type: Number, required: true },
});

const progressSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  weeklyData: [weekDataSchema],
});

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;
