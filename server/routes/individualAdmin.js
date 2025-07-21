const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Internship = require('../models/Internship');
const Job = require('../models/Job');
const Masterclass = require('../models/Masterclass');
const Global = require('../models/Global');
const PostGrad = require('../models/PostGrad');
const Bootcamp = require('../models/Bootcamp');
const upload = require('../middleware/upload');
const multiUpload = upload.fields([
  { name: 'internshipBanner', maxCount: 1 },
  { name: 'companyBanner', maxCount: 1 },
  { name: 'jobBanner', maxCount: 1 },
  { name: 'masterClassBanner', maxCount: 1 },
  { name: 'bootcampBanner', maxCount: 1 }
]);

const JWT_SECRET = 'SECRET'; // Use environment variable in production

// Middleware to authenticate and get admin from token
async function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ success: false, message: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

// GET /api/individual-admin/dashboard
router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const admin = req.admin;

    let internships, jobs, masterclasses, globals, postgrads, bootcamps;

    if (admin.username === 'superadmin' || admin.role === 'superadmin') {
      internships = await Internship.find({});
      jobs = await Job.find({});
      masterclasses = await Masterclass.find({});
      globals = await Global.find({});
      postgrads = await PostGrad.find({});
      bootcamps = await Bootcamp.find({});
    } else {
      const adminId = admin._id;
      internships = await Internship.find({ createdBy: adminId });
      jobs = await Job.find({ createdBy: adminId });
      masterclasses = await Masterclass.find({ createdBy: adminId });
      globals = await Global.find({ createdBy: adminId });
      postgrads = await PostGrad.find({ createdBy: adminId });
      bootcamps = await Bootcamp.find({ createdBy: adminId });
    }

    res.json({
      success: true,
      data: {
        internships,
        jobs,
        masterclasses,
        globals,
        postgrads,
        bootcamps
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching dashboard data' });
  }
});

// GET /api/individual-admin/dashboard/:adminId/internships - get internships for admin
router.get('/dashboard/:adminId/internships', authenticateAdmin, async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = req.admin;

    if (admin._id.toString() !== adminId && admin.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const internships = await Internship.find({ createdBy: adminId }).sort({ createdAt: -1 });
    res.json({ success: true, data: internships });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching internships' });
  }
});

// GET /api/individual-admin/dashboard/:adminId/jobs - get jobs for admin
router.get('/dashboard/:adminId/jobs', authenticateAdmin, async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = req.admin;

    if (admin._id.toString() !== adminId && admin.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const jobs = await Job.find({ createdBy: adminId }).sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching jobs' });
  }
});

// GET /api/individual-admin/dashboard/:adminId/masterclasses - get masterclasses for admin
router.get('/dashboard/:adminId/masterclasses', authenticateAdmin, async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = req.admin;

    if (admin._id.toString() !== adminId && admin.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const masterclasses = await Masterclass.find({ createdBy: adminId }).sort({ createdAt: -1 });
    res.json({ success: true, data: masterclasses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching masterclasses' });
  }
});

// GET /api/individual-admin/dashboard/:adminId/bootcamps - get bootcamps for admin
router.get('/dashboard/:adminId/bootcamps', authenticateAdmin, async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = req.admin;

    if (admin._id.toString() !== adminId && admin.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const bootcamps = await Bootcamp.find({ createdBy: adminId }).sort({ createdAt: -1 });
    res.json({ success: true, data: bootcamps });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching bootcamps' });
  }
});

// GET /api/individual-admin/dashboard/:adminId/postgrads - get postgrads for admin
router.get('/dashboard/:adminId/postgrads', authenticateAdmin, async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = req.admin;

    if (admin._id.toString() !== adminId && admin.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const postgrads = await PostGrad.find({ createdBy: adminId }).sort({ createdAt: -1 });
    res.json({ success: true, data: postgrads });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching postgrads' });
  }
});

// GET /api/individual-admin/dashboard/:adminId/globals - get globals for admin
router.get('/dashboard/:adminId/globals', authenticateAdmin, async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = req.admin;

    if (admin._id.toString() !== adminId && admin.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const globals = await Global.find({ createdBy: adminId }).sort({ createdAt: -1 });
    res.json({ success: true, data: globals });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching globals' });
  }
});

