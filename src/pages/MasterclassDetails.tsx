// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API_BASE_URL } from "../App";
// import ApplicationModal from "../components/dashboard/modals/ApplicationModal";

// interface Masterclass {
//   _id: string;
//   masterClassBanner: string;
//   keyNotePic: string;
//   companyBanner: string;
//   viewers: number;
//   masterClassName: string;
//   skills: string[];
//   keynoteSpeaker: string;
//   goal: string;
//   location: string;
//   industryType: string;
//   date: string;
//   masterClassDesc: string;
// }

// const MasterclassDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [masterclass, setMasterclass] = useState<Masterclass | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchMasterclass = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/masterclasses/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch masterclass details");
//         const data = await response.json();
//         setMasterclass(data);
//       } catch (err: any) {
//         setError(err.message || "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMasterclass();
//   }, [id]);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleApplicationSubmit = async (formData: FormData) => {
//     if (!masterclass) return;
//     formData.append('relatedTo', masterclass._id);
//     formData.append('applicationType', 'Masterclass');

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

//   if (loading) return <div className="p-6 text-center text-gray-600">Loading masterclass details...</div>;
//   if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
//   if (!masterclass) return <div className="p-6 text-center text-gray-600">No masterclass found.</div>;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 bg-gray-50">
//       {/* Header */}
//       <div className="bg-white p-6 rounded-lg shadow border space-y-4">
//         <div className="flex justify-between items-start">
//           <div className="flex items-start gap-4">
//             <div className="w-14 h-14 rounded-full bg-white shadow border overflow-hidden">
//               <img
//                 src={`${API_BASE_URL}${masterclass.companyBanner}`}
//                 alt="Company Logo"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div>
//               <h1 className="text-xl font-semibold text-black">{masterclass.masterClassName}</h1>
//               <p className="text-sm text-gray-600">{masterclass.keynoteSpeaker}</p>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{masterclass.industryType}</span>
//                 <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{masterclass.location}</span>
//               </div>
//             </div>
//           </div>
//           <div className="text-sm text-right">
//             <p className="text-gray-800">Date</p>
//             <p className="font-medium text-black">{new Date(masterclass.date).toLocaleDateString()}</p>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="pt-4 border-t">
//           <h2 className="font-semibold text-black">About the Masterclass</h2>
//           <p className="text-sm text-gray-700">{masterclass.masterClassDesc}</p>
//         </div>

//         {/* Skills */}
//         <div className="pt-4 border-t">
//           <h2 className="font-semibold text-black">Skills Covered</h2>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {masterclass.skills.map((skill, idx) => (
//               <span
//                 key={idx}
//                 className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Goal */}
//         <div className="pt-4 border-t">
//           <h2 className="font-semibold text-black">Goal</h2>
//           <p className="text-sm text-gray-700">{masterclass.goal}</p>
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

// export default MasterclassDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../App";
import ApplicationModal from "../components/dashboard/modals/ApplicationModal";

interface Masterclass {
  _id: string;
  masterClassBanner: string;
  keyNotePic: string;
  companyBanner: string;
  viewers: number;
  masterClassName: string;
  skills: string[];
  keynoteSpeaker: string;
  goal: string;
  location: string;
  industryType: string;
  date: string;
  masterClassDesc: string;
  meetingLink?: string;
  externalEventId?: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
  hostOrganization?: string;
  contactEmail?: string;
  hostWebsite?: string;
}

const MasterclassDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [masterclass, setMasterclass] = useState<Masterclass | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMasterclass = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/masterclasses/${id}`);
        if (!response.ok) throw new Error("Failed to fetch masterclass details");
        const data = await response.json();
        setMasterclass(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchMasterclass();
  }, [id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleApplicationSubmit = async (formData: FormData) => {
    if (!masterclass) return;
    formData.append("relatedTo", masterclass._id);
    formData.append("applicationType", "Masterclass");

    try {
      const res = await fetch(`${API_BASE_URL}/api/applications`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert("Failed to submit application: " + (errorData.message || "Unknown error"));
        return;
      }
      alert("Application submitted successfully!");
      closeModal();
    } catch (error) {
      alert("Error submitting application: " + error);
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-600">Loading masterclass details...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!masterclass) return <div className="p-6 text-center text-gray-600">No masterclass found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 bg-gray-50">
      <div className="rounded-lg overflow-hidden shadow">
        <img src={`${API_BASE_URL}${masterclass.masterClassBanner}`} alt="Masterclass Banner" className="w-full h-60 object-cover" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow border space-y-4">
        <div className="flex items-start gap-4">
          {masterclass.companyBanner && (
            <div className="w-16 h-16 rounded-full overflow-hidden border">
              <img src={`${API_BASE_URL}${masterclass.companyBanner}`} alt="Company Logo" className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-black">{masterclass.masterClassName}</h1>
            <p className="text-sm text-gray-700">Keynote: {masterclass.keynoteSpeaker}</p>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">{masterclass.industryType}</span>
              <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">{masterclass.location}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-black">Description</h2>
          <p className="text-sm text-gray-700">{masterclass.masterClassDesc}</p>
        </div>

        <div>
          <h2 className="font-semibold text-black">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {masterclass.skills.map((skill, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">{skill}</span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-black">Goal</h2>
          <p className="text-sm text-gray-700">{masterclass.goal}</p>
        </div>

        <div>
          <h2 className="font-semibold text-black">Schedule</h2>
          <p className="text-sm text-gray-700">Date: {new Date(masterclass.date).toLocaleDateString()}</p>
          {masterclass.startTime && (
            <p className="text-sm text-gray-700">Start Time: {new Date(masterclass.startTime).toLocaleTimeString()}</p>
          )}
          {masterclass.endTime && (
            <p className="text-sm text-gray-700">End Time: {new Date(masterclass.endTime).toLocaleTimeString()}</p>
          )}
          {masterclass.duration && (
            <p className="text-sm text-gray-700">Duration: {masterclass.duration}</p>
          )}
        </div>

        {masterclass.hostOrganization && (
          <div>
            <h2 className="font-semibold text-black">Hosted By</h2>
            <p className="text-sm text-gray-700">{masterclass.hostOrganization}</p>
            {masterclass.hostWebsite && (
              <a href={masterclass.hostWebsite} target="_blank" className="text-blue-600 text-sm underline">Visit Website</a>
            )}
            {masterclass.contactEmail && (
              <p className="text-sm text-gray-700">Contact: <a href={`mailto:${masterclass.contactEmail}`} className="text-blue-600 underline">{masterclass.contactEmail}</a></p>
            )}
          </div>
        )}

        {(masterclass.meetingLink || masterclass.externalEventId) && (
          <div>
            <h2 className="font-semibold text-black">Meeting Details</h2>
            {masterclass.meetingLink && (
              <p className="text-sm"><a href={masterclass.meetingLink} target="_blank" className="text-blue-600 underline">Join Meeting</a></p>
            )}
            {masterclass.externalEventId && (
              <p className="text-sm text-gray-700">Event ID: {masterclass.externalEventId}</p>
            )}
          </div>
        )}

        <div className="text-center pt-4">
          <button
            onClick={openModal}
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
          >
            Apply Now
          </button>
        </div>
      </div>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );
};

export default MasterclassDetails;
