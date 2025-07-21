import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, GraduationCap } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const availableDates = [
  { date: '2025-06-15', slots: ['10:00 AM', '2:00 PM', '4:00 PM'] },
  { date: '2025-06-16', slots: ['11:00 AM', '1:00 PM', '3:00 PM'] },
  { date: '2025-06-17', slots: ['9:00 AM', '12:00 PM', '5:00 PM'] },
  { date: '2025-06-18', slots: ['10:00 AM', '3:00 PM', '4:00 PM'] },
  { date: '2025-06-19', slots: ['11:00 AM', '1:00 PM', '6:00 PM'] },
];

const counselingTopics = [
  'Career Planning',
  'Course Selection',
  'University Applications',
  'Entrance Exam Preparation',
  'Scholarship Guidance',
  'International Education',
  'Industry Trends',
];

const CounselingSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    message: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };
  
  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };
  
  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep < 3) {
      setFormStep(formStep + 1);
    } else {
      // Submit the form data
      console.log({
        ...formData,
        date: selectedDate,
        slot: selectedSlot,
        topic: selectedTopic,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        qualification: '',
        message: '',
      });
      setSelectedDate('');
      setSelectedSlot('');
      setSelectedTopic('');
      setFormStep(1);
      
      // Show success message
      alert('Your counseling session has been booked successfully!');
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section id="counseling" className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold text-white mb-2">Educational Counseling</h2>
        <p className="text-white max-w-2xl mx-auto">
          Get personalized guidance from our expert counselors to make informed decisions about your education and career path
          </p>
      <div className="mt-3 inline-block">
        <div className="h-1 w-24 bg-blue-700 rounded"></div>
        <div className="h-1 w-12 bg-blue-500 rounded mt-1"></div>
      </div>
    </div>  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          {/* Counseling Information */}
          <div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Why Choose Our Counseling Services?</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="bg-blue-600 rounded-full p-3">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Expert Counselors</h4>
                    <p className="text-blue-100">Our counselors have extensive experience in various education and career domains, ensuring you get the best advice.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="bg-blue-600 rounded-full p-3">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Flexible Scheduling</h4>
                    <p className="text-blue-100">Choose a date and time that works for you. We offer online and in-person counseling sessions.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="bg-blue-600 rounded-full p-3">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Personalized Guidance</h4>
                    <p className="text-blue-100">Get tailored advice based on your strengths, interests, and career goals to chart the best path forward.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white bg-opacity-5 rounded-lg">
                <h4 className="font-semibold flex items-center mb-2">
                  <Phone size={18} className="mr-2" />
                  Request a Call Back
                </h4>
                <p className="text-sm text-blue-100 mb-4">
                  Don't have time to schedule a session? Leave your number and we'll call you back.
                </p>
                <div className="flex">
                  <input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    className="flex-1 px-4 py-2 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Form */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-blue-700 py-4 px-6">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Calendar className="mr-2" size={20} />
                Book a Counseling Session
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {/* Step 1: Personal Details */}
              {formStep === 1 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 mb-4">Personal Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification</label>
                      <select
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Qualification</option>
                        <option value="High School">High School</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="PhD">PhD</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What would you like to discuss?</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>
              )}
              
              {/* Step 2: Select Topic and Date */}
              {formStep === 2 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Select Topic and Date</h4>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Counseling Topic*</label>
                    <div className="grid grid-cols-2 gap-2">
                      {counselingTopics.map((topic, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleTopicSelect(topic)}
                          className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedTopic === topic 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a Date*</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                      {availableDates.map((dateObj, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleDateSelect(dateObj.date)}
                          className={`px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedDate === dateObj.date 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {formatDate(dateObj.date)}
                        </button>
                      ))}
                    </div>
                    
                    {selectedDate && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select a Time Slot*</label>
                        <div className="flex flex-wrap gap-2">
                          {availableDates.find(d => d.date === selectedDate)?.slots.map((slot, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleSlotSelect(slot)}
                              className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                                selectedSlot === slot 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              <Clock size={14} className="mr-1" />
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Step 3: Confirmation */}
              {formStep === 3 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Confirm Your Booking</h4>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h5 className="font-medium text-gray-800 mb-3">Booking Summary</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Topic:</span>
                        <span className="font-medium">{selectedTopic}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{formatDate(selectedDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{selectedSlot}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    <p>By confirming this booking, you agree to our <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>.</p>
                  </div>
                </div>
              )}
              
              {/* Form Navigation */}
              <div className="mt-6 flex justify-between">
                {formStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setFormStep(formStep - 1)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                )}
                
                <button
                  type="submit"
                  className={`ml-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors ${
                    (formStep === 2 && (!selectedDate || !selectedSlot || !selectedTopic)) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={formStep === 2 && (!selectedDate || !selectedSlot || !selectedTopic)}
                >
                  {formStep < 3 ? 'Continue' : 'Confirm Booking'}
                </button>
              </div>
              
              {/* Step Indicator */}
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-2">
                  {[1, 2, 3].map((step) => (
                    <div 
                      key={step}
                      className={`w-3 h-3 rounded-full ${
                        formStep === step ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounselingSection;