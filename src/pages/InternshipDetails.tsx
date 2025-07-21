// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API_BASE_URL } from "../App";

// interface Internship {
//   _id: string;
//   internshipBanner: string;
//   companyBanner: string;
//   domain: string;
//   jobType: string;
//   internshipName: string;
//   description: string;
//   skills: string[];
//   companyName: string;
//   stipend: string;
//   duration: string;
//   location: string;
//   workingHours: string;
//   jobProfile: string;
//   shiftType: string;
// }

// const InternshipDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [internship, setInternship] = useState<Internship | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchInternship = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/internships/${id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch internship details");
//         }
//         const data = await response.json();
//         setInternship(data);
//       } catch (err: any) {
//         setError(err.message || "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInternship();
//   }, [id]);

//   if (loading) {
//     return <div className="p-6 text-center text-gray-600">Loading internship details...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-center text-red-600">Error: {error}</div>;
//   }

//   if (!internship) {
//     return <div className="p-6 text-center text-gray-600">No internship found.</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Banner half page */}
//         <div className="md:w-1/2 h-64 md:h-auto overflow-hidden rounded-lg shadow-lg">
//           <img
//             src={`${API_BASE_URL}\${internship.internshipBanner}`}
//             alt={internship.internshipName}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Details smaller section */}
//         <div className="md:w-1/2 space-y-4">
//           <div className="flex items-center gap-4">
//             <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
//               <img
//                 src={`${API_BASE_URL}\${internship.companyBanner}`}
//                 alt={internship.companyName}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">{internship.internshipName}</h1>
//               <p className="text-gray-600">{internship.companyName}</p>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{internship.domain}</span>
//                 <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{internship.jobType}</span>
//               </div>
//             </div>
//           </div>

//           <p className="text-gray-700">{internship.description}</p>

//           <div>
//             <h2 className="text-lg font-semibold mb-2">Skills Required</h2>
//             <ul className="list-disc list-inside text-gray-700">
//               {internship.skills.map((skill, index) => (
//                 <li key={index}>{skill}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="grid grid-cols-2 gap-4 text-gray-700">
//             <div>
//               <h3 className="font-semibold">Stipend</h3>
//               <p>{internship.stipend}</p>
//             </div>
//             <div>
//               <h3 className="font-semibold">Duration</h3>
//               <p>{internship.duration}</p>
//             </div>
//             <div>
//               <h3 className="font-semibold">Location</h3>
//               <p>{internship.location}</p>
//             </div>
//             <div>
//               <h3 className="font-semibold">Shift Type</h3>
//               <p>{internship.shiftType}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InternshipDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API_BASE_URL } from "../App";

// interface Internship {
//   _id: string;
//   internshipBanner: string;
//   companyBanner: string;
//   domain: string;
//   jobType: string;
//   internshipName: string;
//   description: string;
//   skills: string[];
//   companyName: string;
//   stipend: string;
//   duration: string;
//   location: string;
//   workingHours: string;
//   jobProfile: string;
//   shiftType: string;
// }

// const InternshipDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [internship, setInternship] = useState<Internship | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchInternship = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/internships/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch internship details");
//         const data = await response.json();
//         setInternship(data);
//       } catch (err: any) {
//         setError(err.message || "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInternship();
//   }, [id]);

//   if (loading) return <div className="p-6 text-center text-gray-600">Loading internship details...</div>;
//   if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
//   if (!internship) return <div className="p-6 text-center text-gray-600">No internship found.</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-8">
//       {/* Internship Banner */}
//       <div className="w-full h-60 md:h-96 rounded-xl overflow-hidden shadow-md">
//         <img
//           src={`${API_BASE_URL}${internship.internshipBanner}`}
//           alt={internship.internshipName}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Title Section */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//         <div className="flex items-start gap-4">
//           <img
//             src={`${API_BASE_URL}${internship.companyBanner}`}
//             alt={internship.companyName}
//             className="w-20 h-20 object-cover rounded-lg shadow border border-gray-200"
//           />
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">{internship.internshipName}</h1>
//             <p className="text-gray-600 text-sm">{internship.companyName}</p>
//             <div className="flex flex-wrap gap-2 mt-1">
//               <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{internship.domain}</span>
//               <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{internship.jobType}</span>
//             </div>
//           </div>
//         </div>
//         <div className="text-right">
//           <p className="text-sm text-gray-600">Location</p>
//           <p className="font-semibold text-gray-800">{internship.location}</p>
//         </div>
//       </div>

//       {/* Internship Description */}
//       <div>
//         <h2 className="text-lg font-semibold text-gray-900 mb-2">About the Internship</h2>
//         <p className="text-gray-700 leading-relaxed">{internship.description}</p>
//       </div>

