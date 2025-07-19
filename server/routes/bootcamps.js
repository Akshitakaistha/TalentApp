const express = require('express');
const router = express.Router();
const Bootcamp = require('../models/Bootcamp');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const multiUpload = upload.fields([
  { name: 'bootcampBanner', maxCount: 1 },
  { name: 'companyBanner', maxCount: 1 }
]);

// GET all bootcamps
router.get('/', async (req, res) => {
  try {
    const bootcamps = await Bootcamp.find().sort({ createdAt: -1 });
    res.json(bootcamps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create bootcamp
router.post('/', auth, multiUpload, async (req, res) => {
  try {
    const bootcampData = {
      ...req.body,
      bootcampBanner: req.files['bootcampBanner'] ? `/uploads/${req.files['bootcampBanner'][0].filename}` : '',
      companyBanner: req.files['companyBanner'] ? `/uploads/${req.files['companyBanner'][0].filename}` : '',
      skills: Array.isArray(req.body.skills) ? req.body.skills : req.body.skills.split(',').map(s => s.trim())
    };

    const bootcamp = new Bootcamp(bootcampData);
    await bootcamp.save();
    res.status(201).json(bootcamp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE bootcamp
router.delete('/:id', auth, async (req, res) => {
  try {
    await Bootcamp.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bootcamp deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// New route to get bootcamp details by ID
router.get('/:id', async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(404).json({ message: 'Bootcamp not found' });
    }
    res.json(bootcamp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
