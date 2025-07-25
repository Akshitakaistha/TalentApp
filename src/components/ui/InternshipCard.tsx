// import React from 'react';
// import { DollarSign, Clock, MapPin, ArrowRight } from 'lucide-react';
// import { API_BASE_URL } from '../../App';
// import { useNavigate } from 'react-router-dom';

// interface InternshipCardProps {
//   internship: {
//     _id: string;
//     internshipBanner: string;
//     companyBanner: string;
//     domain: string;
//     jobType: string;
//     internshipName: string;
//     description: string;
//     skills: string[];
//     companyName: string;
//     stipend: string;
//     duration: string;
//     location: string;
//     workingHours: string;
//     jobProfile: string;
//     shiftType: string;
//   };
// }

// const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
//   const navigate = useNavigate();

//   const handleViewDetails = () => {
//     navigate(`/internships/${internship._id}`);
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 w-full max-w-xs sm:max-w-sm p-4">
//       {/* Top section with logo and title */}
//       <div className="flex items-start gap-3 mb-3">
//         <div className="w-10 h-10 flex-shrink-0 rounded-md bg-gray-50 border overflow-hidden">
//           <img
//             src={`${API_BASE_URL}${internship.companyBanner}`}
//             alt={`${internship.companyName} logo`}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="flex-1 min-w-0">
//           <h3 className="font-semibold text-gray-900 text-sm leading-snug">
//             {internship.internshipName}
//           </h3>
//           <p className="text-xs text-gray-500 truncate">{internship.companyName}</p>
//           <div className="flex gap-1 mt-1 flex-wrap">
//             <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded font-medium">
//               {internship.domain}
//             </span>
//             <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded">
//               {internship.jobType}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Description */}
//       <p className="text-xs text-gray-600 line-clamp-2 mb-2">
//         {internship.description}
//       </p>

//       {/* Skills */}
//       <div className="flex flex-wrap gap-1 mb-3">
//         {internship.skills.slice(0, 3).map((skill, index) => (
//           <span
//             key={index}
//             className="text-[10px] text-gray-700 bg-gray-50 border border-gray-200 rounded px-2 py-0.5"
//           >
//             {skill}
//           </span>
//         ))}
//         {internship.skills.length > 3 && (
//           <span className="text-[10px] text-gray-500">+{internship.skills.length - 3} more</span>
//         )}
//       </div>

//       {/* Details */}
//       <div className="border-t border-gray-100 pt-2 text-xs text-gray-600 space-y-2">
//         <div className="flex justify-between">
//           <div className="flex items-center gap-1.5">
//             <DollarSign size={12} className="text-green-600" />
//             <span>{internship.stipend}</span>
//           </div>
//           <div className="flex items-center gap-1.5">
//             <Clock size={12} className="text-blue-600" />
//             <span>{internship.duration}</span>
//           </div>
//         </div>
//         <div className="flex items-center gap-1.5">
//           <MapPin size={12} className="text-red-600" />
//           <span className="truncate">{internship.location}</span>
//           <span className="text-gray-300">•</span>
//           <span>{internship.shiftType}</span>
//         </div>
//       </div>

//       {/* Call to action */}
//       <button
//         onClick={handleViewDetails}
//         className="mt-4 w-full flex items-center justify-center gap-1 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition"
//       >
//         View Details <ArrowRight size={12} />
//       </button>
//     </div>
//   );
// };

// export default InternshipCard;


// import React from 'react';
// import { MapPin } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { API_BASE_URL } from '../../App';

// interface InternshipCardProps {
//   internship: {
//     _id: string;
//     internshipBanner: string;
//     companyBanner: string;
//     domain: string;
//     jobType: string;
//     internshipName: string;
//     description: string;
//     skills: string[];
//     companyName: string;
//     stipend: string;
//     duration: string;
//     location: string;
//     workingHours: string;
//     jobProfile: string;
//     shiftType: string;
//     lastDateToApply: string;
//   };
// }

