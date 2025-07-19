const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Application = require('../models/Application');

// Ensure the resumes upload directory exists
const resumesDir = path.join(__dirname, '../uploads/resumes');
if (!fs.existsSync(resumesDir)) {
  fs.mkdirSync(resumesDir, { recursive: true });
}

// Multer setup for resume uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resumesDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Create new application
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      qualification,
      dob,
      relatedTo,
      applicationType
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Resume file is required' });
    }

    if (!firstName || !lastName || !phoneNumber || !address || !email || !qualification || !dob || !relatedTo || !applicationType) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const resumePath = `/uploads/resumes/${req.file.filename}`;

    const newApplication = new Application({
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      qualification,
      dob,
      resume: resumePath,
      relatedTo,
      applicationType
    });

    await newApplication.save();
    res.status(201).json({ success: true, data: newApplication });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error creating application' });
  }
});

// Get applications by type and related entity id
router.get('/:applicationType/:relatedTo', async (req, res) => {
  try {
    const { applicationType, relatedTo } = req.params;
    const applications = await Application.find({ applicationType, relatedTo }).sort({ createdAt: -1 });
    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching applications' });
  }
});

// Update application by id
router.put('/:id', upload.single('resume'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.resume = `/uploads/resumes/${req.file.filename}`;
    }
    const updatedApplication = await Application.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedApplication) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, data: updatedApplication });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating application' });
  }
});

// Delete application by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApplication) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting application' });
  }
});

module.exports = router;
