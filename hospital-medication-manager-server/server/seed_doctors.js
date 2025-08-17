// Script to seed demo doctors into the database
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const doctors = [
  { name: 'Dr. John Smith', email: 'john.smith@hospital.com', password: 'Password123!', role: 'doctor', specialization: 'Cardiology', approved: true },
  { name: 'Dr. Emily Brown', email: 'emily.brown@hospital.com', password: 'Password123!', role: 'doctor', specialization: 'Neurology', approved: true },
  { name: 'Dr. Michael Lee', email: 'michael.lee@hospital.com', password: 'Password123!', role: 'doctor', specialization: 'Pediatrics', approved: true },
  { name: 'Dr. Sarah Kim', email: 'sarah.kim@hospital.com', password: 'Password123!', role: 'doctor', specialization: 'Orthopedics', approved: true }
];

async function seedDoctors() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hospital', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  for (const doc of doctors) {
    const exists = await User.findOne({ email: doc.email });
    if (!exists) {
      const hashed = await bcrypt.hash(doc.password, 10);
      await User.create({ ...doc, password: hashed });
      console.log(`Added: ${doc.name}`);
    } else {
      console.log(`Exists: ${doc.name}`);
    }
  }
  mongoose.disconnect();
}

seedDoctors();
