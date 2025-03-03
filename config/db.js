const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Remove useNewUrlParser and useUnifiedTopology
    // console.log("Connected to MongoDB:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
