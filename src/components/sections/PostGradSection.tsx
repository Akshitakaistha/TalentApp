import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GraduationCap, CreditCard, Users, Target } from 'lucide-react';
import PGPCard from '../ui/PGPCard';
import { API_BASE_URLs } from '../../App';

// const API_BASE_URLs = `${API_BASE_URL}/api`;

interface PGPCourse {
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
  emi: string;
  courseType: string;
  courseDetails: string;
  createdAt: string;
  updatedAt: string;
}

interface PGPCourse {
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
  emi: string;
  courseType: string;
  courseDetails: string;
  createdAt: string;
  updatedAt: string;
}

const PostGradSection: React.FC = () => {
  const [pgpCourses, setPgpCourses] = useState<PGPCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<PGPCourse[]>([]);
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;

  useEffect(() => {
    const fetchPGPSection = async () => {
      try {
        const res = await axios.get(`${API_BASE_URLs}/postgrad`);
        setPgpCourses(res.data);
        setFilteredCourses(res.data);
      } catch (error) {
        console.error('Error fetching PGP Courses:', error);
      }
    };
    fetchPGPSection();
  }, []);

  const handleFilterChange = (filterKey: string, value: string | string[]) => {
    const newFilters = { ...filters, [filterKey]: value };
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change

    const filtered = pgpCourses.filter(course => {
      if (newFilters.type && course.courseType !== newFilters.type) return false;
      if (newFilters.duration && course.duration !== newFilters.duration) return false;
      return true;
    });

    setFilteredCourses(filtered);
  };

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section id="postgrad" className="py-16 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="text-indigo-600" size={32} />
            <h2 className="text-4xl font-bold text-gray-900">Post Graduate Programs</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Advanced certification programs with 100% job assurance and flexible EMI options
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Target className="text-emerald-500" size={20} />
              <span className="text-sm font-semibold text-gray-700">100% Job Assurance</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <CreditCard className="text-blue-500" size={20} />
              <span className="text-sm font-semibold text-gray-700">0% Interest EMI</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Users className="text-purple-500" size={20} />
              <span className="text-sm font-semibold text-gray-700">Industry Mentors</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-sm font-semibold text-gray-700">Filter by:</span>
              <select 
                className="px-4 py-2 rounded-lg border border-gray-200 text-black text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">All Program Types</option>
                <option value="certificate">Certificate</option>
                <option value="diploma">Diploma</option>
                <option value="masters">Masters Degree</option>
              </select>
              <select 
                className="px-4 py-2 rounded-lg text-black border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => handleFilterChange('duration', e.target.value)}
              >
                <option value="">All Durations</option>
                <option value="6-12 Months">6-12 Months</option>
                <option value="1-2 Years">1-2 Years</option>
                <option value="2+ Years">2+ Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentCourses.map(course => (
            <PGPCard key={course._id} course={course} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-12">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  currentPage === i + 1
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300'
                } transition duration-200 hover:bg-indigo-50`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </div>
        )}

        {/* Placement Guarantee Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700  rounded-3xl p-8 text-center text-white shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">100% Job Placement Guarantee</h3>
            <p className="text-xl mb-6 text-emerald-50">
              All our post-graduate programs come with comprehensive placement assistance, 
              industry mentorship, and a money-back guarantee if you don't get placed.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-emerald-100">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">₹8.5L</div>
                <div className="text-emerald-100">Avg. Package</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-emerald-100">Hiring Partners</div>
              </div>
            </div>
            <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Learn About Our Placement Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostGradSection;