// POST /api/individual-admin/dashboard/:adminId/postgrads - create postgrad
router.post('/dashboard/:adminId/postgrads', authenticateAdmin, multiUpload, async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = req.admin;

    if (admin._id.toString() !== adminId && admin.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const {
      postGradName,
      description,
      skills,
      location,
      industryType,
      date,
      postGradDesc,

    } = req.body;

    if (
      !postGradName || !description || !skills || !location ||
      !industryType || !date || !postGradDesc
    ) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (!req.files['postGradBanner'] || !req.files['companyBanner']) {
      return res.status(400).json({ success: false, message: 'Postgrad banner and company banner images are required' });
    }

    const postGradBanner = `/uploads/${req.files['postGradBanner'][0].filename}`;
    const companyBanner = `/uploads/${req.files['companyBanner'][0].filename}`;

    const newPostGrad = new PostGrad({
      postGradName,
      description,
      skills: Array.isArray(skills) ? skills : skills.split(',').map((s) => s.trim()),
      location,
      industryType,
      date,
      postGradDesc,
      postGradBanner,
      companyBanner,
      createdBy: admin._id
    });

    await newPostGrad.save();
    res.status(201).json({ success: true, data: newPostGrad });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error creating postgrad' });
  }
});

// PUT /api/individual-admin/dashboard/:adminId/postgrads/:id - update postgrad
router.put('/dashboard/:adminId/postgrads/:id', authenticateAdmin, multiUpload, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      skills: req.body.skills
        ? (Array.isArray(req.body.skills)
          ? req.body.skills
          : req.body.skills.split(',').map((s) => s.trim()))
        : []
    };

    if (req.files['postGradBanner']) {
      updateData.postGradBanner = `/uploads/${req.files['postGradBanner'][0].filename}`;
    }
    if (req.files['companyBanner']) {
      updateData.companyBanner = `/uploads/${req.files['companyBanner'][0].filename}`;
    }

    const updatedPostGrad = await PostGrad.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedPostGrad) {
      return res.status(404).json({ success: false, message: 'Postgrad not found' });
    }

    res.json({ success: true, data: updatedPostGrad });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/individual-admin/dashboard/:adminId/postgrads/:id - delete postgrad