// const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
//   const navigate = useNavigate();

//   const handleViewDetails = () => {
//     navigate(`/internships/${internship._id}`);
//   };

//   return (
//     <div className="w-full max-w-sm rounded-xl overflow-hidden shadow border bg-white">
//       {/* Internship Banner */}
//       <div className="relative h-28 w-full">
//         <img
//           src={`${API_BASE_URL}${internship.internshipBanner}`}
//           alt="Internship Banner"
//           className="w-full h-full object-cover"
//         />
//         {/* Top Labels */}
//         <div className="absolute top-2 left-2 flex gap-2 text-xs font-medium">
//           <span className="bg-black text-white px-2 py-1 rounded">Internship + PPO</span>
//           <span className="bg-gray-400 text-white px-2 py-1 rounded">{internship.workingHours}</span>
//         </div>
//         {/* Apply By */}
//         <div className="absolute top-2 right-2 text-xs font-medium text-white">
//           Apply By: {new Date(internship.lastDateToApply).toLocaleDateString('en-IN', {
//             day: '2-digit',
//             month: 'long',
//             year: 'numeric',
//           })}
//         </div>
//       </div>

//       {/* Company Logo & Location */}
//       <div className="flex items-center justify-between px-4 py-3">
//         <img
//           src={`${API_BASE_URL}${internship.companyBanner}`}
//           alt="Company Logo"
//           className="w-12 h-12 object-cover rounded-full border"
//         />
//         <div className="flex gap-2 text-xs">
//           <span className="bg-black text-white px-2 py-1 rounded">{internship.location}</span>
//           <span className="bg-black text-white px-2 py-1 rounded">{internship.jobType}</span>
//         </div>
//       </div>

//       {/* Details Section */}
//       <div className="px-4 pb-4 space-y-2">
//         <h3 className="font-semibold text-sm">{internship.internshipName} - Interns</h3>
//         <div className="text-xs text-gray-500">
//           Eligibility: {internship.eligibility}
//         </div>
//         <div className="text-xs font-medium text-gray-700">
//           Stipend: {internship.stipend}
//         </div>
//         <div className="text-xs font-medium text-gray-700">
//           Duration: {internship.duration}
//         </div>

//         {/* Skills */}
//         <div className="flex flex-wrap gap-2">
//           {internship.skills.slice(0, 6).map((skill, idx) => (
//             <span
//               key={idx}
//               className="text-[10px] bg-gray-100 border px-2 py-0.5 rounded text-gray-700"
//             >
//               {skill}
//             </span>
//           ))}
//         </div>

//         {/* Actively Hiring */}
//         <div className="flex items-center gap-2 mt-2">
//           <img
//             src="https://img.icons8.com/emoji/16/000000/check-mark-emoji.png"
//             alt="check"
//             className="w-4 h-4"
//           />
//           <span className="text-xs text-green-600 font-medium">Actively Hiring</span>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between mt-4 gap-2">
//           <button
//             className="w-1/2 text-xs py-2 rounded border border-blue-500 text-blue-600 font-semibold"
//             onClick={handleViewDetails}
//           >
//             Know more
//           </button>
//           <button
//             className="w-1/2 text-xs py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
//             onClick={() => window.open(`/apply/${internship._id}`, '_blank')}
//           >
//             Apply Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InternshipCard;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { API_BASE_URL } from '../../App';

// interface InternshipCardProps {
//   internship: {
//     _id: string;
//     internshipBanner: string;
//     companyBanner: string;
//     domain: string;
//     jobType: string;
//     internshipName: string;
//     description: string;
//     skills: string[];
//     companyName: string;
//     stipend: string;
//     duration: string;
//     location: string;
//     workingHours: string;
//     jobProfile: string;
//     shiftType: string;
//     lastDateToApply: string;
//     softSkills?: string[];
//     perks?: string;
//   };
// }

