import React, { useState, useEffect } from 'react';
import { Building2, DollarSign, Briefcase, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import JobCard from '../ui/JobCard';
import axios from 'axios';
import { API_BASE_URLs } from '../../App';

// const API_BASE_URLs = `${API_BASE_URL}/api`;

interface Job {
  _id: string;
  jobBanner: string;
  industryType: string;
  jobType: string;
  jobName: string;
  description: string;
  skills: string[];
  companyName: string;
  salaryPackage: string;
  location: string;
  companyWebsiteUrl: string;
  workingHours: string;
  jobProfile: string;
  shiftType: string;
  experience: string;
  createdAt: string;
  updatedAt: string;
}
const JOBS_PER_PAGE = 3;

const JobsSection: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});
  // const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
    const fetchJobDetailSection = async () => {
      try {
        const res = await axios.get(`${API_BASE_URLs}/jobs`);
        setJobs(res.data);
        setFilteredJobs(res.data);
      } catch (error) {
        console.error('Error fetching PGP Courses:', error);
      }
    };
    fetchJobDetailSection();
  }, []);

  const handleFilterChange = (filterKey: string, value: string | string[]) => {
    const newFilters = { ...filters, [filterKey]: value };
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filtering

    const filtered = jobs.filter(job => {
      if (newFilters.industryType && job.industryType !== newFilters.industryType) return false;
      if (newFilters.jobType && job.jobType !== newFilters.jobType) return false;
      if (newFilters.location && job.location !== newFilters.location) return false;
      return true;
    });

    setFilteredJobs(filtered);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of section
    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <section id="jobs" className="py-16 bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Briefcase className="text-emerald-600" size={32} />
            <h2 className="text-4xl font-bold text-gray-900">Jobs & Career</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start your professional journey with opportunities that match your skills and aspirations
          </p>
          
          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Building2 className="text-emerald-500" size={20} />
              <span className="text-sm font-semibold text-gray-700">Top Companies</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <DollarSign className="text-green-500" size={20} />
              <span className="text-sm font-semibold text-gray-700">Competitive Salary</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Clock className="text-blue-500" size={20} />
              <span className="text-sm font-semibold text-gray-700">Flexible Hours</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-sm font-semibold text-gray-700">Filter by:</span>
              <select 
                className="px-4 py-2 text-black rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={(e) => handleFilterChange('industryType', e.target.value)}
              >
                <option value="">All Industries</option>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Design">Design</option>
                <option value="Data Science">Data Science</option>
                <option value="HR">HR</option>
              </select>
              <select 
                className="px-4 py-2 text-black rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={(e) => handleFilterChange('jobType', e.target.value)}
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              <select 
                className="px-4 py-2 text-black rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="Bangalore, India">Bangalore</option>
                <option value="Mumbai, India">Mumbai</option>
                <option value="Delhi, India">Delhi</option>
                <option value="Hyderabad, India">Hyderabad</option>
                <option value="Pune, India">Pune</option>
                <option value="Chennai, India">Chennai</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentJobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
  <div className="flex justify-center items-center gap-4">
    {/* Previous Button */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
        currentPage === 1
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-[#246CE9] hover:bg-[#1f5acc] text-white shadow-sm hover:shadow-md'
      }`}
    >
      <ChevronLeft size={16} />
      Previous
    </motion.button>

    {/* Page Numbers */}
    <div className="flex gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <motion.button
          key={page}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handlePageChange(page)}
          className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
            currentPage === page
              ? 'bg-[#246CE9] hover:bg-[#1f5acc] text-white shadow-md'
              : 'bg-white text-[#246CE9] border border-[#246CE9] hover:bg-[#f0f4ff] shadow-sm'
          }`}
        >
          {page}
        </motion.button>
      ))}
    </div>

    {/* Next Button */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
        currentPage === totalPages
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-[#246CE9] hover:bg-[#1f5acc] text-white shadow-sm hover:shadow-md'
      }`}
    >
      Next
      <ChevronRight size={16} />
    </motion.button>
  </div>
)}


        {/* Stats Section */}
        <div className="bg-[#246CE9] hover:bg-[#1f5acc] rounded-3xl p-8 text-center text-white shadow-2xl mt-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Join Thousands of Successful Professionals</h3>
            <p className="text-xl mb-6 text-emerald-50">
              Connect with top employers and find your dream job with our comprehensive job placement support.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-emerald-100">Jobs Posted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">5,000+</div>
                <div className="text-emerald-100">Successful Placements</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-emerald-100">Partner Companies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;