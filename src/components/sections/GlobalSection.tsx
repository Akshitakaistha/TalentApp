import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Globe, Plane, Award, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import GlobalProgramCard from '../ui/GlobalProgramCard';
import { API_BASE_URLs } from '../../App';

interface GlobalProgram {
  _id: string;
  banner: string;
  specialization: string;
  courseName: string;
  skills: string[];
  organizationName: string;
  courseFee: string;
  duration: string;
  location: string;
  organizationWebsite: string;
  courseType: string;
  courseDetails: string;
  industryDomain: string;
  createdAt: string;
  updatedAt: string;
}

const PROGRAMS_PER_PAGE = 3;

// const API_BASE_URLs = `${API_BASE_URL}/api`;

const GlobalSection: React.FC = () => {
  const [globalPrograms, setGlobalPrograms] = useState<GlobalProgram[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<GlobalProgram[]>([]);
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchGlobalPrograms = async () => {
      try {
        const res = await axios.get(`${API_BASE_URLs}/global`);
        setGlobalPrograms(res.data);
        setFilteredPrograms(res.data);
      } catch (error) {
        console.error('Error fetching Global programs:', error);
      }
    };
    fetchGlobalPrograms();
  }, []);

  const handleFilterChange = (filterKey: string, value: string | string[]) => {
    const newFilters = { ...filters, [filterKey]: value };
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filtering
    const filtered = globalPrograms.filter(program => {
      if (newFilters.specialization && program.specialization !== newFilters.specialization) return false;
      if (newFilters.courseType && program.courseType !== newFilters.courseType) return false;
      return true;
    });
    setFilteredPrograms(filtered);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredPrograms.length / PROGRAMS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROGRAMS_PER_PAGE;
  const endIndex = startIndex + PROGRAMS_PER_PAGE;
  const currentPrograms = filteredPrograms.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of section
    document.getElementById('global')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="global" className="py-16 bg-gradient-to-br from-gray-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="text-cyan-600" size={32} />
            <h2 className="text-4xl font-bold text-gray-900">Global Programs</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Expand your horizons with international education opportunities and global exposure
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Plane className="text-cyan-500" size={20} />
              <span className="text-sm font-semibold text-gray-700">International Exposure</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Users className="text-blue-500" size={20} />
              <span className="text-sm font-semibold text-gray-700">Global Network</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Award className="text-amber-500" size={20} />
              <span className="text-sm font-semibold text-gray-700">World-Class Universities</span>
            </div>
          </div>
        </div>
        {/* Filter Bar */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-sm font-semibold text-gray-700">Filter by:</span>
              <select 
                className="px-4 py-2 rounded-lg text-black border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                onChange={(e) => handleFilterChange('specialization', e.target.value)}
              >
                <option value="">All Specializations</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Finance">Finance</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Data Science">Data Science</option>
                <option value="Marketing">Marketing</option>
              </select>
              <select 
                className="px-4 py-2 rounded-lg text-black border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                onChange={(e) => handleFilterChange('courseType', e.target.value)}
              >
                <option value="">All Program Types</option>
                <option value="Certificate">Certificate</option>
                <option value="Diploma">Diploma</option>
                <option value="Masters">Masters</option>
                <option value="Executive">Executive</option>
                <option value="Workshop">Workshop</option>
              </select>
            </div>
          </div>
        </div>
        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPrograms.map(program => (
            <GlobalProgramCard key={program._id} program={program} />
          ))}
        </div>
        {/* No Results */}
        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <Globe className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No programs found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </div>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-cyan-600 hover:bg-cyan-50 shadow-sm hover:shadow-md'
              }`}
            >
              <ChevronLeft size={16} />
              Previous
            </motion.button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-cyan-50 hover:text-cyan-600 shadow-sm hover:shadow-md'
                  }`}
                >
                  {page}
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-cyan-600 hover:bg-cyan-50 shadow-sm hover:shadow-md'
              }`}
            >
              Next
              <ChevronRight size={16} />
            </motion.button>
          </div>
        )}
        {/* Global Experience Banner */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 text-center text-white shadow-2xl mt-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Transform Your Career with Global Education</h3>
            <p className="text-xl mb-6 text-cyan-50">
              Join thousands of professionals who have accelerated their careers through international 
              education and global networking opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-cyan-100">Partner Universities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">25</div>
                <div className="text-cyan-100">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">5,000+</div>
                <div className="text-cyan-100">Global Alumni</div>
              </div>
            </div>
            <button className="bg-white text-cyan-600 hover:bg-cyan-50 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Start Your Global Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalSection;