
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobBanner: {
    type: String,
    required: true
  },
  companyBanner: {
    type: String,
    required: true
  },
  industryType : {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  jobName: {
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
  salaryPackage: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  companyWebsiteUrl: {
    type: String,
    required: true
  },
  workingHours: {
    type: String,
    required: true
  },
  jobProfile: {
    type: String,
    required: true
  },
  shiftType: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  applicationDeadline: { // New details
    type: Date,
    required: true
  },
  openings: {
    type: Number,
    required: true
  },
  perks: {
    type: String,
    required: true
  },
  eligibility: {
    type: String, 
    required: true
  },
  foundedYear: {
    type: Number,
    required: true
  },
  companyAddress: {
    type: String, 
    required: true
  },
  hiringProcess: {
    type: String,
    required: true
  },
  companyType: {
    type: String,
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    // required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);
