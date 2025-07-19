import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';

interface BootcampModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  editData?: any;
}

const BootcampModal: React.FC<BootcampModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editData
}) => {
  const [formData, setFormData] = useState({
    industryType: '',
    bootcampName: '',
    bootCampDesc: '',
    skills: ['', '', '', '', ''],
    keynoteSpeaker: '',
    location: '',
    viewers: '',
    goal: '',
    date: '',
    organizerName : '',
    organizerWebsite: '',
     contactEmail: '',
      supportNumber: '',
    certificateAvailable: ''
  });
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string>('');
  const [companyBannerFile, setCompanyBannerFile] = useState<File | null>(null);
  const [companyBannerPreviewUrl, setCompanyBannerPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (editData) {
      setFormData({
        industryType: editData.industryType || '',
        keynoteSpeaker: editData.keynoteSpeaker || '',
        bootcampName: editData.bootcampName || '',
        bootCampDesc: editData.bootCampDesc || '',
        skills: editData.skills || ['', '', '', '', ''],
        viewers: editData.viewers || '',
        location: editData.location || '',
        goal: editData.goal || '',
        date: editData.date || '',
        organizerName : editData.organizerName || '',
    organizerWebsite: editData.organizerWebsite || '',
     contactEmail: editData.contactEmail || '',
      supportNumber: editData.supportNumber || '',
      certificateAvailable: editData?.certificateAvailable || false

      });
      if (editData.bootcampBanner) {
        setBannerPreviewUrl(`http://localhost:3000${editData.bootcampBanner}`);
      } else {
        setBannerPreviewUrl('');
      }
      if (editData.keyNotePic) {
        setCompanyBannerPreviewUrl(`http://localhost:3000${editData.keyNotePic}`);
      } else {
        setCompanyBannerPreviewUrl('');
      }
    } else {
      setFormData({
        industryType: '',
        keynoteSpeaker: '',
        bootcampName: '',
        bootCampDesc: '',
        skills: ['', '', '', '', ''],
        viewers: '',
        location: '',
        goal: '',
        date:'',
        organizerName : '',
    organizerWebsite: '',
     contactEmail: '',
      supportNumber: '',
    certificateAvailable: ''
      });
      setBannerPreviewUrl('');
      setBannerFile(null);
      setCompanyBannerPreviewUrl('');
      setCompanyBannerFile(null);
    }
  }, [editData, isOpen]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      submitData.append('bootcampBanner', bannerFile);
    }
    if (companyBannerFile) {
      submitData.append('companyBanner', companyBannerFile);
    }
    
    onSubmit(submitData);
  };

  if (!isOpen) return null;

  function renderForm(){
    return(
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
           Bootcamp Banner
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
    Keynote Speaker Picture
  </label>
  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
    <input
      type="file"
      accept="image/*"
      onChange={handleCompanyBannerFileChange}
      className="hidden"
      id="keynote-pic-upload"
    />
    <label
      htmlFor="keynote-pic-upload"
      className="cursor-pointer flex flex-col items-center"
    >
      {companyBannerPreviewUrl ? (
        <img src={companyBannerPreviewUrl} alt="Preview" className="h-32 w-48 object-cover rounded mb-2" />
      ) : (
        <Upload className="h-12 w-12 text-gray-400 mb-2" />
      )}
      <span className="text-sm text-gray-600">Click to upload keynote speaker image</span>
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
              className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              KeyNote Speaker
            </label>
            <input
              type="text"
              name="keynoteSpeaker"
              value={formData.keynoteSpeaker}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bootcamp Name
          </label>
          <input
            type="text"
            name="bootcampName"
            value={formData.bootcampName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bootcamp Description
          </label>
          <textarea
            name="bootCampDesc"
            value={formData.bootCampDesc}
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
             Viewers
            </label>
            <input
              type="number"
              name="viewers"
              value={formData.viewers}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Goal
          </label>
          <textarea
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
            rows={3}
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
          <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organizer Name
            </label>
            <input
              type="text"
              name="organizerName"
              value={formData.organizerName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Oraganization Website
            </label>
            <input
              type="text"
              name="organizerWebsite"
              value={formData.organizerWebsite}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Support Number
            </label>
            <input
              type="number"
              name="supportNumber"
              value={formData.supportNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex items-center space-x-3">
  <label htmlFor="certificateAvailable" className="text-sm font-medium text-gray-700">
    Certificate Available
  </label>
  <input
    type="checkbox"
    id="certificateAvailable"
    name="certificateAvailable"
    checked={formData.certificateAvailable}
    onChange={handleInputChange}
    className="toggle-checkbox h-5 w-10 rounded-full bg-gray-300 border-2 appearance-none cursor-pointer relative transition-colors duration-200 checked:bg-blue-600"
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
    );
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

export default BootcampModal;
