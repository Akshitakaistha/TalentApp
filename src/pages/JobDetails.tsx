// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API_BASE_URL } from "../App";
// import ApplicationModal from "../components/dashboard/modals/ApplicationModal";

// interface Job {
//   _id: string;
//   jobBanner: string;
//   companyBanner: string;
//   industryType: string;
//   jobType: string;
//   jobName: string;
//   description: string;
//   skills: string[];
//   companyName: string;
//   salaryPackage: string;
//   location: string;
//   companyWebsiteUrl: string;
//   workingHours: string;
//   jobProfile: string;
//   shiftType: string;
//   experience: string;
//   applicationDeadline: string;
//   openings: string;
//   perks: string;
//   eligibility: string;
//   foundedYear: string;
//   companyAddress: string;
//   hiringProcess: string;
//   companyType: string;
// }

// const JobDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [job, setJob] = useState<Job | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/jobs/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch job details");
//         const data = await response.json();
//         setJob(data);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("Unknown error");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJob();
//   }, [id]);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleApplicationSubmit = async (formData: FormData) => {
//     if (!job) return;
//     formData.append('relatedTo', job._id);
//     formData.append('applicationType', 'Job');

//     try {
//       const res = await fetch(`${API_BASE_URL}/api/applications`, {
//         method: 'POST',
//         body: formData,
//       });
//       if (!res.ok) {
//         const errorData = await res.json();
//         alert('Failed to submit application: ' + (errorData.message || 'Unknown error'));
//         return;
//       }
//       alert('Application submitted successfully!');
//       closeModal();
//     } catch (error) {
//       alert('Error submitting application: ' + error);
//     }
//   };

//   if (loading) return <div className="p-6 text-center text-gray-600">Loading job details...</div>;
//   if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
//   if (!job) return <div className="p-6 text-center text-gray-600">No job found.</div>;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 bg-gray-50">
//       {/* Job Banner */}
//       {job.jobBanner && (
//         <div className="w-full h-60 md:h-96 rounded-xl overflow-hidden shadow-md">
//           <img
//             src={`${API_BASE_URL}${job.jobBanner}`}
//             alt={job.jobName}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}

//       {/* Header */}
//       <div className="bg-white p-6 rounded-lg shadow border space-y-4">
//         <div className="flex justify-between items-start">
//           <div className="flex items-start gap-4">
//             <div className="w-14 h-14 rounded-full bg-white shadow border overflow-hidden">
//               <img
//                 src={`${API_BASE_URL}${job.companyBanner}`}
//                 alt="Company Logo"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div>
//               <h1 className="text-xl font-semibold text-black">{job.jobName}</h1>
//               <p className="text-sm text-gray-600">{job.companyName}</p>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{job.industryType}</span>
//                 <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{job.jobType}</span>
//               </div>
//             </div>
//           </div>
//           <div className="text-sm text-right">
//             <p className="text-gray-800">Location</p>
//             <p className="font-medium text-black">{job.location}</p>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="pt-4 border-t">
//           <h2 className="font-semibold text-black">About the Job</h2>
//           <p className="text-sm text-gray-700">{job.description}</p>
//         </div>

//         {/* Skills */}
//         <div className="pt-4 border-t">
//           <h2 className="font-semibold text-black">Skills Required</h2>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {job.skills.map((skill, idx) => (
//               <span
//                 key={idx}
//                 className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Job Details Grid */}
//         <div className="pt-4 border-t">
//           <h2 className="font-semibold text-black mb-4">Job Details</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800">
//             <div>
//               <p className="font-semibold">Company Name</p>
//               <p>{job.companyName}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Job Profile</p>
//               <p>{job.jobProfile}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Salary Package</p>
//               <p>{job.salaryPackage}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Experience</p>
//               <p>{job.experience}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Shift Type</p>
//               <p>{job.shiftType}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Working Hours</p>
//               <p>{job.workingHours}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Application Deadline</p>
//               <p>{new Date(job.applicationDeadline).toLocaleDateString()}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Openings</p>
//               <p>{job.openings}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Company Type</p>
//               <p>{job.companyType}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Founded Year</p>
//               <p>{job.foundedYear}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Company Address</p>
//               <p>{job.companyAddress}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Hiring Process</p>
//               <p>{job.hiringProcess}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Company Website</p>
//               <a href={job.companyWebsiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                 {job.companyWebsiteUrl}
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Eligibility */}
//         <div className="pt-4 border-t">
//           <h2 className="font-semibold text-black">Eligibility</h2>
//           <p className="text-sm text-gray-700">{job.eligibility}</p>
//         </div>

