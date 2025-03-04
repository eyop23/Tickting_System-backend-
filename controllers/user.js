const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const ticket = new Ticket({ user: req.user.id, title, description });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getMe = async (req, res) => {
  const user = req.user;
  res.json({
    sucess: true,
    user,
  });
};
exports.getTickets = async (req, res) => {
  try {
    let tickets;
    // if (req.user.role === "admin") {
    //   tickets = await Ticket.find({ user: req.user.id }).populate(
    //     "user",
    //     "name email"
    //   );
    // } else {
    tickets = await Ticket.find({ user: req.user.id }).populate(
      "user",
      "name email"
    );
    // }
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllUsers = async (req, res) => {
  const user = await User.find();
  res.json({
    success: true,
    user,
  });
};
exports.deleteAllUsers = async (req, res) => {
  const users = await User.deleteMany();
  res.json(users);
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
