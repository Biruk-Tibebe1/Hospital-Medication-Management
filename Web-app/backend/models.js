const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['doctor', 'nurse', 'family', 'card_room', 'admin'], required: true },
  approved: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

const patientSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  date_of_birth: String,
  gender: String,
  medical_record_number: String,
  room_number: String,
  admission_date: String,
  status: String,
  created_at: { type: Date, default: Date.now }
});

const medicationSchema = new mongoose.Schema({
  name: String,
  dosage_form: String,
  strength: String,
  description: String,
  created_at: { type: Date, default: Date.now }
});

const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  medication: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dosage: String,
  frequency: String,
  route: String,
  start_date: String,
  end_date: String,
  instructions: String,
  status: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Patient: mongoose.model('Patient', patientSchema),
  Medication: mongoose.model('Medication', medicationSchema),
  Prescription: mongoose.model('Prescription', prescriptionSchema)
};