router.delete('/dashboard/:adminId/postgrads/:id', authenticateAdmin, async (req, res) => {
  try {
    const deletedPostGrad = await PostGrad.findByIdAndDelete(req.params.id);
    if (!deletedPostGrad) {
      return res.status(404).json({ success: false, message: 'Postgrad not found' });
    }
    res.json({ success: true, message: 'Postgrad deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/individual-admin/dashboard/:adminId/globals - create global
router.post('/dashboard/:adminId/globals', authenticateAdmin, multiUpload, async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = req.admin;

    if (admin._id.toString() !== adminId && admin.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const {
      globalName,
      description,
      skills,
      location,
      industryType,
      date,
      globalDesc,
      specialization,
      courseName,
      organizationName,
      courseFee,
      duration,
      organizationWebsite,
      courseType,
      courseDetails,
      industryDomain,
      supportContactEmail,
      mentorSupportAvailable,
      discussionForumLink,
      certificationProvided,
      certificateTemplate,
      language,
      enrollmentDeadline,
      startDate,
      endDate,
    } = req.body;

    if (
      !globalName || !description || !skills || !location ||
      !industryType || !date || !globalDesc ||
      !specialization ||
      !courseName ||
      !organizationName ||
      !courseFee ||
      !duration ||
      !organizationWebsite ||
      !courseType ||
      !courseDetails ||
      !industryDomain ||
      !supportContactEmail ||
      !mentorSupportAvailable ||
      !discussionForumLink ||
      !certificationProvided ||
      !certificateTemplate ||
      !language ||
      !enrollmentDeadline ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (!req.files['globalBanner'] || !req.files['companyBanner']) {
      return res.status(400).json({ success: false, message: 'Global banner and company banner images are required' });
    }

    const globalBanner = `/uploads/${req.files['globalBanner'][0].filename}`;
    const companyBanner = `/uploads/${req.files['companyBanner'][0].filename}`;

    const newGlobal = new Global({
      globalName,
      description,
      skills: Array.isArray(skills) ? skills : skills.split(',').map((s) => s.trim()),
      location,
      industryType,
      date,
      globalDesc,
      globalBanner,
      companyBanner,
      specialization,
      courseName,
      organizationName,
      courseFee,
      duration,
      organizationWebsite,
      courseType,
      courseDetails,
      industryDomain,
      supportContactEmail,
      mentorSupportAvailable,
      discussionForumLink,
      certificationProvided,
      certificateTemplate,
      language,
      enrollmentDeadline,
      startDate,
      endDate,
      createdBy: admin._id
    });

    await newGlobal.save();
    res.status(201).json({ success: true, data: newGlobal });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error creating global' });
  }
});

// PUT /api/individual-admin/dashboard/:adminId/globals/:id - update global
router.put('/dashboard/:adminId/globals/:id', authenticateAdmin, multiUpload, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      skills: req.body.skills
        ? (Array.isArray(req.body.skills)
          ? req.body.skills
          : req.body.skills.split(',').map((s) => s.trim()))
        : []
    };

    if (req.files['globalBanner']) {
      updateData.globalBanner = `/uploads/${req.files['globalBanner'][0].filename}`;
    }
    if (req.files['companyBanner']) {
      updateData.companyBanner = `/uploads/${req.files['companyBanner'][0].filename}`;
    }

    const updatedGlobal = await Global.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedGlobal) {
      return res.status(404).json({ success: false, message: 'Global not found' });
    }

    res.json({ success: true, data: updatedGlobal });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/individual-admin/dashboard/:adminId/globals/:id - delete global
router.delete('/dashboard/:adminId/globals/:id', authenticateAdmin, async (req, res) => {
  try {
    const deletedGlobal = await Global.findByIdAndDelete(req.params.id);
    if (!deletedGlobal) {
      return res.status(404).json({ success: false, message: 'Global not found' });
    }
    res.json({ success: true, message: 'Global deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/individual-admin/internships - create internship
router.post('/dashboard/:adminId/internships', authenticateAdmin, multiUpload, async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = req.admin;

    if (admin._id.toString() !== adminId && admin.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const {
      internshipName,
      description,
      domain,
      jobType,
      companyName,
      stipend,
      duration,
      location,
      workingHours,
      jobProfile,
      shiftType,
      companyDesc,
      perks,
      skills,
      softSkills,
      freeOrPaid,
      lastDateToApply,
      companySize,
      foundingYear,
      companyType,
      industryType,
      companyWebsiteUrl
    } = req.body;

    if (
      !internshipName ||
      !description ||
      !domain ||
      !jobType ||
      !companyName ||
      !stipend ||
      !duration ||
      !location ||
      !workingHours ||
      !jobProfile ||
      !shiftType ||
      !companyDesc ||
      !perks ||
      !freeOrPaid ||
      !lastDateToApply ||
      !companySize ||
      !foundingYear ||
      !companyType ||
      !industryType ||
      !companyWebsiteUrl
    ) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (!req.files['internshipBanner'] || !req.files['companyBanner']) {
      return res.status(400).json({ success: false, message: 'Internship banner and company banner images are required' });
    }

    const internshipBanner = `/uploads/${req.files['internshipBanner'][0].filename}`;
    const companyBanner = `/uploads/${req.files['companyBanner'][0].filename}`;

    const newInternship = new Internship({
      internshipName,
      description,
      domain,
      jobType,
      companyName,
      stipend,
      duration,
      location,
      workingHours,
      jobProfile,
      shiftType,
      internshipBanner,
      companyBanner,
      companyDesc,
      perks,
      freeOrPaid,
      skills,
      softSkills,
      lastDateToApply,
      companySize,
      foundingYear,
      companyType,
      industryType,
      companyWebsiteUrl,
      createdBy: admin._id,
    });

    await newInternship.save();
    res.status(201).json({ success: true, data: newInternship });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error creating internship' });
  }
});

router.put('/dashboard/:adminId/internships/:id', authenticateAdmin, multiUpload, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      skills: req.body.skills
        ? (Array.isArray(req.body.skills)
          ? req.body.skills
          : req.body.skills.split(',').map((s) => s.trim()))
        : []
    };

    if (req.files['internshipBanner']) {
      updateData.internshipBanner = `/uploads/${req.files['internshipBanner'][0].filename}`;
    }
    if (req.files['companyBanner']) {
      updateData.companyBanner = `/uploads/${req.files['companyBanner'][0].filename}`;
    }

    const updatedInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedInternship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.json(updatedInternship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE internship
router.delete('/dashboard/:adminId/internships/:id', authenticateAdmin, async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: 'Internship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/individual-admin/jobs - create job
router.post('/dashboard/:adminId/jobs', authenticateAdmin, multiUpload, async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = req.admin;

    if (admin._id.toString() !== adminId && admin.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const {
      industryType,
      jobType,
      jobName,
      description,
      skills,
      companyName,
      salaryPackage,
      location,
      companyWebsiteUrl,
      workingHours,
      jobProfile,
      shiftType,
      experience,
      applicationDeadline,
      openings,
      perks,
      eligibility,
      foundedYear,
      companyAddress,
      hiringProcess,
      companyType,
    } = req.body;

    if (
      !industryType ||
      !jobType ||
      !jobName ||
      !description ||
      !skills ||
      !companyName ||
      !salaryPackage ||
      !location ||
      !companyWebsiteUrl ||
      !workingHours ||
      !jobProfile ||
      !shiftType ||
      !experience ||
      !applicationDeadline ||
      !openings ||
      !perks ||
      !eligibility ||
      !foundedYear ||
      !companyAddress ||
      !hiringProcess ||
      !companyType
    ) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (!req.files['jobBanner'] || !req.files['companyBanner']) {
      return res.status(400).json({ success: false, message: 'Job banner and company banner images are required' });
    }

    const jobBanner = `/uploads/${req.files['jobBanner'][0].filename}`;
    const companyBanner = `/uploads/${req.files['companyBanner'][0].filename}`;

    const job = new Job({
      industryType,
      jobType,
      jobName,
      description,
      skills: Array.isArray(skills) ? skills : skills.split(',').map((s) => s.trim()),
      companyName,
      salaryPackage,
      location,
      companyWebsiteUrl,
      workingHours,
      jobProfile,
      shiftType,
      experience,
      jobBanner,
      companyBanner,
       applicationDeadline,
      openings,
      perks,
      eligibility,
      foundedYear,
      companyAddress,
      hiringProcess,
      companyType,
      createdBy: admin._id
    });

    await job.save();
    res.status(201).json({ success: true, data: job });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error creating job' });
  }
});

router.put('/dashboard/:adminId/jobs/:id', authenticateAdmin, multiUpload, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      skills: req.body.skills
        ? (Array.isArray(req.body.skills)
          ? req.body.skills
          : req.body.skills.split(',').map((s) => s.trim()))
        : []
    };

    if (req.files['jobBanner']) {
      updateData.jobBanner = `/uploads/${req.files['jobBanner'][0].filename}`;
    }
    if (req.files['companyBanner']) {
      updateData.companyBanner = `/uploads/${req.files['companyBanner'][0].filename}`;
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({ success: true, data: updatedJob });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/dashboard/:adminId/jobs/:id', authenticateAdmin, async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/individual-admin/masterclasses - create masterclass
router.post('/dashboard/:adminId/masterclasses', authenticateAdmin, multiUpload, async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = req.admin;

    if (admin._id.toString() !== adminId && admin.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const {
      masterClassName,
      skills,
      keynoteSpeaker,
      goal,
      location,
      industryType,
      date,
      masterClassDesc,
      meetingLink,
      externalEventId,
      startTime,
      endTime,
      duration,
      hostOrganization,
      contactEmail,
      hostWebsite
    } = req.body;

    if (
      !masterClassName ||
      !skills ||
      !keynoteSpeaker ||
      !goal ||
      !location ||
      !industryType ||
      !date ||
      !masterClassDesc ||
      !meetingLink ||
      !externalEventId ||
      !startTime ||
      !endTime ||
      !duration ||
      !hostOrganization ||
      !contactEmail ||
      !hostWebsite
    ) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (!req.files['masterClassBanner'] || !req.files['companyBanner']) {
      return res.status(400).json({ success: false, message: 'Masterclass banner and company banner images are required' });
    }

    const masterClassBanner = `/uploads/${req.files['masterClassBanner'][0].filename}`;
    const companyBanner = `/uploads/${req.files['companyBanner'][0].filename}`;

    const newMasterclass = new Masterclass({
      masterClassName,
      masterClassDesc,
      skills: Array.isArray(skills) ? skills : skills.split(',').map((s) => s.trim()),
      keynoteSpeaker,
      goal,
      location,
      industryType,
      date,
      masterClassBanner,
      companyBanner,
      meetingLink,
      externalEventId,
      startTime,
      endTime,
      duration,
      hostOrganization,
      contactEmail,
      hostWebsite,
      createdBy: admin._id
    });

    await newMasterclass.save();
    res.status(201).json({ success: true, data: newMasterclass });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error creating masterclass' });
  }
});

router.put('/dashboard/:adminId/masterclasses/:id', authenticateAdmin, multiUpload, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      skills: req.body.skills
        ? (Array.isArray(req.body.skills)
          ? req.body.skills
          : req.body.skills.split(',').map((s) => s.trim()))
        : []
    };

    if (req.files['masterClassBanner']) {
      updateData.masterClassBanner = `/uploads/${req.files['masterClassBanner'][0].filename}`;
    }
    if (req.files['companyBanner']) {
      updateData.companyBanner = `/uploads/${req.files['companyBanner'][0].filename}`;
    }

    const updatedMasterclass = await Masterclass.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedMasterclass) {
      return res.status(404).json({ success: false, message: 'Masterclass not found' });
    }

    res.json({ success: true, data: updatedMasterclass });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/dashboard/:adminId/masterclasses/:id', authenticateAdmin, async (req, res) => {
  try {
    const deletedMasterclass = await Masterclass.findByIdAndDelete(req.params.id);
    if (!deletedMasterclass) {
      return res.status(404).json({ success: false, message: 'Masterclass not found' });
    }
    res.json({ success: true, message: 'Masterclass deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/individual-admin/bootcamps - create bootcamp
router.post('/dashboard/:adminId/bootcamps', authenticateAdmin, multiUpload, async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = req.admin;

    if (admin._id.toString() !== adminId && admin.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const {
      bootcampName,
      skills,
      keynoteSpeaker,
      goal,
      location,
      bootCampDesc,
      industryType,
      date,
      organizerName,
   organizerWebsite,
    contactEmail,
     supportNumber,
   certificateAvailable
    } = req.body;

    if (
      !bootcampName || !skills || !keynoteSpeaker || !goal ||
      !location || !bootCampDesc || !industryType || !date ||
      !organizerName || !organizerWebsite || !contactEmail || !supportNumber || !certificateAvailable
    ) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (!req.files['bootcampBanner'] || !req.files['companyBanner']) {
      return res.status(400).json({ success: false, message: 'Bootcamp banner and company banner images are required' });
    }

    const bootcampBanner = `/uploads/${req.files['bootcampBanner'][0].filename}`;
    const companyBanner = `/uploads/${req.files['companyBanner'][0].filename}`;

    const newBootcamp = new Bootcamp({
      bootcampName,
      skills: Array.isArray(skills) ? skills : skills.split(',').map((s) => s.trim()),
      keynoteSpeaker,
      goal,
      location,
      bootCampDesc,
      industryType,
      date,
      bootcampBanner,
      companyBanner,
      organizerName,
      organizerWebsite,
      supportNumber,
      contactEmail,
      certificateAvailable,
      createdBy: admin._id
    });

    await newBootcamp.save();
    res.status(201).json({ success: true, data: newBootcamp });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error creating bootcamp' });
  }
});

router.put('/dashboard/:adminId/bootcamps/:id', authenticateAdmin, multiUpload, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      skills: req.body.skills
        ? (Array.isArray(req.body.skills)
          ? req.body.skills
          : req.body.skills.split(',').map((s) => s.trim()))
        : []
    };

    if (req.files['bootcampBanner']) {
      updateData.bootcampBanner = `/uploads/${req.files['bootcampBanner'][0].filename}`;
    }
    if (req.files['companyBanner']) {
      updateData.companyBanner = `/uploads/${req.files['companyBanner'][0].filename}`;
    }

    const updatedBootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedBootcamp) {
      return res.status(404).json({ success: false, message: 'Bootcamp not found' });
    }

    res.json({ success: true, data: updatedBootcamp });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/dashboard/:adminId/bootcamps/:id', authenticateAdmin, async (req, res) => {
  try {
    const deletedBootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!deletedBootcamp) {
      return res.status(404).json({ success: false, message: 'Bootcamp not found' });
    }
    res.json({ success: true, message: 'Bootcamp deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
