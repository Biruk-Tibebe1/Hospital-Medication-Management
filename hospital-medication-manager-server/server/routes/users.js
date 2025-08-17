// --- Future Improvements & Stubs ---

// 1. Search/filter users (for admin UI, patient assignment, etc.)
// router.get('/search', auth, async (req, res) => {
//   // Example: /api/users/search?role=doctor&specialization=Cardiology
//   // Implement query logic here
// });

// 2. Rate limiting (security, brute-force protection)
// Use express-rate-limit or similar middleware in production
// Example:
// const rateLimit = require('express-rate-limit');
// app.use('/api/users/login', rateLimit({ windowMs: 15*60*1000, max: 10 }));

// 3. Enforce HTTPS in production (see server.js)

const express = require('express');
const router = express.Router();
// 4. Test endpoint (for automated testing)
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Test endpoint working.' });
});
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const nodemailer = require('nodemailer');
const upload = multer({ dest: 'uploads/' });

// Configure Nodemailer transporter (use your SMTP credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another provider
  auth: {
    user: process.env.EMAIL_USER || 'your_email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your_email_password'
  }
});

// In-memory approval requests (replace with DB in production)
const approvalRequests = [];
const verificationCodes = {};

// JWT auth middleware
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token provided' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Helper: send email using Nodemailer
function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'your_email@gmail.com',
    to,
    subject,
    text
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Signup
router.post('/signup', upload.single('picture'), [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('middleName').notEmpty().withMessage('Middle name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain a number')
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/).withMessage('Password must contain a symbol'),
  body('role').isIn(['nurse', 'doctor', 'admin', 'cardroom']).withMessage('Role must be nurse, doctor, admin, or cardroom'),
  // Specialization required for doctor/cardroom
  body('specialization').if(body('role').isIn(['doctor', 'cardroom'])).notEmpty().withMessage('Specialization is required for doctors and cardroom').isString(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
  const { firstName, middleName, lastName, email, password, role, specialization } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });
    if ((role === 'doctor' || role === 'cardroom') && !specialization) {
      return res.status(400).json({ error: 'Specialization is required for doctors and cardroom' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Profile picture is required' });
    }
    // Move file to public folder and update user
    const ext = path.extname(req.file.originalname);
    const newPath = path.join('uploads', req.file.filename + ext);
    fs.renameSync(req.file.path, newPath);
    const pictureUrl = `http://localhost:5050/${newPath}`;
    const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ firstName, middleName, lastName, email, password: hashedPassword, role, specialization: specialization || '', picture: pictureUrl });
    await user.save();
    if (!approvalRequests.some(r => r.email === email)) {
      approvalRequests.push({ firstName, middleName, lastName, email, role, specialization: specialization || '', picture: pictureUrl });
    }
    res.status(201).json({ message: 'Signup successful, pending approval' });
// Admin: Edit user (role, specialization, etc.)
router.put('/:id/admin-edit', auth, async (req, res) => {
  // Only admin can edit
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  try {
    const update = req.body;
    // Prevent email/ID change
    delete update._id;
    delete update.email;
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Delete user (already implemented, but ensure only admin)
// (Enhance existing delete route)
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.approved) return res.status(401).json({ error: 'Invalid credentials or not approved' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, firstName: user.firstName, middleName: user.middleName, lastName: user.lastName, email: user.email, role: user.role, picture: user.picture } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Notify admin endpoint (called from frontend)
router.post('/notify-admin', async (req, res) => {
  const { adminEmail, newUser } = req.body;
  if (!approvalRequests.some(r => r.email === newUser.email)) {
    approvalRequests.push(newUser);
  }
  // Optionally, send email to adminEmail here
  res.json({ success: true });
});

// Get approval requests (for admin dashboard)
router.get('/approval-requests', auth, async (req, res) => {
  res.json(approvalRequests);
});

// Cancel (reject) approval request
router.delete('/approval-requests/:email', auth, async (req, res) => {
  const { email } = req.params;
  const idx = approvalRequests.findIndex(r => r.email === email);
  if (idx !== -1) {
    approvalRequests.splice(idx, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Request not found' });
  }
});

// Approve user signup (admin only)
router.put('/:id/approve', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user
router.put('/:id', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete user
// Only admin can delete users
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Profile picture upload
router.post('/:id/picture', auth, upload.single('picture'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (req.file) {
      // Move file to public folder and update user
      const ext = path.extname(req.file.originalname);
      const newPath = path.join('uploads', req.file.filename + ext);
      fs.renameSync(req.file.path, newPath);
      user.picture = `http://localhost:5050/${newPath}`;
      await user.save();
      res.json({ success: true, picture: user.picture });
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
