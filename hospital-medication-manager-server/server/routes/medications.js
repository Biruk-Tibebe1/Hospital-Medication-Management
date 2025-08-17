// Search/filter medications (by name, patient, prescribedBy, etc.)
router.get('/search', async (req, res) => {
  try {
    const { name, patient, prescribedBy } = req.query;
    let query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (patient) query.patient = patient;
    if (prescribedBy) query.prescribedBy = prescribedBy;
    const medications = await Medication.find(query).populate('patient prescribedBy');
    res.json(medications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication');

// Create medication
router.post('/', async (req, res) => {
  try {
    const medication = new Medication(req.body);
    await medication.save();
    res.status(201).json(medication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all medications
router.get('/', async (req, res) => {
  try {
    const medications = await Medication.find().populate('patient prescribedBy');
    res.json(medications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single medication
router.get('/:id', async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id).populate('patient prescribedBy');
    if (!medication) return res.status(404).json({ error: 'Medication not found' });
    res.json(medication);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update medication
router.put('/:id', async (req, res) => {
  try {
    const medication = await Medication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medication) return res.status(404).json({ error: 'Medication not found' });
    res.json(medication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete medication
router.delete('/:id', async (req, res) => {
  try {
    const medication = await Medication.findByIdAndDelete(req.params.id);
    if (!medication) return res.status(404).json({ error: 'Medication not found' });
    res.json({ message: 'Medication deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
