
const mongoose = require('mongoose');

const bootcampSchema = new mongoose.Schema({
  bootcampBanner: {
    type: String,
    required: true
  },
  companyBanner:{
    type: String,
    required: true
  },
  viewers: {
    type: Number,
    default: 0
  },
  bootcampName: {
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
  location: {
    type: String,
    // enum: ['In Class', 'Online', 'Hybrid', 'Distance'],
    required: true
  },
  bootCampDesc: {
    type: String,
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
  organizerName:  {
     type: String 
    },
organizerWebsite: { 
  type: String
 },
 contactEmail: {
   type: String 
  },
  supportNumber: {
     type: String
     },
certificateAvailable: { 
  type: Boolean, default: false
},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    // required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bootcamp', bootcampSchema);