//       {/* Skills */}
//       <div>
//         <h2 className="text-lg font-semibold text-gray-900 mb-2">Skills Required</h2>
//         <div className="flex flex-wrap gap-2">
//           {internship.skills.map((skill, idx) => (
//             <span
//               key={idx}
//               className="bg-green-100 text-green-800 px-3 py-1 text-xs rounded-full shadow-sm"
//             >
//               {skill}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Job Details Grid */}
//       <div>
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Internship Details</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800">
//           <div>
//             <p className="font-semibold">Company Name</p>
//             <p>{internship.companyName}</p>
//           </div>
//           <div>
//             <p className="font-semibold">Job Profile</p>
//             <p>{internship.jobProfile}</p>
//           </div>
//           <div>
//             <p className="font-semibold">Stipend</p>
//             <p>{internship.stipend}</p>
//           </div>
//           <div>
//             <p className="font-semibold">Duration</p>
//             <p>{internship.duration}</p>
//           </div>
//           <div>
//             <p className="font-semibold">Shift Type</p>
//             <p>{internship.shiftType}</p>
//           </div>
//           <div>
//             <p className="font-semibold">Working Hours</p>
//             <p>{internship.workingHours}</p>
//           </div>
//         </div>
//       </div>

//       {/* Apply Button */}
//       <div className="text-center">
//         <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
//           Apply Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InternshipDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../App";
import ApplicationModal from "../components/dashboard/modals/ApplicationModal";

interface Internship {
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
  companyDesc: string;
  softSkills: string[];
  perks: string;
  freeOrPaid: boolean;
  lastDateToApply: string;
  companySize: number;
  industryType: string;
  companyWebsiteUrl: string;
  foundingYear: number;
  companyType: string;
}

const InternshipDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/internships/${id}`);
        if (!res.ok) throw new Error("Failed to fetch internship");
        const data = await res.json();
        setInternship(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInternship();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleApplicationSubmit = async (formData: FormData) => {
    if (!internship) return;
    formData.append('relatedTo', internship._id);
    formData.append('applicationType', 'Internship');

    try {
      const res = await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert('Failed to submit application: ' + (errorData.message || 'Unknown error'));
        return;
      }
      alert('Application submitted successfully!');
      closeModal();
    } catch (error) {
      alert('Error submitting application: ' + error);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-600 text-center">Error: {error}</div>;
  if (!internship) return <div className="p-6 text-center">Internship not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow border space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-white shadow border overflow-hidden">
              <img
                src={`${API_BASE_URL}${internship.companyBanner}`}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-black">{internship.internshipName}</h1>
              <p className="text-sm text-gray-600">{internship.companyName}</p>
              <p className="text-sm text-gray-500">{internship.domain} • {internship.location}</p>
            </div>
          </div>
          <div className="text-sm text-right">
            <p className="text-gray-800">Application Deadline</p>
            <p className="font-medium text-black">
              {new Date(internship.lastDateToApply).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              })}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm pt-4 border-t">
          <div>
            <p className="text-gray-800">Work Location</p>
            <p className="font-medium text-black">{internship.location}</p>
          </div>
          <div>
            <p className="text-gray-800">Role Type</p>
            <p className="font-medium text-black">{internship.jobType}</p>
          </div>
          <div>
            <p className="text-gray-800">Stipend</p>
            <p className="font-medium text-black">{internship.stipend}</p>
          </div>
          <div>
            <p className="text-gray-800">Job Skills</p>
            <div className="flex flex-wrap gap-1">
              {internship.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 border text-gray-700 text-xs px-2 py-0.5 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility & Description */}
      <div className="bg-white p-6 rounded-lg shadow border space-y-4">
        <h2 className="font-semibold text-black">Eligibility</h2>
        <p className="text-sm text-gray-700">{internship.jobProfile}</p>

        <h2 className="font-semibold pt-4 border-t text-black">Job Description</h2>
        <p className="text-sm text-gray-700">{internship.description}</p>

        <h2 className="font-semibold pt-4 text-black">Roles and Responsibilities</h2>
        <p className="text-sm text-gray-600">Details not provided.</p>

        <div className="text-right">
          <button
            onClick={openModal}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Apply Here
          </button>
        </div>
      </div>

      {/* Preferred Skills & Benefits */}
      <div className="bg-white p-6 rounded-lg shadow border space-y-4">
        <h2 className="font-semibold text-black">Preferred Skills:</h2>
        <div className="flex flex-wrap gap-2">
          {internship.softSkills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        <h2 className="font-semibold pt-4 text-black">Benefits:</h2>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {internship.perks.split(",").map((perk, idx) => (
            <li key={idx}>{perk.trim()}</li>
          ))}
        </ul>

        <p className="text-sm text-gray-800">
          <strong>Expected Start Date:</strong>{" "}
          {new Date(internship.lastDateToApply).toLocaleDateString()}
        </p>
      </div>

      {/* Company Overview */}
      <div className="bg-white p-6 rounded-lg shadow border space-y-4">
        <h2 className="font-semibold text-black">Company Overview</h2>
        <p className="text-sm text-gray-700">{internship.companyDesc}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-sm text-gray-800">
          <p><strong>Size:</strong> {internship.companySize} Employees</p>
          <p><strong>Founded:</strong>{internship.foundingYear}</p>
          <p><strong>Type:</strong> Company - {internship.companyType}</p>
          <p><strong>Industry:</strong> {internship.industryType}</p>
        </div>
        <p className="text-blue-600 underline text-sm">
          Website URL: <a href={internship.companyWebsiteUrl} target="_blank" rel="noopener noreferrer">{internship.companyWebsiteUrl}</a>
        </p>
      </div>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );
};

export default InternshipDetails;
