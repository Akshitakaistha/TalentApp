const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Only require mongoose if we actually need database functionality
let mongoose;
try {
  mongoose = require('mongoose');
} catch (err) {
  console.log('MongoDB not available, continuing without database...');
}

const authRoutes = require('./routes/auth');
const internshipRoutes = require('./routes/internships');
const jobRoutes = require('./routes/jobs');
const bootcampRoutes = require('./routes/bootcamps');
const postgradRoutes = require('./routes/postgrad');
const globalRoutes = require('./routes/global');
const masterclassRoutes = require('./routes/masterclasses');
const applicationsRoutes = require('./routes/applications');

const superadminRoutes = require('./routes/superadmin');
const adminRoutes = require('./routes/admins');
const individualAdminRoutes = require('./routes/individualAdmin');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection (optional)
if (mongoose) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/talentapp')
  .then(() => {
    console.log('📦 Connected to MongoDB');
  }).catch((err) => {
    console.log('⚠️  MongoDB connection failed:', err.message);
  });
} else {
  console.log('⚠️  Running without database connection');
}
app.use('/api/auth', authRoutes);
app.use('/api/superadmin', superadminRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/individual-admin', individualAdminRoutes);

// Routes
// app.use('/api/auth', authRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/bootcamps', bootcampRoutes);
app.use('/api/postgrad', postgradRoutes);
app.use('/api/global', globalRoutes);
app.use('/api/masterclasses', masterclassRoutes);
app.use('/api/applications', applicationsRoutes);

// Serve static files from the React app build directory
// const frontendPath = path.join(__dirname, 'dist');
// app.use(express.static(frontendPath));

// // For any other routes, serve the index.html file to enable client-side routing
// app.get('*', (req, res) => {
//   res.sendFile(path.join(frontendPath, 'index.html'));
// });

const PORT = process.env.PORT || 6888;

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
  console.log(`📡 API endpoints available at http://0.0.0.0:${PORT}/api`);
});

// Add error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});