//         {/* Perks */}
//         <div className="pt-4 border-t">
//           <h2 className="font-semibold text-black">Perks</h2>
//           <ul className="list-disc list-inside text-sm text-gray-700">
//             {job.perks.split(",").map((perk, idx) => (
//               <li key={idx}>{perk.trim()}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Apply Button */}
//       <div className="text-center">
//         <button
//           onClick={openModal}
//           className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
//         >
//           Apply Here
//         </button>
//       </div>

//       <ApplicationModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onSubmit={handleApplicationSubmit}
//       />
//     </div>
//   );
// };

// export default JobDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../App";
import ApplicationModal from "../components/dashboard/modals/ApplicationModal";

interface Job {
  _id: string;
  jobBanner: string;
  companyBanner: string;
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
  applicationDeadline: string;
  openings: string;
  perks: string;
  eligibility: string;
  foundedYear: string;
  companyAddress: string;
  hiringProcess: string;
  companyType: string;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border-t pt-6">
    <h2 className="text-lg font-semibold mb-2 text-gray-900">{title}</h2>
    {children}
  </div>
);

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/jobs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch job details");
        const data = await response.json();
        setJob(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleApplicationSubmit = async (formData: FormData) => {
    if (!job) return;
    formData.append('relatedTo', job._id);
    formData.append('applicationType', 'Job');

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

  if (loading) return <div className="p-6 text-center text-gray-600">Loading job details...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!job) return <div className="p-6 text-center text-gray-600">No job found.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow">
        <img
          src={`${API_BASE_URL}${job.jobBanner}`}
          alt={job.jobName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 flex items-end">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white overflow-hidden">
              <img
                src={`${API_BASE_URL}${job.companyBanner}`}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-bold">{job.jobName}</h1>
              <p className="text-sm md:text-base">{job.companyName}</p>
              <div className="flex gap-2 mt-1 flex-wrap">
                <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded">{job.industryType}</span>
                <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded">{job.jobType}</span>
                <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded">{job.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <Section title="About the Job">
        <p className="text-sm">{job.description}</p>
      </Section>

      {/* Skills */}
      <Section title="Skills Required">
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, i) => (
            <span key={i} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </Section>

      {/* Job Overview */}
      <Section title="Job Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {[
            ['Company Name', job.companyName],
            ['Job Profile', job.jobProfile],
            ['Salary Package', job.salaryPackage],
            ['Experience', job.experience],
            ['Shift Type', job.shiftType],
            ['Working Hours', job.workingHours],
            ['Application Deadline', new Date(job.applicationDeadline).toLocaleDateString()],
            ['Openings', job.openings],
          ].map(([label, value], idx) => (
            <div key={idx}>
              <p className="font-medium text-gray-600">{label}</p>
              <p className="text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Eligibility */}
      <Section title="Eligibility">
        <p className="text-sm">{job.eligibility}</p>
      </Section>

      {/* Perks */}
      <Section title="Perks & Benefits">
        <ul className="list-disc pl-4 space-y-1 text-sm">
          {job.perks.split(',').map((perk, i) => (
            <li key={i}>{perk.trim()}</li>
          ))}
        </ul>
      </Section>

      {/* Hiring Process */}
      <Section title="Hiring Process">
        <p className="text-sm">{job.hiringProcess}</p>
      </Section>

      {/* Company Details */}
      <Section title="Company Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-medium text-gray-600">Company Type</p>
            <p>{job.companyType}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Founded Year</p>
            <p>{job.foundedYear}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Company Address</p>
            <p>{job.companyAddress}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Company Website</p>
            <a
              href={job.companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline break-words"
            >
              {job.companyWebsiteUrl}
            </a>
          </div>
        </div>
      </Section>

      {/* Apply Button */}
      <div className="text-center">
        <button
          onClick={openModal}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition"
        >
          Apply Now
        </button>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );
};

export default JobDetails;
