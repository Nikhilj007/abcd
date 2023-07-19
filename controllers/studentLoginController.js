const StudentRegister = require("../Models/studentModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");

const loginStudent = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await StudentRegister.findOne({ email });
  console.log(user._id);
  if (!user) {
    console.log("user not fond please check the details");
  }

  const checkPassword = await user.matchPassword(password);
  if (user && checkPassword) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
    console.log("user fond");
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});
module.exports = { loginStudent };
