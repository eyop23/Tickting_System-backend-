const express = require("express");
const { authenticate, isAdmin } = require("../middlewares/auth");
const {
  getTickets,
  updateTicket,
  deleteTickets,
} = require("../controllers/admin");

const router = express.Router();

router.get("/tickets", authenticate, getTickets);
router.delete("/tickets", deleteTickets);
router.put("/tickets/:id", authenticate, isAdmin, updateTicket);

module.exports = router;
