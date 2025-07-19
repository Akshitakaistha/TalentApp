const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const multiUpload = upload.fields([
  { name: 'internshipBanner', maxCount: 1 },
  { name: 'companyBanner', maxCount: 1 }
]);

// GET all internships
router.get('/', async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create internship
router.post('/', auth, multiUpload, async (req, res) => {
  try {
    const internshipData = {
      ...req.body,
      internshipBanner: req.files['internshipBanner'] ? `/uploads/${req.files['internshipBanner'][0].filename}` : '',
      companyBanner: req.files['companyBanner'] ? `/uploads/${req.files['companyBanner'][0].filename}` : '',
      skills: Array.isArray(req.body.skills) ? req.body.skills : req.body.skills.split(',').map(s => s.trim()),
      stipend: req.body.stipend || ''
    };

    const internship = new Internship(internshipData);
    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE internship
router.delete('/:id', auth, async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: 'Internship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update internship
router.put('/:id', auth, multiUpload, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      skills: Array.isArray(req.body.skills)
        ? req.body.skills
        : req.body.skills.split(',').map((s) => s.trim())
    };

    if (req.files['internshipBanner']) {
      updateData.internshipBanner = `/uploads/${req.files['internshipBanner'][0].filename}`;
    }
    if (req.files['companyBanner']) {
      updateData.companyBanner = `/uploads/${req.files['companyBanner'][0].filename}`;
    }

    const updatedInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedInternship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.json(updatedInternship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
