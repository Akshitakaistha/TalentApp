import React from 'react';
import { Globe, MapPin, Clock, Award, ExternalLink, Plane, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../App';

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

interface GlobalProgramCardProps {
  program: GlobalProgram;
}

const GlobalProgramCard: React.FC<GlobalProgramCardProps> = ({ program }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
    >
      {/* Header with Banner */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50">
        {program.banner && (
          <img
            src={`${API_BASE_URL}${program.banner}`}
            alt={program.courseName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        
        {/* Course Type Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-white/95 backdrop-blur-sm text-cyan-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-cyan-100">
            {program.courseType}
          </span>
        </div>

        {/* Specialization Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            {program.specialization}
          </span>
        </div>

        {/* Global Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            <Plane size={12} />
            <span>Global Program</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Course Title & Organization */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-cyan-600 transition-colors duration-300 line-clamp-2">
            {program.courseName}
          </h3>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Globe size={16} className="text-cyan-500 flex-shrink-0" />
            <span className="text-sm font-medium truncate">{program.organizationName}</span>
            {program.organizationWebsite && (
              <ExternalLink size={12} className="text-gray-400 hover:text-cyan-500 cursor-pointer transition-colors flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Key Information */}
        <div className="space-y-3 py-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={14} className="text-red-500" />
              <span className="text-gray-700 font-medium truncate">{program.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock size={14} className="text-green-500" />
              <span className="text-gray-700 font-medium">{program.duration}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Award size={14} className="text-amber-500" />
              <span className="text-gray-700 font-medium truncate">{program.industryDomain}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap size={14} className="text-purple-500" />
              <span className="text-gray-700 font-medium">{program.courseFee}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        {program.skills.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Key Skills</h4>
            <div className="flex flex-wrap gap-2">
              {program.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-cyan-100 hover:border-cyan-200 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
              {program.skills.length > 3 && (
                <span className="bg-gray-50 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-lg border border-gray-200">
                  +{program.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {/* <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 border-t border-gray-100 pt-3">
          {program.courseDetails}
        </p> */}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Link to={`/globals/${program?._id}`} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Apply Now
            </motion.button>
          </Link>
          
          {/* <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-3 border-2 border-cyan-200 text-cyan-600 hover:bg-cyan-50 font-semibold rounded-xl text-sm transition-all duration-300"
          >
            Details
          </motion.button> */}
        </div>

        {/* Global Opportunity Badge */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-3 mt-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Plane size={14} className="text-blue-600" />
              <span className="text-blue-800 font-bold text-sm">International Exposure</span>
            </div>
          </div>
          <p className="text-blue-700 text-xs mt-1">Global networking & career opportunities</p>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/5 to-blue-400/5" />
      </div>
    </motion.div>
  );
};

export default GlobalProgramCard;