const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const loginSchema = new mongoose.Schema({
  _id: { type: "String" },
  name: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
    unique: true,
  },
  password: {
    type: "String",
    required: true,
  },
});

// check if the password is modified or not
loginSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  // create the salt for the password and hash it
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// comapre the entered password with the hashed password
loginSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Login = mongoose.model("studentLogin", loginSchema);
module.exports = Login;
