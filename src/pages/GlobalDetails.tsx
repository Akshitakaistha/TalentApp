import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../App";
import ApplicationModal from "../components/dashboard/modals/ApplicationModal";

interface Global {
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
}

const GlobalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [global, setGlobal] = useState<Global | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchGlobal = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/global/${id}`);
        if (!response.ok) throw new Error("Failed to fetch global program details");
        const data = await response.json();
        setGlobal(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchGlobal();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleApplicationSubmit = async (formData: FormData) => {
    if (!global) return;
    formData.append('relatedTo', global._id);
    formData.append('applicationType', 'Global');

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

  if (loading) return <div className="p-6 text-center text-gray-600">Loading global program details...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!global) return <div className="p-6 text-center text-gray-600">No global program found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow border space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold text-black">{global.courseName}</h1>
            <p className="text-sm text-gray-600">{global.specialization}</p>
            <p className="text-sm text-gray-600">Organization: {global.organizationName}</p>
            <p className="text-sm text-gray-600">Industry Domain: {global.industryDomain}</p>
            <p className="text-sm text-gray-500">{global.courseType} • {global.location}</p>
          </div>
          <div className="text-sm text-right">
            <p className="text-gray-800">Duration</p>
            <p className="font-medium text-black">{global.duration}</p>
          </div>
        </div>

        {/* Description */}
        <div className="pt-4 border-t">
          <h2 className="font-semibold text-black">About the Program</h2>
          <p className="text-sm text-gray-700">{global.courseDetails}</p>
        </div>

        {/* Skills */}
        <div className="pt-4 border-t">
          <h2 className="font-semibold text-black">Skills Covered</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {global.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Fee and Website */}
        <div className="pt-4 border-t grid grid-cols-2 gap-6 text-sm text-gray-800">
          <div>
            <p className="font-semibold">Course Fee</p>
            <p>{global.courseFee}</p>
          </div>
          <div>
            <p className="font-semibold">Organization Website</p>
            <a href={global.organizationWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {global.organizationWebsite}
            </a>
          </div>
        </div>
      </div>

      {/* Apply Button */}
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

export default GlobalDetails;
