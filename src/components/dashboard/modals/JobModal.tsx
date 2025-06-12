/**
 * Used to crate the modal for the job.
 */
import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  editData?: any;
}

const JobModal: React.FC<JobModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editData
}) => {
  const [formData, setFormData] = useState({
    industryType: '',
    jobType: '',
    jobName: '',
    description: '',
    skills: ['', '', ''],
    companyName: '',
    salaryPackage: '',
    companyWebsiteUrl: '',
    location: '',
    workingHours: '',
    jobProfile: '',
    shiftType: '',
    experience: ''
  });
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (editData) {
      setFormData({
        industryType: editData.industryType || '',
        jobType: editData.jobType || '',
        jobName: editData.jobName || '',
        description: editData.description || '',
        skills: editData.skills || ['', '', ''],
        companyName: editData.companyName || '',
        salaryPackage: editData.salaryPackage || '',
        companyWebsiteUrl: editData.companyWebsiteUrl || '',
        location: editData.location || '',
        workingHours: editData.workingHours || '',
        jobProfile: editData.jobProfile || '',
        shiftType: editData.shiftType || '',
        experience: editData.experience || ''
      });
      if (editData.jobBanner) {
        setPreviewUrl(`http://localhost:3000${editData.jobBanner}`);
      }
    } else {
      setFormData({
        industryType: '',
        jobType: '',
        jobName: '',
        description: '',
        skills: ['', '', ''],
        companyName: '',
        salaryPackage: '',
        companyWebsiteUrl: '',
        location: '',
        workingHours: '',
        jobProfile: '',
        shiftType: '',
        experience:''
      });
      setPreviewUrl('');
      setBannerFile(null);
    }
  }, [editData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prev => ({
      ...prev,
      skills: newSkills
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
      if (key === 'skills') {
        (value as string[]).forEach((skill, index) => {
          submitData.append(`skills[${index}]`, skill);
        });
      } else {
        submitData.append(key, value as string);
      }
    })
    if (bannerFile) {
      submitData.append('jobBanner', bannerFile);
    }
    onSubmit(submitData);
  };

  if (!isOpen) return null;

  function renderForm(){
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Banner
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
              <img src={previewUrl} alt="Preview" className="h-32 w-48 object-cover rounded mb-2" />
            ) : (
              <Upload className="h-12 w-12 text-gray-400 mb-2" />
            )}
            <span className="text-sm text-gray-600">Click to upload banner</span>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
           Industry Type
          </label>
          <input
            type="text"
            name="industryType"
            value={formData.industryType}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Type
          </label>
          <input
            type="text"
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Name
        </label>
        <input
          type="text"
          name="jobName"
          value={formData.jobName}
          onChange={handleInputChange}
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
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
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
           Salary Package
          </label>
          <input
            type="text"
            name="salaryPackage"
            value={formData.salaryPackage}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Website Url
          </label>
          <input
            type="text"
            name="companyWebsiteUrl"
            value={formData.companyWebsiteUrl}
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
            Working Hours
          </label>
          <input
            type="text"
            name="workingHours"
            value={formData.workingHours}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shift Type
          </label>
          <select
            name="shiftType"
            value={formData.shiftType}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select shift type</option>
            <option value="Day">Day</option>
            <option value="Night">Night</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Profile
        </label>
        <textarea
          name="jobProfile"
          value={formData.jobProfile}
          onChange={handleInputChange}
          rows={3}
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience
          </label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {editData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black">
            {editData ? 'Edit Internship' : 'Create New Internship'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        {renderForm()}
      </div>
    </div>
  );
};

export default JobModal;
