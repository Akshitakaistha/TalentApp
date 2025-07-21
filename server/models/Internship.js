
const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  internshipBanner: {
    type: String,
    required: true
  },
  companyBanner: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  internshipName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: true
  }],
  companyName: {
    type: String,
    required: true
  },
  stipend: {
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
  workingHours: {
    type: String,
    required: true
  },
  jobProfile: { // Equivalent to eligibilty in the frontend
    type: String,
    required: true
  },
  shiftType: {
    type: String,
    required: true
  },
  companyDesc: {
    type: String,
    required: true
  },
  softSkills: [{
    type: String,
    required: true
  }],
  perks: {
    type: String,
    required: true
  },
  freeOrPaid:{
    type: Boolean,
    required: true
  },
  lastDateToApply: {
    type: Date,
    required: true
  },
  companySize: {
    type: Number,
    required: true
  },
  foundingYear: {
    type: Number,
    required: true
  },
  companyType: {
    type: String
  },
  industryType: {
    type: String
  },
  companyWebsiteUrl: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    // required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Internship', internshipSchema);
