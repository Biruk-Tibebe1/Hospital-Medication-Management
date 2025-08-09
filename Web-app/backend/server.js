const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User, Patient, Medication, Prescription } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Auth middleware
function auth(role) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (role && decoded.role !== role && decoded.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }
      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
}

// Public registration for all roles
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!['doctor', 'nurse', 'family', 'card_room', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: 'Email already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hash, role });
  await user.save();
  res.status(201).json({ message: 'User created' });
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  if (!user.approved) return res.status(403).json({ error: 'Account not approved by admin' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email } });
});

// Example: Get all patients (doctor, nurse, admin)
app.get('/api/patients', auth(), async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

// Example: Register patient (card_room, admin)
app.post('/api/patients', auth('card_room'), async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.status(201).json(patient);
});

// Example: Doctor prescribes medication
app.post('/api/prescriptions', auth('doctor'), async (req, res) => {
  const prescription = new Prescription({ ...req.body, doctor: req.user.id });
  await prescription.save();
  res.status(201).json(prescription);
});

// Example: Nurse gets prescriptions to administer
app.get('/api/prescriptions', auth('nurse'), async (req, res) => {
  const prescriptions = await Prescription.find().populate('patient medication doctor');
  res.json(prescriptions);
});

// Only admin can approve users
app.patch('/api/users/:id/approve', auth('admin'), async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'User approved', user });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => app.listen(5000, () => console.log('Server running on port 5000')))
.catch(err => console.error('MongoDB connection error:', err));
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));