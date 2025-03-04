const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const loggerMiddleware = require("./middlewares/logger");

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Connect to the database
connectDB();
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Enable CORS with the specified options
// app.use(cors(corsOptions));
app.use(bodyParser.json()); // To parse JSON bodies
app.use(loggerMiddleware);
app.use("/uploads", express.static("uploads"));
// Middleware
app.use(express.json()); // Parse JSON bodies
// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
