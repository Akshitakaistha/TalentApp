// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API_BASE_URL } from "../App";
// import ApplicationModal from "../components/dashboard/modals/ApplicationModal";

// interface PostGrad {
//   _id: string;
//   banner: string;
//   specialization: string;
//   courseName: string;
//   skills: string[];
//   organizationName: string;
//   courseFee: string;
//   duration: string;
//   location: string;
//   organizationWebsite: string;
//   emi: string;
//   courseType: string;
//   courseDetails: string;
// }

// const PostGradDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [postgrad, setPostgrad] = useState<PostGrad | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchPostgrad = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/postgrad/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch postgrad details");
//         const data = await response.json();
//         setPostgrad(data);
//       } catch (err: any) {
//         setError(err.message || "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPostgrad();
//   }, [id]);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleApplicationSubmit = async (formData: FormData) => {
//     if (!postgrad) return;
//     formData.append('relatedTo', postgrad._id);
//     formData.append('applicationType', 'PostGrad');

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

//   if (loading) return <div className="p-6 text-center text-gray-600">Loading postgrad details...</div>;
//   if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
//   if (!postgrad) return <div className="p-6 text-center text-gray-600">No postgrad course found.</div>;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 bg-gray-50">
//       {/* Header */}
//       <div className="bg-white p-6 rounded-lg shadow border space-y-4">
//         <div className="flex justify-between items-start">
//           <div>
//             <h1 className="text-xl font-semibold text-black">{postgrad.courseName}</h1>
//             <p className="text-sm text-gray-600">{postgrad.specialization}</p>
//             <p className="text-sm text-gray-600">Organization: {postgrad.organizationName}</p>
//             <p className="text-sm text-gray-600">{postgrad.courseType} • {postgrad.location}</p>
//           </div>
//           <div className="text-sm text-right">
//             <p className="text-gray-800">Duration</p>
//             <p className="font-medium text-black">{postgrad.duration}</p>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="pt-4 border-t">
//           <h2 className="font-semibold text-black">About the Course</h2>
//           <p className="text-sm text-gray-700">{postgrad.courseDetails}</p>
//         </div>

//         {/* Skills */}
//         <div className="pt-4 border-t">
//           <h2 className="font-semibold text-black">Skills Covered</h2>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {postgrad.skills.map((skill, idx) => (
//               <span
//                 key={idx}
//                 className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Fee and EMI */}
//         <div className="pt-4 border-t grid grid-cols-2 gap-6 text-sm text-gray-800">
//           <div>
//             <p className="font-semibold">Course Fee</p>
//             <p>{postgrad.courseFee}</p>
//           </div>
//           <div>
//             <p className="font-semibold">EMI</p>
//             <p>{postgrad.emi}</p>
//           </div>
//           <div>
//             <p className="font-semibold">Organization Website</p>
//             <a href={postgrad.organizationWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//               {postgrad.organizationWebsite}
//             </a>
//           </div>
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

// export default PostGradDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../App";
import ApplicationModal from "../components/dashboard/modals/ApplicationModal";

interface PostGrad {
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
  eligibilityCriteria: string;
  certificationProvided: string;
  scholarshipAvailable: boolean;
  enrollmentDeadline: string;
  batchStartDate: string;
  totalSeats: number;
}

const PostGradDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [postgrad, setPostgrad] = useState<PostGrad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPostgrad = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/postgrad/${id}`);
        if (!response.ok) throw new Error("Failed to fetch postgrad details");
        const data = await response.json();
        setPostgrad(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchPostgrad();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleApplicationSubmit = async (formData: FormData) => {
    if (!postgrad) return;
    formData.append("relatedTo", postgrad._id);
    formData.append("applicationType", "PostGrad");

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

  if (loading) return <div className="p-6 text-center text-gray-600">Loading postgrad details...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!postgrad) return <div className="p-6 text-center text-gray-600">No postgrad course found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow border space-y-4">
        <img
          src={`${API_BASE_URL}${postgrad.banner}`}
          alt="Course Banner"
          className="w-full h-64 object-cover rounded"
        />

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-black">{postgrad.courseName}</h1>
            <p className="text-sm text-gray-600">{postgrad.specialization}</p>
            <p className="text-sm text-gray-600">Organization: {postgrad.organizationName}</p>
            <p className="text-sm text-gray-600">{postgrad.courseType} • {postgrad.location}</p>
          </div>
          <div className="text-sm text-right">
            <p className="text-gray-800">Duration</p>
            <p className="font-medium text-black">{postgrad.duration}</p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h2 className="font-semibold text-black">About the Course</h2>
          <p className="text-sm text-gray-700">{postgrad.courseDetails}</p>
        </div>

        <div className="pt-4 border-t">
          <h2 className="font-semibold text-black">Skills Covered</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {postgrad.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t grid grid-cols-2 gap-6 text-sm text-gray-800">
          <div>
            <p className="font-semibold">Course Fee</p>
            <p>{postgrad.courseFee}</p>
          </div>
          <div>
            <p className="font-semibold">EMI</p>
            <p>{postgrad.emi}</p>
          </div>
          <div>
            <p className="font-semibold">Organization Website</p>
            <a
              href={postgrad.organizationWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {postgrad.organizationWebsite}
            </a>
          </div>
          <div>
            <p className="font-semibold">Eligibility Criteria</p>
            <p>{postgrad.eligibilityCriteria}</p>
          </div>
          <div>
            <p className="font-semibold">Certification Provided</p>
            <p>{postgrad.certificationProvided}</p>
          </div>
          <div>
            <p className="font-semibold">Scholarship Available</p>
            <p>{postgrad.scholarshipAvailable ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="font-semibold">Enrollment Deadline</p>
            <p>{new Date(postgrad.enrollmentDeadline).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-semibold">Batch Start Date</p>
            <p>{new Date(postgrad.batchStartDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-semibold">Total Seats</p>
            <p>{postgrad.totalSeats}</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={openModal}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Apply Here
        </button>
      </div>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );
};

export default PostGradDetails;
