// backend/middlewares/uploads.js

const multer = require("multer");
const path = require("path");

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure the uploads folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword",
    "image/jpg",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type"), false); // Reject the file
  }
};

// Multer instance with storage, file filter, and size limit
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB file size limit
});

// Handle multiple file fields
const uploadFields = upload.fields([
  { name: "cover_image", maxCount: 5 }, // Allow only 1 file
  { name: "tinCertificate", maxCount: 5 }, // Allow up to 5 files
  { name: "businessLicense", maxCount: 3 }, // Allow up to 3 files
  { name: "businessRegistration", maxCount: 5 }, // Allow up to 5 files
  { name: "vatCertificate", maxCount: 3 }, // Allow up to 3 files
  { name: "nationalIdCard", maxCount: 5 }, // Allow up to 5 files
  { name: "documentsAuthDelegation", maxCount: 5 }, // Allow up to 5 files
  { name: "accessories_images", maxCount: 10 }, // Allow up to 5 files
  { name: "profile_picture", maxCount: 1 },
]);

module.exports = uploadFields;
