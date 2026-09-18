const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/notes_db")
    .then(() => {
      console.log("MongoDB connected successfully -> notes_db");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
    });
};

module.exports = connectDB;
