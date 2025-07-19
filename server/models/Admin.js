const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  phone: String,
  password: String,
  isApproved: { type: Boolean, default: false },
  createdBy: { type: String, default: 'self' } // 'superadmin' or 'self'
});

module.exports = mongoose.model('Admin', adminSchema);
