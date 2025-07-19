/**
 * Function is used tob create the dashboard page along with sidebar and their contents.
 */
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Child Component
import Sidebar from '../components/dashboard/Sidebar';
import DashboardInternships from '../components/dashboard/DashboardInternships';
import DashboardJobs from '../components/dashboard/DashboardJobs';
import DashboardBootcamps from '../components/dashboard/DashboardBootcamps';
import DashboardPostGrad from '../components/dashboard/DashboardPostGrad';
import DashboardGlobal from '../components/dashboard/DashboardGlobal';
import DashboardMasterclasses from '../components/dashboard/DashboardMasterclasses';
import DashboardAdmins from '../components/dashboard/DashboardAdmins';
import AdminDashboard from './AdminDashboard';

const Dashboard: React.FC = () => {
  const { logout } = useAuth();

  function renderHeader(){
    return (
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                <span className="text-xl font-semibold ml-1">TalentApp</span>
              </Link>
            </div>
              <div className="flex items-center space-x-4">
                <span className="hidden sm:inline-block text-sm text-gray-600">Welcome, Bavneet!</span>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium rounded-md transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" />
                  </svg>
                  Logout
                </button>
              </div>
          </div>
        </header>
      </div>
    );
  }

  return (
    <>
    {renderHeader()}
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/internships" element={<DashboardInternships />} />
          <Route path="/jobs" element={<DashboardJobs />} />
          <Route path="/bootcamps" element={<DashboardBootcamps />} />
          <Route path="/postgrad" element={<DashboardPostGrad />} />
          <Route path="/global" element={<DashboardGlobal />} />
          <Route path="/masterclasses" element={<DashboardMasterclasses />} />
          <Route path="/admins" element={<DashboardAdmins />} />
          <Route path="/admin/:id" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
    </>
  );
};

const DashboardHome: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, Bavneet!</h1>
      <div className="dashboard-content">
        <div className="dashboard-text">
          <h2 className="dashboard-heading">Manage Talent with Ease</h2>
          <p className="dashboard-description">
            From internships to masterclasses, everything is just a click away. Use the sidebar to explore and manage all your talent programs effortlessly.
          </p>
        </div>
        <div className="dashboard-image-wrapper">
          <img
            src='/attached_assets/newTalentimg.jpg' 
            alt="Mind Clarity Visual"
            className="dashboard-image pulse"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
