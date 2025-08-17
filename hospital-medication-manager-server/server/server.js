// Serve uploaded images
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hospital', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// API routes
app.use('/api/patients', require('./routes/patients'));
app.use('/api/medications', require('./routes/medications'));
app.use('/api/users', require('./routes/users'));

// Basic route
app.get('/', (req, res) => {
  res.send('Hospital Medication Manager API');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
