
const mongoose = require('mongoose');

const masterclassSchema = new mongoose.Schema({
  masterClassBanner: {
    type: String,
    required: true
  },
  keyNotePic:{
    type: String,
    // required: true
  },
  companyBanner: {
    type: String,
    // required: true
  },
  viewers: {
    type: Number,
    default: 0
  },
  masterClassName: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: true
  }],
  keynoteSpeaker: {
    type: String,
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  // duration: {
  //   type: String,
  //   required: true
  // },
  location: {
    type: String,
    // enum: ['In Class', 'Online', 'Hybrid', 'Distance'],
    required: true
  },
  industryType: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  masterClassDesc: {
    type: String,
    required: true
  },
  meetingLink: {
    type: String
  },
  externalEventId: {
    type: String // If using Zoom, Calendly, etc.
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  duration: {
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

module.exports = mongoose.model('Masterclass', masterclassSchema);
