const express = require('express');
const router = express.Router();
const Masterclass = require('../models/Masterclass');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const multiUpload = upload.fields([
  { name: 'masterClassBanner', maxCount: 1 },
  { name: 'companyBanner', maxCount: 1 }
]);

// GET all masterclasses
router.get('/', async (req, res) => {
  try {
    const masterclasses = await Masterclass.find().sort({ createdAt: -1 });
    res.json(masterclasses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create masterclass
router.post('/', auth, multiUpload, async (req, res) => {
  try {
    const masterclassData = {
      ...req.body,
      masterClassBanner: req.files['masterClassBanner'] ? `/uploads/${req.files['masterClassBanner'][0].filename}` : '',
      companyBanner: req.files['companyBanner'] ? `/uploads/${req.files['companyBanner'][0].filename}` : '',
      skills: Array.isArray(req.body.skills) ? req.body.skills : req.body.skills.split(',').map(s => s.trim())
    };

    const masterclass = new Masterclass(masterclassData);
    await masterclass.save();
    res.status(201).json(masterclass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE masterclass
router.delete('/:id', auth, async (req, res) => {
  try {
    await Masterclass.findByIdAndDelete(req.params.id);
    res.json({ message: 'Masterclass deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// New route to get masterclass details by ID
router.get('/:id', async (req, res) => {
  try {
    const masterclass = await Masterclass.findById(req.params.id);
    if (!masterclass) {
      return res.status(404).json({ message: 'Masterclass not found' });
    }
    res.json(masterclass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
