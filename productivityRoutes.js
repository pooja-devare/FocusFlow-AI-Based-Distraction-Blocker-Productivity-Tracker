const express = require('express');
const router = express.Router();
const Productivity = require('../models/Productivity');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

router.post('/add', authMiddleware, async (req, res) => {
  const { focusedMinutes, distractionsBlocked } = req.body;
  try {
    const record = new Productivity({
      user: req.userId,
      focusedMinutes,
      distractionsBlocked,
    });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const records = await Productivity.find({ user: req.userId }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;