// import React from 'react';
// import { MapPin } from 'lucide-react';
// import { motion } from 'framer-motion';

// interface Bootcamp {
//   _id: string;
//   bootcampBanner: string;
//   bootcampName: string;
//   keynoteSpeaker: string;
//   skills: string[];
//   goal: string;
//   location: string;
//   bootCampDesc: string;
//   industryType: string;
//   date: string;
// }

// interface BootcampCardProps {
//   bootcamp: Bootcamp;
// }

// const BootcampCard: React.FC<BootcampCardProps> = ({ bootcamp }) => {
//   const API_BASE_URL = 'http://localhost:3000';

//   const formattedDate = new Date(bootcamp.date).toLocaleString('en-GB', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true,
//   });

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 25 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, ease: 'easeOut' }}
//       className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md w-full max-w-md mx-auto hover:shadow-xl transition-all duration-300"
//     >
//       {/* Banner */}
//       <div className="w-full h-44 overflow-hidden rounded-t-2xl">
//         <img
//           src={`${API_BASE_URL}${bootcamp.bootcampBanner}`}
//           alt={bootcamp.bootcampName}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Content */}
//         <div className='px-6 flex justify-between items-center'> 
//         <h2 className="text-xl font-bold text-gray-900">{bootcamp.bootcampName}</h2>

//         <h2 className="text-xl font-bold text-gray-900">{bootcamp.industryType}</h2>

//         </div>
//       <div className="px-6 py-5 flex flex-col items-center space-y-3">
//         {/* Title */}

//         {/* Date */}
//         <p className="text-sm text-center text-gray-500">{formattedDate}</p>

//         {/* Speaker */}
//         <p className="text-sm text-gray-600 text-center italic">By {bootcamp.keynoteSpeaker}</p>

//         {/* Skills */}
//         {bootcamp.skills.length > 0 && (
//           <div className="flex flex-wrap justify-center gap-2 mt-1">
//             {bootcamp.skills.slice(0, 3).map((skill, idx) => (
//               <span
//                 key={idx}
//                 className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Location */}
//         <div className="flex text-center items-center gap-1 text-gray-600 text-sm">
//           <MapPin size={14} /> {bootcamp.location}
//         </div>

//         {/* Button */}
//         <button className="mt-3 w-full bg-black text-white font-medium py-2 rounded-lg text-sm hover:bg-gray-800 transition">
//           View Details
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default BootcampCard;
import React from 'react';
import { MapPin, Calendar, User, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../../App';

interface Bootcamp {
  _id: string;
  bootcampBanner: string;
  bootcampName: string;
  keynoteSpeaker: string;
  skills: string[];
  goal: string;
  location: string;
  bootCampDesc: string;
  industryType: string;
  date: string;
}

interface BootcampCardProps {
  bootcamp: Bootcamp;
}

const BootcampCard: React.FC<BootcampCardProps> = ({ bootcamp }) => {
  
  const formattedDate = new Date(bootcamp.date).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 w-full max-w-sm mx-auto overflow-hidden border border-gray-100"
    >
      {/* Banner with Gradient Overlay */}
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={`${API_BASE_URL}${bootcamp.bootcampBanner}`}
          alt={bootcamp.bootcampName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Industry Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            {bootcamp.industryType}
          </span>
        </div>

        {/* Premium Badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg">
            <Star size={12} fill="currentColor" />
            <span>FEATURED</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
            {bootcamp.bootcampName}
          </h2>
          
          {/* Speaker */}
          <div className="flex items-center gap-2 text-gray-600">
            <User size={14} className="text-blue-500" />
            <span className="text-sm font-medium">{bootcamp.keynoteSpeaker}</span>
          </div>
        </div>

        {/* Date & Location */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-green-500" />
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-red-500" />
            <span className="font-medium">{bootcamp.location}</span>
          </div>
        </div>

        {/* Skills */}
        {bootcamp.skills.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Skills You'll Learn</h3>
            <div className="flex flex-wrap gap-2">
              {bootcamp.skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
              {bootcamp.skills.length > 4 && (
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-xl">
                  +{bootcamp.skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Description Preview
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {bootcamp.bootCampDesc}
        </p> */}

        {/* Action Button */}
        <Link to={`/bootcamps/${bootcamp?._id}`}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-2xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group/btn"
        >
          <span>Explore Bootcamp</span>
          <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </motion.button>
        </Link>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/10 to-indigo-400/10" />
      </div>
    </motion.div>
  );
};

export default BootcampCard;

