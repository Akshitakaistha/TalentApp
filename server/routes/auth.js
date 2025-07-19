const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'SECRET'; // In production, use environment variable

// Super admin credentials (predefined)
const SUPERADMIN_PASSWORD_PLAIN = 'superpassword';
const SUPERADMIN_CREDENTIALS = {
  username: 'superadmin',
  passwordHash: bcrypt.hashSync(SUPERADMIN_PASSWORD_PLAIN, 10)
};

// Helper function to generate JWT token
function generateToken(user) {
  return jwt.sign(
    {
      id: user._id || 'superadmin',
      username: user.username,
      role: user.role || (user.username === SUPERADMIN_CREDENTIALS.username ? 'superadmin' : 'admin')
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
}

// Admin registration route
router.post('/register', async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: 'Admin with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin with isApproved false and createdBy 'self'
    const newAdmin = new Admin({
      username,
      email,
      phone,
      password: hashedPassword,
      isApproved: false,
      createdBy: 'self'
    });

    await newAdmin.save();

    res.json({ success: true, message: 'Registered successfully. Wait for Super Admin approval.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    let { username, password } = req.body;

    username = username.trim();
    password = password.trim();

    // Check if superadmin login
    if (username === SUPERADMIN_CREDENTIALS.username) {
      const isMatch = await bcrypt.compare(password, SUPERADMIN_CREDENTIALS.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      const token = generateToken({ username, role: 'superadmin' });
      return res.json({ success: true, token, user: { username, role: 'superadmin' } });
    }

    // Check admin in DB by username or email
    const admin = await Admin.findOne({ $or: [{ username }, { email: username }] });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if approved
    if (!admin.isApproved) {
      return res.status(403).json({ success: false, message: 'Your account is not approved by Super Admin yet.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken({ _id: admin._id, username: admin.username, role: 'admin' });
    res.json({ success: true, token, user: { id: admin._id, username: admin.username, role: 'admin' } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// Verify route
router.get('/verify', (req, res) => {
  res.json({ success: true, user: { username: 'superadmin' } });
});

module.exports = router;