// const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
//   const navigate = useNavigate();

//   const handleViewDetails = () => {
//     navigate(`/internships/${internship._id}`);
//   };

//   return (
//     <div className="w-full max-w-sm bg-white rounded-xl shadow border overflow-hidden">
//       {/* Top Banner */}
//       <div className="relative h-28 bg-gray-100">
//         <img
//           src={`${API_BASE_URL}${internship.internshipBanner}`}
//           alt="Internship Banner"
//           className="w-full h-full object-cover"
//         />
//         {/* Badges */}
//         <div className="absolute top-2 left-2 flex gap-2 text-[10px] font-semibold">
//           <span className="bg-black text-white px-2 py-0.5 rounded">Internship + PPO</span>
//           <span className="bg-gray-300 text-black px-2 py-0.5 rounded">{internship.workingHours}</span>
//         </div>
//         {/* Apply By */}
//         <div className="absolute top-2 right-2 text-[11px] font-medium text-black">
//           Apply By: {new Date(internship.lastDateToApply).toLocaleDateString('en-IN', {
//             day: '2-digit',
//             month: 'long',
//             year: 'numeric',
//           })}
//         </div>
//       </div>

//       {/* Company Logo Overlapping */}
//       <div className="flex justify-center -mt-8 mb-3">
//         <div className="w-16 h-16 rounded-full border-2 bg-white shadow overflow-hidden">
//           <img
//             src={`${API_BASE_URL}${internship.companyBanner}`}
//             alt="Company Logo"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>

//       {/* Company Info */}
//       <div className="px-4 space-y-2">
//         <p className="text-xs font-medium text-center">{internship.companyName}</p>

//         {/* Location & Mode */}
//         <div className="flex justify-center gap-2 text-xs mb-1">
//           <span className="bg-black text-white px-2 py-0.5 rounded">{internship.location}</span>
//           <span className="bg-black text-white px-2 py-0.5 rounded">{internship.jobType}</span>
//         </div>

//         {/* Title */}
//         <h3 className="text-sm font-semibold text-center">
//           {internship.internshipName} - Interns
//         </h3>

//         {/* Eligibility (truncated if too long) */}
//         <p className="text-xs text-gray-600 line-clamp-2">
//           <strong>Eligibility:</strong>{' '}
//           {internship.jobProfile}
//         </p>

//         {/* Year Tags */}
//         <div className="flex gap-2 mt-1">
//           <span className="bg-gray-200 text-xs px-2 py-0.5 rounded">2025</span>
//           <span className="bg-gray-200 text-xs px-2 py-0.5 rounded">2026</span>
//         </div>

//         {/* Stipend & Duration */}
//         <p className="text-xs text-gray-600">
//           <strong>Stipend:</strong> {internship.stipend || 'INR 10000 per Month'}
//         </p>
//         <p className="text-xs text-gray-600">
//           <strong>Duration:</strong> {internship.duration || '6 Months'}
//         </p>

//         {/* Skills */}
//         <p className="text-xs text-gray-600 font-medium">Skills Required:</p>
//         <div className="flex flex-wrap gap-2 mb-2">
//           {internship.skills.slice(0, 6).map((skill, index) => (
//             <span key={index} className="bg-gray-100 text-xs border px-2 py-0.5 rounded">
//               {skill}
//             </span>
//           ))}
//         </div>

//         {/* Actively Hiring */}
//         <div className="flex items-center gap-2 mb-4">
//           <span className="text-xl">😊</span>
//           <span className="text-xs text-green-600 font-medium">Actively Hiring</span>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-2">
//           <button
//             onClick={handleViewDetails}
//             className="w-1/2 py-2 text-xs border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
//           >
//             Know more
//           </button>
//           <button
//             onClick={() => window.open(`/apply/${internship._id}`, '_blank')}
//             className="w-1/2 py-2 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Apply Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InternshipCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../App';

