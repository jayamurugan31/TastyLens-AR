import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building2, Users, MapPin, Phone, Calendar, FileText, Clock, Award, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

type SignupType = 'customer' | 'delivery_partner' | 'ngo' | 'volunteer';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  address: string;
  // NGO specific fields
  registrationNumber?: string;
  establishedYear?: string;
  operatingHours?: string;
  capacity?: number;
  ngoType?: string;
  contactPerson?: string;
  // Volunteer specific fields
  dateOfBirth?: string;
  availability?: string[];
  skills?: string[];
  experience?: string;
  interests?: string[];
}

const ngoTypes = [
  'Food Distribution',
  'Food Bank',
  'Community Kitchen',
  'Shelter Home',
  'Educational Institution',
  'Religious Institution'
];

const availabilityOptions = [
  'Weekday Mornings',
  'Weekday Afternoons',
  'Weekday Evenings',
  'Weekend Mornings',
  'Weekend Afternoons',
  'Weekend Evenings'
];

const volunteerSkills = [
  'Food Handling',
  'Cooking',
  'Driving',
  'Event Management',
  'Communication',
  'First Aid',
  'Social Media',
  'Photography'
];

const volunteerInterests = [
  'Food Distribution',
  'Community Service',
  'Teaching',
  'Event Organization',
  'Social Media Management',
  'Documentation'
];

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [signupType, setSignupType] = useState<SignupType>('customer');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    address: ''
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all required fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }

    if (signupType === 'ngo') {
      if (!formData.registrationNumber || !formData.establishedYear || !formData.operatingHours) {
        toast.error('Please fill in all NGO-specific fields');
        return false;
      }
    }

    if (signupType === 'volunteer') {
      if (!formData.dateOfBirth || !formData.availability || !formData.skills) {
        toast.error('Please fill in all volunteer-specific fields');
        return false;
      }
    }

    return true;
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // In a real app, this would make an API call to register the user
    toast.success('Registration successful! Please log in with your credentials.');
    navigate('/login');
  };

  const renderNGOFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Registration Number
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            value={formData.registrationNumber}
            onChange={(e) => updateFormData('registrationNumber', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="NGO Registration Number"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type of NGO
        </label>
        <div className="relative">
          <Building2 className="absolute left-3 top-3 text-gray-400" size={20} />
          <select
            value={formData.ngoType}
            onChange={(e) => updateFormData('ngoType', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select NGO Type</option>
            {ngoTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Established Year
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="number"
              value={formData.establishedYear}
              onChange={(e) => updateFormData('establishedYear', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="YYYY"
              min="1900"
              max={new Date().getFullYear()}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Daily Capacity
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => updateFormData('capacity', Number(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Number of people"
              min="1"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Operating Hours
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            value={formData.operatingHours}
            onChange={(e) => updateFormData('operatingHours', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="e.g., 9:00 AM - 6:00 PM"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderVolunteerFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Availability
        </label>
        <div className="grid grid-cols-2 gap-2">
          {availabilityOptions.map(option => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.availability?.includes(option)}
                onChange={(e) => {
                  const current = formData.availability || [];
                  if (e.target.checked) {
                    updateFormData('availability', [...current, option]);
                  } else {
                    updateFormData('availability', current.filter(item => item !== option));
                  }
                }}
                className="rounded border-gray-300 text-red-500 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Skills
        </label>
        <div className="grid grid-cols-2 gap-2">
          {volunteerSkills.map(skill => (
            <label key={skill} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.skills?.includes(skill)}
                onChange={(e) => {
                  const current = formData.skills || [];
                  if (e.target.checked) {
                    updateFormData('skills', [...current, skill]);
                  } else {
                    updateFormData('skills', current.filter(item => item !== skill));
                  }
                }}
                className="rounded border-gray-300 text-red-500 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Areas of Interest
        </label>
        <div className="grid grid-cols-2 gap-2">
          {volunteerInterests.map(interest => (
            <label key={interest} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.interests?.includes(interest)}
                onChange={(e) => {
                  const current = formData.interests || [];
                  if (e.target.checked) {
                    updateFormData('interests', [...current, interest]);
                  } else {
                    updateFormData('interests', current.filter(item => item !== interest));
                  }
                }}
                className="rounded border-gray-300 text-red-500 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">{interest}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Previous Volunteer Experience
        </label>
        <textarea
          value={formData.experience}
          onChange={(e) => updateFormData('experience', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          rows={3}
          placeholder="Describe your previous volunteer experience..."
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Join Tasty Lens
          </h2>
          <p className="mt-2 text-gray-600">
            Make a difference in your community
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I want to register as
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { type: 'customer', icon: User, label: 'Customer' },
                { type: 'delivery_partner', icon: Users, label: 'Delivery Partner' },
                { type: 'ngo', icon: Building2, label: 'NGO' },
                { type: 'volunteer', icon: Heart, label: 'Volunteer' }
              ].map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => setSignupType(type as SignupType)}
                  className={`p-4 rounded-lg border transition-colors ${
                    signupType === type
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-red-500 text-gray-700'
                  }`}
                >
                  <Icon className="mx-auto mb-2" size={24} />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your address"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            </div>

            {signupType === 'ngo' && renderNGOFields()}
            {signupType === 'volunteer' && renderVolunteerFields()}

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
              >
                Create Account
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  Log in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};