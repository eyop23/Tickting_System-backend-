const express = require("express");
const { authenticate, isAdmin } = require("../middlewares/auth");
const {
  createTicket,
  getTickets,
  updateTicket,
} = require("../controllers/admin");

const router = express.Router();

router.post("/tickets", authenticate, createTicket);
router.get("/tickets", authenticate, getTickets);
router.put("/tickets/:id", authenticate, isAdmin, updateTicket);

module.exports = router;
