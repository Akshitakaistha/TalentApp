/**
 * Used to create the modal for the job.
 */
import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { API_BASE_URL } from '../../../App';

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
    skills: ['', '', '', '', ''],
    companyName: '',
    salaryPackage: '',
    companyWebsiteUrl: '',
    location: '',
    workingHours: '',
    jobProfile: '',
    shiftType: '',
    experience: '',
    applicationDeadline: '',
    openings: '',
    perks: '',
    eligibility: '',
    foundedYear: '',
    companyAddress: '',
    hiringProcess: '',
    companyType: ''
  });
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string>('');
  const [companyBannerFile, setCompanyBannerFile] = useState<File | null>(null);
  const [companyBannerPreviewUrl, setCompanyBannerPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (editData) {
      setFormData({
        industryType: editData.industryType || '',
        jobType: editData.jobType || '',
        jobName: editData.jobName || '',
        description: editData.description || '',
        skills: editData.skills || ['', '', '', '',''],
        companyName: editData.companyName || '',
        salaryPackage: editData.salaryPackage || '',
        companyWebsiteUrl: editData.companyWebsiteUrl || '',
        location: editData.location || '',
        workingHours: editData.workingHours || '',
        jobProfile: editData.jobProfile || '',
        shiftType: editData.shiftType || '',
        experience: editData.experience || '',
        applicationDeadline: editData.applicationDeadline || '',
        openings: editData.openings || '',
        perks: editData.perks || '',
        eligibility: editData.eligibility || '',
        foundedYear: editData.foundedYear || '',
        companyAddress: editData.companyAddress || '',
        hiringProcess: editData.hiringProcess || '',
        companyType: editData.companyType || ''
      });
      if (editData.jobBanner) {
        setBannerPreviewUrl(`${API_BASE_URL}${editData.jobBanner}`);
      } else {
        setBannerPreviewUrl('');
      }
      if (editData.companyBanner) {
        setCompanyBannerPreviewUrl(`${API_BASE_URL}${editData.companyBanner}`);
      } else {
        setCompanyBannerPreviewUrl('');
      }
    } else {
      setFormData({
        industryType: '',
        jobType: '',
        jobName: '',
        description: '',
        skills: ['', '', '', '', '',],
        companyName: '',
        salaryPackage: '',
        companyWebsiteUrl: '',
        location: '',
        workingHours: '',
        jobProfile: '',
        shiftType: '',
        experience: '',
        applicationDeadline: '',
        openings: '',
        perks: '',
        eligibility: '',
        foundedYear: '',
        companyAddress: '',
        hiringProcess: '',
        companyType: ''
      });
      setBannerPreviewUrl('');
      setBannerFile(null);
      setCompanyBannerPreviewUrl('');
      setCompanyBannerFile(null);
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

  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const url = URL.createObjectURL(file);
      setBannerPreviewUrl(url);
    }
  };

  const handleCompanyBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompanyBannerFile(file);
      const url = URL.createObjectURL(file);
      setCompanyBannerPreviewUrl(url);
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
    });
    if (bannerFile) {
      submitData.append('jobBanner', bannerFile);
    }
    if (companyBannerFile) {
      submitData.append('companyBanner', companyBannerFile);
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
            onChange={handleBannerFileChange}
            className="hidden"
            id="banner-upload"
          />
          <label
            htmlFor="banner-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            {bannerPreviewUrl ? (
              <img src={bannerPreviewUrl} alt="Preview" className="h-32 w-48 object-cover rounded mb-2" />
            ) : (
              <Upload className="h-12 w-12 text-gray-400 mb-2" />
            )}
            <span className="text-sm text-gray-600">Click to upload banner</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Banner
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleCompanyBannerFileChange}
            className="hidden"
            id="company-banner-upload"
          />
          <label
            htmlFor="company-banner-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            {companyBannerPreviewUrl ? (
              <img src={companyBannerPreviewUrl} alt="Preview" className="h-32 w-48 object-cover rounded mb-2" />
            ) : (
              <Upload className="h-12 w-12 text-gray-400 mb-2" />
            )}
            <span className="text-sm text-gray-600">Click to upload company banner</span>
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
          Skills (5 required)
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
          className="w-full text-black border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Application Deadline
    </label>
    <input
      type="date"
      name="applicationDeadline"
      value={formData.applicationDeadline}
      onChange={handleInputChange}
      className="w-full text-black border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      required
    />
  </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
          Openings
          </label>
          <input
            type="number"
            name="openings"
            value={formData.openings}
            onChange={handleInputChange}
            className="w-full text-black border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Perks & Benifits
            </label>
            <textarea
              name="perks"
              value={formData.perks}
              onChange={handleInputChange}
              rows={5}
              className="w-full text-black border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
             Eligibility
            </label>
            <textarea
              name="eligibility"
              value={formData.eligibility}
              onChange={handleInputChange}
              rows={5}
              className="w-full text-black border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Founded Year
          </label>
          <input
            type="number"
            name="foundedYear"
            value={formData.foundedYear}
            onChange={handleInputChange}
            className="w-full text-black border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Address
          </label>
          <input
            type="text"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Type
          </label>
          <input
            type="text"
            name="companyType"
            value={formData.companyType}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
             Hiring Process
            </label>
            <textarea
              name="hiringProcess"
              value={formData.hiringProcess}
              onChange={handleInputChange}
              rows={5}
              className="w-full text-black border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            {editData ? 'Edit Job' : 'Create New Job'}
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
