import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:3000/api';

interface Internship {
  _id: string;
  internshipName: string;
  description: string;
}

interface Job {
  _id: string;
  jobName: string;
  description: string;
}

interface Masterclass {
  _id: string;
  masterClassName: string;
  masterClassDesc: string;
}

interface Global {
  _id: string;
  courseName: string;
  courseDetails: string;
}

interface PostGrad {
  _id: string;
  courseName: string;
  courseDetails: string;
}

interface Bootcamp {
  _id: string;
  bootcampName: string;
  bootCampDesc: string;
}

const IndividualAdminDashboard: React.FC = () => {
  const { getToken, logout, user } = useAuth();

  const [internships, setInternships] = useState<Internship[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [masterclasses, setMasterclasses] = useState<Masterclass[]>([]);
  const [globals, setGlobals] = useState<Global[]>([]);
  const [postgrads, setPostgrads] = useState<PostGrad[]>([]);
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const res = await axios.get(`${API_BASE_URL}/individual-admin/dashboard`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      const data = res.data.data;
      setInternships(data.internships);
      setJobs(data.jobs);
      setMasterclasses(data.masterclasses);
      setGlobals(data.globals);
      setPostgrads(data.postgrads);
      setBootcamps(data.bootcamps);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <AdminLayout>
     <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {user?.username}!</h1>
      <div className="dashboard-content">
        <div className="dashboard-text">
          <h2 className="dashboard-heading">Manage Talent with Ease</h2>
          <p className="dashboard-description">
            From internships to masterclasses, everything is just a click away. Use the sidebar to explore and manage all your talent programs effortlessly.
          </p>
        </div>
        <div className="dashboard-image-wrapper">
          <img
            src='/attached_assets/admin.jpg' 
            alt="Mind Clarity Visual"
            className="dashboard-image pulse"
          />
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default IndividualAdminDashboard;
