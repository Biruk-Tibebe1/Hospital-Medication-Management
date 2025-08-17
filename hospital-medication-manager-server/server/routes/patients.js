
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
// Search/filter patients (by name, doctor, etc.)
router.get('/search', async (req, res) => {
  try {
    const { name, doctor } = req.query;
    let query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (doctor) query.doctor = doctor;
    const patients = await Patient.find(query).populate('medications');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create patient
router.post('/', async (req, res) => {
  try {
    // Find the latest patient by cardNumber (descending)
    const lastPatient = await Patient.findOne().sort({ cardNumber: -1 });
    let nextCardNumber = '00001';
    if (lastPatient && lastPatient.cardNumber) {
      const lastNum = parseInt(lastPatient.cardNumber, 10);
      nextCardNumber = (lastNum + 1).toString().padStart(5, '0');
    }
    const patientData = { ...req.body, cardNumber: nextCardNumber };
    const patient = new Patient(patientData);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find().populate('medications');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single patient
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('medications');
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update patient
router.put('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete patient
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
