const express = require("express");
const {
  signup,
  login,
  getAllUsers,
  deleteAllUsers,
  createTicket,
  getTickets,
  getMe,
} = require("../controllers/user");
const { authenticate, isAdmin } = require("../middlewares/auth");
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/", getAllUsers);
router.delete("/", deleteAllUsers);
router.get("/profile", authenticate, getMe);
router.get("/own_tickets", authenticate, getTickets);
router.post("/tickets", authenticate, createTicket);

module.exports = router;
