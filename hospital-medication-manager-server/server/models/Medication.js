const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  prescribedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Medication', medicationSchema);
