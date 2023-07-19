const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./database/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const studentRegister = require("./Routes/studentRoutes");
const studentProgress = require("./Routes/progressRoutes");
const studentLogin = require("./Routes/studentLoginRoute");
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDb();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/student", studentRegister);
app.use("/studentProgress", studentProgress);
app.use("/StudentLogin", studentLogin);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
  alert("Internal Server Error");
});

app.listen(PORT, () => {
  console.log("server connected");
});
