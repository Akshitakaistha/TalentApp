
const mongoose = require('mongoose');

const globalSchema = new mongoose.Schema({
  banner: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: true
  }],
  organizationName: {
    type: String,
    required: true
  },
  courseFee: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  organizationWebsite: {
    type: String,
    required: true
  },
  courseType: {
    type: String,
    required: true
  },
  courseDetails: {
    type: String,
    required: true
  },
  industryDomain: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Global', globalSchema);
