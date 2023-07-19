const StudentRegister = require("../Models/studentModel");
const axios = require("axios");
const Register = async (req, res, next) => {
  const { studentName, studentEmail, studentId, studentPassword } = req.body;

  try {
    if (!studentName || !studentEmail || !studentId || !studentPassword) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }

    const studentExists = await StudentRegister.findOne({ studentId });
    if (studentExists) {
      res.status(400).json({ error: "Student details already exist" });
      return;
    }

    const studentData = await StudentRegister.create(req.body);

    res.status(200).json({
      success: true,
      studentData,
    });
  } catch (error) {
    next(error);
  }
};

const Students = async (req, res) => {
  const studentData = await StudentRegister.find();
  res.status(201).json({ studentData });
};

const updateStudents = async (req, res) => {
  try {
    const studentId = req.params.id;
    const updateStudent = await StudentRegister.findOneAndUpdate(
      { studentId },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json(updateStudent);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the student" });
  }
};

const DeleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const delStudent = await StudentRegister.findOne({ studentId });
    if (!delStudent) {
      res
        .status(404)
        .json({ message: "Student ID not correct or student not found" });
      return;
    }
    const result = await StudentRegister.deleteOne({ studentId });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Student deleted successfully" });
      // let config = {
      //   method: "delete",
      //   maxBodyLength: Infinity,
      //   url: `http://localhost:5000/studentProgress/${studentId}`,
      //   headers: {},
      // };

      // axios
      //   .request(config)
      //   .then((response) => {
      //     alert("The student progress is also deleted");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the student" });
  }
};

module.exports = { Register, Students, updateStudents, DeleteStudent };
