// Get all doctors (approved only)
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// If you want to protect this route, ensure 'auth' is exported from users.js and imported correctly.
// For now, make it public to avoid [object Undefined] error.
router.get('/', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor', approved: true });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
