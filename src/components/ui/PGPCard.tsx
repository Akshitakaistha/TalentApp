import React from 'react';
import { Award, Clock, CreditCard, MapPin, Building2, ExternalLink, Star, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../App';

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

interface PGPCourseCardProps {
  course: PGPCourse;
}

const PGPCard: React.FC<PGPCourseCardProps> = ({ course }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden"
    >
      {/* Header with Banner */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
        {course.banner && (
          <img
            src={`${API_BASE_URL}${course.banner}`}
            alt={course.courseName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Course Type Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-indigo-700 text-xs font-bold px-3 py-2 rounded-full shadow-lg border border-indigo-100">
            <GraduationCap size={14} />
            <span>{course.courseType}</span>
          </div>
        </div>

        {/* Specialization Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold px-3 py-2 rounded-full shadow-lg">
            {course.specialization}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Course Title & Organization */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
            {course.courseName}
          </h3>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 size={16} className="text-indigo-500" />
            <span className="text-sm font-medium">{course.organizationName}</span>
            {course.organizationWebsite && (
              <ExternalLink size={12} className="text-gray-400 hover:text-indigo-500 cursor-pointer transition-colors" />
            )}
          </div>
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Clock size={14} className="text-emerald-500" />
              <span className="text-gray-700 font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={14} className="text-red-500" />
              <span className="text-gray-700 font-medium">{course.location}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <CreditCard size={14} className="text-blue-500" />
              <span className="text-gray-700 font-medium">{course.courseFee}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Award size={14} className="text-amber-500" />
              <span className="text-gray-700 font-medium">EMI: {course.emi}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        {course.skills.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Core Skills</h4>
            <div className="flex flex-wrap gap-2">
              {course.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-indigo-100 hover:border-indigo-200 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
              {course.skills.length > 3 && (
                <span className="bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200">
                  +{course.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Course Description */}
        {/* <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 border-t border-gray-100 pt-3">
          {course.courseDetails}
        </p> */}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Link to={`/postgrads/${course?._id}`} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Apply Now
            </motion.button>
          </Link>
          
          {/* <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-3 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-semibold rounded-xl text-sm transition-all duration-300"
          >
            Details
          </motion.button> */}
        </div>

        {/* Job Assurance Badge */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-3 mt-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-emerald-600" fill="currentColor" />
              <span className="text-emerald-800 font-bold text-sm">100% Job Assurance</span>
            </div>
          </div>
          <p className="text-emerald-700 text-xs mt-1">Placement guarantee with 0% interest EMI</p>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/5 to-purple-400/5" />
      </div>
    </motion.div>
  );
};

export default PGPCard;