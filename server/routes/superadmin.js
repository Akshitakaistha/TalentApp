const Admin = require('../models/Admin');
const { auth, authorizeRoles } = require('../middleware/auth');
const router = require('express').Router();

// Use auth and authorizeRoles middleware for all routes in this router
router.use(auth);
router.use(authorizeRoles('superadmin'));

// List all pending admins
router.get('/pending-admins', async (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  const admins = await Admin.find({ isApproved: false });
  res.json(admins);
});

// List all approved admins
router.get('/approved-admins', async (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  const admins = await Admin.find({ isApproved: true });
  res.json(admins);
});

// Get admin details by id
router.get('/admin/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Approve admin
router.put('/approve/:id', async (req, res) => {
  await Admin.findByIdAndUpdate(req.params.id, { isApproved: true });
  res.json({ success: true, message: 'Admin approved' });
});

// Edit admin details
router.put('/admin/:id', async (req, res) => {
  try {
    const updateData = req.body;
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedAdmin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.json({ success: true, admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete admin
router.delete('/admin/:id', async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.json({ success: true, message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reject admin
router.delete('/reject/:id', async (req, res) => {
  await Admin.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Admin rejected and deleted' });
});

module.exports = router;
