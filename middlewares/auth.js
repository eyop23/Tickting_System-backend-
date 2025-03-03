const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path to your User model
const authenticate = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Extract token
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Decode token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user in the database
    const user = await User.findById(decoded.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach full user object to request
    next();
  } catch (error) {
    // console.error("Error protecting route: ", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Not authorized, token expired" });
    }
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

const isAdmin = (req, res, next) => {
  // Check if the logged-in user has an "admin" role
  if (req.user && req.user.role === "admin") {
    return next(); // Proceed to the next middleware or route handler
  } else {
    return res.status(403).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { authenticate, isAdmin };
