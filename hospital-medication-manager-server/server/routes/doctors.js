// Get all doctors (approved only)
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('./users');

router.get('/doctors', auth, async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor', approved: true });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
