const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { User } = require('./models');

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const password = await bcrypt.hash('admin123', 10); // Change 'admin123' to your desired password

  const admin = new User({
    name: 'Admin',
    email: 'admin@hospital.com',
    password,
    role: 'admin'
  });

  await admin.save();
  console.log('Admin user created!');
  mongoose.disconnect();
}

createAdmin().catch(err => {
  console.error(err);
  mongoose.disconnect();
});