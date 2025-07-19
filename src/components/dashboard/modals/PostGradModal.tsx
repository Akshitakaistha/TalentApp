/**
 * Function is used to render theb PGP modal
 */
import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";

interface PostGradModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  editData?: any;
}

const PostGradModal: React.FC<PostGradModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editData,
}) => {
  const [formData, setFormData] = useState({
    specialization: "",
    courseName: "",
    organizationName: "",
    courseFee: "",
    skills: ["", "", "", "", ""],
    duration: "",
    location: "",
    organizationWebsite: "",
    emi: "",
    courseType: "",
    courseDetails: "",
    eligibilityCriteria: "",
    certificationProvided: "",
    scholarshipAvailable: "",
    enrollmentDeadline: "",
    batchStartDate: "",
    totalSeats: "",
  });
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (editData) {
      setFormData({
        specialization: editData.specialization || "",
        courseName: editData.courseName || "",
        organizationName: editData.organizationName || "",
        courseFee: editData.courseFee || "",
        skills: editData.skills || ["", "", ""],
        duration: editData.duration || "",
        location: editData.location || "",
        organizationWebsite: editData.organizationWebsite || "",
        emi: editData.emi || "",
        courseType: editData.courseType || "",
        courseDetails: editData.courseDetails || "",
        eligibilityCriteria: editData.eligibilityCriteria || "",
        certificationProvided: editData.certificationProvided || "",
        scholarshipAvailable: editData.scholarshipAvailable || "",
        enrollmentDeadline: editData.enrollmentDeadline || "",
        batchStartDate: editData.batchStartDate || "",
        totalSeats: editData.totalSeats || "",
      });
      if (editData.banner) {
        setPreviewUrl(`http://localhost:3000${editData.banner}`);
      }
    } else {
      setFormData({
        specialization: "",
        courseName: "",
        organizationName: "",
        courseFee: "",
        skills: ["", "", "", "", ""],
        duration: "",
        location: "",
        organizationWebsite: "",
        emi: "",
        courseType: "",
        courseDetails: "",
        eligibilityCriteria: "",
        certificationProvided: "",
        scholarshipAvailable: "",
        enrollmentDeadline: "",
        batchStartDate: "",
        totalSeats: "",
      });
      setPreviewUrl("");
      setBannerFile(null);
    }
  }, [editData, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "skills") {
        (value as string[]).forEach((skill, index) => {
          submitData.append(`skills[${index}]`, skill);
        });
      } else {
        submitData.append(key, value as string);
      }
    });
    if (bannerFile) {
      submitData.append("banner", bannerFile);
    }
    onSubmit(submitData);
  };

  if (!isOpen) return null;

  function renderForm() {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Banner
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="banner-upload"
            />
            <label
              htmlFor="banner-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-32 w-48 object-cover rounded mb-2"
                />
              ) : (
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
              )}
              <span className="text-sm text-gray-600">
                Click to upload banner
              </span>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name
            </label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organization Name
          </label>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills (3 required)
          </label>
          <div className="space-y-2">
            {formData.skills.map((skill, index) => (
              <input
                key={index}
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder={`Skill ${index + 1}`}
                className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization Website Url
            </label>
            <input
              type="text"
              name="organizationWebsite"
              value={formData.organizationWebsite}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              EMI
            </label>
            <input
              type="text"
              name="emi"
              value={formData.emi}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Type
          </label>
          <input
            type="text"
            name="courseType"
            value={formData.courseType}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Fee
          </label>
          <input
            type="text"
            name="courseFee"
            value={formData.courseFee}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Details
          </label>
          <textarea
            name="courseDetails"
            value={formData.courseDetails}
            onChange={handleInputChange}
            rows={3}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Eligibility Criteria
          </label>
          <textarea
            name="eligibilityCriteria"
            value={formData.eligibilityCriteria}
            onChange={handleInputChange}
            rows={3}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certification Provided
          </label>
          <select
            name="certificationProvided"
            value={formData.certificationProvided}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2"
            required
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Scholarship Available
          </label>
          <select
            name="scholarshipAvailable"
            value={formData.scholarshipAvailable}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2"
            required
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enrollment Deadline
          </label>
          <input
            type="date"
            name="enrollmentDeadline"
            value={formData.enrollmentDeadline}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Batch Start Date
          </label>
          <input
            type="date"
            name="batchStartDate"
            value={formData.batchStartDate}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Seats
          </label>
          <input
            type="number"
            name="totalSeats"
            value={formData.totalSeats}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2"
            required
          />
        </div>
      </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          {/* <Link to={`/jobs/${job._id}`}> */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {editData ? "Update" : "Create"}
          </button>
          {/* </Link> */}
        </div>
      </form>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black">
            {editData ? "Edit Postgrad" : "Create New Postgrad"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {renderForm()}
      </div>
    </div>
  );
};

export default PostGradModal;
