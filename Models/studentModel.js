const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const StudentRegister = new mongoose.Schema({
  studentName: { type: "String", required: true },
  studentId: { type: String, required: true },
  studentEmail: { type: "String", required: true },
  studentPassword: { type: "String", required: true },
});
// check if the password is modified or not
StudentRegister.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  // create the salt for the password and hash it
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.studentPassword, salt);
});

// comapre the entered password with the hashed password
StudentRegister.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.studentPassword);
};
module.exports = mongoose.model("RegisteredStudent", StudentRegister);