interface InternshipCardProps {
  internship: {
    _id: string;
    internshipBanner: string;
    companyBanner: string;
    domain: string;
    jobType: string;
    internshipName: string;
    description: string;
    skills: string[];
    companyName: string;
    stipend: string;
    duration: string;
    location: string;
    workingHours: string;
    jobProfile: string;
    shiftType: string;
    lastDateToApply: string;
    softSkills?: string[];
    perks?: string;
  };
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/internships/${internship._id}`);
  };

  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow w-full max-w-sm">
      {/* Internship Banner Section */}
      <div className="relative h-28">
        <img
          src={`${API_BASE_URL}${internship.internshipBanner}`}
          alt="Internship Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-2 text-[10px] font-semibold">
          <span className="bg-black text-white px-2 py-0.5 rounded">Internship + PPO</span>
          <span className="bg-gray-300 text-black px-2 py-0.5 rounded">{internship.workingHours}</span>
        </div>
        <div className="absolute top-2 right-2 text-[11px] font-medium text-black">
          Apply By:{' '}
          {new Date(internship.lastDateToApply).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </div>
      </div>

      {/* Header Info Row: Company Logo + Info */}
      <div className="flex items-center px-4 -mt-6 mb-2">
        {/* <div className="w-14 h-14 rounded-full bg-white shadow border overflow-hidden">
          <img
            src={`${API_BASE_URL}${internship.companyBanner}`}
            alt="Company Logo"
            className="w-full h-full object-cover"
          />
        </div> */}
        <div className="w-16 h-16 rounded-full bg-white shadow-md border-2 border-white flex items-center justify-center overflow-hidden">
  <img
    src={`${API_BASE_URL}${internship.companyBanner}`}
    alt="Company Logo"
    className="max-w-[90%] max-h-[90%] object-contain"
  />
</div>

        <div className="ml-4">
          <p className="text-sm font-medium">{internship.companyName}</p>
          <div className="flex gap-2 mt-1 text-xs">
            <span className="bg-black text-white px-2 py-0.5 rounded">
              {internship.location || 'Location'}
            </span>
            <span className="bg-black text-white px-2 py-0.5 rounded">{internship.jobType}</span>
          </div>
        </div>
      </div>

      {/* Internship Info Section */}
      <div className="px-4 py-1">
        <h3 className="text-sm font-semibold mb-1 text-black">{internship.internshipName} - Interns</h3>
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
          <strong>Eligibility:</strong> {internship.jobProfile}
        </p>

        <div className="flex gap-2 mb-2">
          <span className="bg-gray-200 text-xs px-2 py-0.5 rounded text-black">2025</span>
          <span className="bg-gray-200 text-xs px-2 py-0.5 rounded text-black">2026</span>
        </div>

        <p className="text-xs text-gray-700 mb-1">
          <strong>Stipend:</strong> {internship.stipend || 'INR 10000 per Month'}
        </p>
        <p className="text-xs text-gray-700 mb-2">
          <strong>Duration:</strong> {internship.duration || '6 Months'}
        </p>

        <p className="text-xs text-gray-700 font-medium mb-1">Skills Required:</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {internship.skills.slice(0, 6).map((skill, index) => (
            <span key={index} className="bg-gray-100 text-xs border px-2 py-0.5 rounded text-black">
              {skill}
            </span>
          ))}
        </div>

        {/* Footer Section */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">😊</span>
          <span className="text-xs text-green-600 font-medium">Actively Hiring</span>
        </div>

        {/* Action Buttons */}
        {/* <div className="flex gap-2"> */}
        <button
  onClick={handleViewDetails}
  className="w-full py-2 text-xs border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
>
  Know more
</button>

          {/* <button
            onClick={() => window.open(`/apply/${internship._id}`, '_blank')}
            className="w-1/2 py-2 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply Now
          </button> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default InternshipCard;
