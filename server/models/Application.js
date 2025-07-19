const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  qualification: { type: String, required: true },
  dob: { type: Date, required: true },
  resume: { type: String, required: true }, // path to uploaded resume file
  relatedTo: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'applicationType' },
  applicationType: { type: String, required: true, enum: ['Internship', 'Job', 'Bootcamp', 'PostGrad', 'Masterclass'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
