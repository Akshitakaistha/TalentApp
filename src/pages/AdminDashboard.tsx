import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URLs } from '../App';

// const API_BASE_URLs = `${API_BASE_URL}/api`;

interface Internship {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
}

import AdminLayout from '../components/layout/AdminLayout';

const AdminDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getToken } = useAuth();

  const [internships, setInternships] = useState<Internship[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const res = await axios.get(`${API_BASE_URLs}/internships`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        params: {
          createdBy: id,
        },
      });
      setInternships(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch internships');
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const res = await axios.get(`${API_BASE_URLs}/jobs`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        params: {
          createdBy: id,
        },
      });
      setJobs(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch jobs');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
    fetchJobs();
  }, [id]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6 text-black">Admin Dashboard - {id}</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-black">Internships Created</h2>
            {internships.length === 0 ? (
              <p>No internships created by this admin.</p>
            ) : (
              <ul className="list-disc list-inside">
                {internships.map((internship) => (
                  <li key={internship._id}>
                    <h3 className="font-semibold text-black">{internship.title}</h3>
                    <p className="text-black">{internship.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4 text-black">Jobs Created</h2>
            {jobs.length === 0 ? (
              <p>No jobs created by this admin.</p>
            ) : (
              <ul className="list-disc list-inside">
                {jobs.map((job) => (
                  <li key={job._id}>
                    <h3 className="font-semibold text-black">{job.title}</h3>
                    <p className="text-black">{job.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
