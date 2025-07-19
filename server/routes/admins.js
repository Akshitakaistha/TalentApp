const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Temporary API to list all admins with username and approval status
router.get('/list', async (req, res) => {
  try {
    const admins = await Admin.find({}, 'username isApproved');
    res.json({ success: true, admins });
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ success: false, message: 'Server error fetching admins' });
  }
});

module.exports = router;
