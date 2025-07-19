const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const multiUpload = upload.fields([
  { name: 'jobBanner', maxCount: 1 },
  { name: 'companyBanner', maxCount: 1 }
]);

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create job
router.post('/', auth, multiUpload, async (req, res) => {
  try {
    console.log('User info:', req.user);
    const jobData = {
      ...req.body,
      jobBanner: req.files['jobBanner'] ? `/uploads/${req.files['jobBanner'][0].filename}` : '',
      companyBanner: req.files['companyBanner'] ? `/uploads/${req.files['companyBanner'][0].filename}` : '',
      skills: Array.isArray(req.body.skills) ? req.body.skills : req.body.skills.split(',').map(s => s.trim())
    };

    // Conditionally set createdBy based on user role
    if (req.user.role === 'admin') {
      jobData.createdBy = req.user._id;
    }

    console.log('Job data before save:', jobData);

    const job = new Job(jobData);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE job
router.delete('/:id', auth, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// New route to get job details by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
