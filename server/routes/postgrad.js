
const express = require('express');
const router = express.Router();
const PostGrad = require('../models/PostGrad');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// GET all postgrad courses
router.get('/', async (req, res) => {
  try {
    const courses = await PostGrad.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create postgrad course
router.post('/', auth, upload.single('banner'), async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      banner: req.file ? `/uploads/${req.file.filename}` : '',
      skills: Array.isArray(req.body.skills) ? req.body.skills : req.body.skills.split(',').map(s => s.trim())
    };

    const course = new PostGrad(courseData);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE postgrad course
router.delete('/:id', auth, async (req, res) => {
  try {
    await PostGrad.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// New route to get postgrad details by ID
router.get('/:id', async (req, res) => {
  try {
    const postgrad = await PostGrad.findById(req.params.id);
    if (!postgrad) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(postgrad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
