// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API_BASE_URL } from "../App";
// import ApplicationModal from "../components/dashboard/modals/ApplicationModal";

// interface Bootcamp {
//   _id: string;
//   bootcampBanner: string;
//   keyNotePic: string;
//   companyBanner: string;
//   viewers: number;
//   bootcampName: string;
//   skills: string[];
//   keynoteSpeaker: string;
//   goal: string;
//   location: string;
//   industryType: string;
//   date: string;
//   bootCampDesc: string;
// }

// const BootcampDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [bootcamp, setBootcamp] = useState<Bootcamp | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchBootcamp = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/bootcamps/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch bootcamp details");
//         const data = await response.json();
//         setBootcamp(data);
//       } catch (err: any) {
//         setError(err.message || "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBootcamp();
//   }, [id]);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleApplicationSubmit = async (formData: FormData) => {
//     if (!bootcamp) return;
//     formData.append('relatedTo', bootcamp._id);
//     formData.append('applicationType', 'Bootcamp');

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

//   if (loading) return <div className="p-6 text-center text-gray-600">Loading bootcamp details...</div>;
//   if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
//   if (!bootcamp) return <div className="p-6 text-center text-gray-600">No bootcamp found.</div>;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 bg-gray-50">
//       {/* Header */}
//       <div className="bg-white p-6 rounded-lg shadow border space-y-4">
//         <div className="flex justify-between items-start">
//           <div className="flex items-start gap-4">
//             <div className="w-14 h-14 rounded-full bg-white shadow border overflow-hidden">
//               <img
//                 src={`${API_BASE_URL}${bootcamp.companyBanner}`}
//                 alt="Company Logo"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div>
//               <h1 className="text-xl font-semibold text-black">{bootcamp.bootcampName}</h1>
//               <p className="text-sm text-gray-600">Keynote Speaker: {bootcamp.keynoteSpeaker}</p>
//               <p className="text-sm text-gray-500">{bootcamp.industryType} • {bootcamp.location}</p>
//             </div>
//           </div>
//           <div className="text-sm text-right">
//             <p className="text-gray-800">Date</p>
//             <p className="font-medium text-black">{new Date(bootcamp.date).toLocaleDateString()}</p>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="pt-4 border-t">
//           <h2 className="font-semibold text-black">About the Bootcamp</h2>
//           <p className="text-sm text-gray-700">{bootcamp.bootCampDesc}</p>
//         </div>

//         {/* Skills */}
//         <div className="pt-4 border-t">
//           <h2 className="font-semibold text-black">Skills Covered</h2>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {bootcamp.skills.map((skill, idx) => (
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
//           <p className="text-sm text-gray-700">{bootcamp.goal}</p>
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

// export default BootcampDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../App";
import ApplicationModal from "../components/dashboard/modals/ApplicationModal";

interface Bootcamp {
  _id: string;
  bootcampBanner: string;
  companyBanner: string;
  keyNotePic?: string;
  viewers: number;
  bootcampName: string;
  skills: string[];
  keynoteSpeaker: string;
  goal: string;
  location: string;
  industryType: string;
  date: string;
  bootCampDesc: string;
  organizerName?: string;
  organizerWebsite?: string;
  contactEmail?: string;
  supportNumber?: string;
  certificateAvailable?: boolean;
}

const BootcampDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bootcamp, setBootcamp] = useState<Bootcamp | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBootcamp = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/bootcamps/${id}`);
        if (!response.ok) throw new Error("Failed to fetch bootcamp details");
        const data = await response.json();
        setBootcamp(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchBootcamp();
  }, [id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleApplicationSubmit = async (formData: FormData) => {
    if (!bootcamp) return;
    formData.append("relatedTo", bootcamp._id);
    formData.append("applicationType", "Bootcamp");

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

  if (loading) return <div className="p-6 text-center text-gray-600">Loading bootcamp details...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!bootcamp) return <div className="p-6 text-center text-gray-600">No bootcamp found.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8 bg-gray-50">
      {/* Banner */}
      <div className="w-full h-64 rounded-lg overflow-hidden">
        <img
          src={`${API_BASE_URL}${bootcamp.bootcampBanner}`}
          alt="Bootcamp Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bootcamp Card */}
      <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-white shadow border overflow-hidden">
              <img
                src={`${API_BASE_URL}${bootcamp.companyBanner}`}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{bootcamp.bootcampName}</h1>
              <p className="text-sm text-gray-600">Keynote Speaker: {bootcamp.keynoteSpeaker}</p>
              <p className="text-sm text-gray-500">{bootcamp.industryType} • {bootcamp.location}</p>
              <p className="text-xs text-gray-400">Viewers: {bootcamp.viewers}</p>
            </div>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <p className="text-sm text-gray-600">Date</p>
            <p className="text-base font-medium text-gray-900">{new Date(bootcamp.date).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">About the Bootcamp</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{bootcamp.bootCampDesc}</p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">Skills Covered</h2>
          <div className="flex flex-wrap gap-2">
            {bootcamp.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">Goal</h2>
          <p className="text-sm text-gray-700">{bootcamp.goal}</p>
        </div>

        {/* Organizer Info */}
        {(bootcamp.organizerName || bootcamp.organizerWebsite) && (
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">Organizer</h2>
            <p className="text-sm text-gray-700">
              {bootcamp.organizerName && <span>{bootcamp.organizerName}</span>}
              {bootcamp.organizerWebsite && (
                <span className="ml-2 text-blue-600 underline">
                  <a href={bootcamp.organizerWebsite} target="_blank" rel="noopener noreferrer">Website</a>
                </span>
              )}
            </p>
          </div>
        )}

        {/* Contact Info */}
        {(bootcamp.contactEmail || bootcamp.supportNumber) && (
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">Contact</h2>
            <p className="text-sm text-gray-700">{bootcamp.contactEmail}</p>
            <p className="text-sm text-gray-700">{bootcamp.supportNumber}</p>
          </div>
        )}

        {/* Certificate Info */}
        {bootcamp.certificateAvailable && (
          <div>
            <h2 className="font-semibold text-green-700">🎓 Certificate Available</h2>
            <p className="text-sm text-gray-700">Participants will receive a certificate upon completion.</p>
          </div>
        )}

        {/* Apply Button */}
        <div className="text-center pt-4">
          <button
            onClick={openModal}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900"
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

export default BootcampDetails;
