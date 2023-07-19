const mongoose = require("mongoose");

const connectDb = async () => {
  const db = await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("Database not connected", err.message);
    });
};

module.exports = connectDb;
