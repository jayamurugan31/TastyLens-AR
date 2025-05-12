import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { User, Mail, Phone, MapPin, Edit2, Save, Ruler, Weight, Calendar, Users, Download, Award, Wallet } from 'lucide-react';
import { RecentOrders } from '../components/RecentOrders';
import { OrderTracking } from '../components/OrderTracking';
import { RewardsWallet } from '../components/RewardsWallet';
import toast from 'react-hot-toast';
import { HealthInfo, Order } from '../types';
import { generateDonationCertificate } from '../utils/certificateGenerator';

// Demo active order data
const demoActiveOrder: Order = {
  id: 'ORD123458',
  userId: 'USR001',
  restaurantId: 1,
  items: [
    { id: 1, name: 'Chicken Biryani', price: 250, quantity: 2 },
    { id: 2, name: 'Butter Naan', price: 40, quantity: 3 }
  ],
  status: 'out_for_delivery',
  totalAmount: 620,
  createdAt: new Date(),
  deliveryAddress: {
    fullAddress: '123 Main St, Chennai',
    contactName: 'John Doe',
    contactPhone: '+91 9876543210'
  },
  deliveryPartner: {
    name: 'Karthik Raja',
    phone: '+91 9876543214',
    vehicleType: 'bike',
    vehicleNumber: 'TN01EF9012',
    currentLocation: {
      latitude: 13.0827,
      longitude: 80.2707,
      address: 'Near Apollo Hospital, Anna Nagar'
    },
    rating: 4.9,
    totalDeliveries: 1500,
    photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=60'
  },
  estimatedDeliveryTime: '15-20 mins'
};

// Demo donation certificates data
const demoDonationCertificates = [
  {
    id: 'CERT001',
    ngoName: 'Feeding Hope Foundation',
    donationDate: new Date('2024-03-15'),
    foodItems: ['Rice', 'Vegetables', 'Bread'],
    totalWeight: 25,
    certificateNumber: 'FHF/2024/001'
  },
  {
    id: 'CERT002',
    ngoName: 'Food For All',
    donationDate: new Date('2024-03-10'),
    foodItems: ['Chapati', 'Dal', 'Fruits'],
    totalWeight: 15,
    certificateNumber: 'FFA/2024/023'
  }
];

export const Profile: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.username || '',
    email: 'user@example.com',
    phone: '+91 9876543210',
    address: 'T. Nagar, Chennai',
    healthInfo: user?.healthInfo || {
      height: 170,
      weight: 65,
      age: 25,
      gender: 'male'
    } as HealthInfo
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const calculateBMI = (height: number, weight: number): number => {
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
  };

  const getBMICategory = (bmi: number): { category: string; color: string } => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const bmi = calculateBMI(profile.healthInfo.height, profile.healthInfo.weight);
  const bmiCategory = getBMICategory(bmi);

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDownloadCertificate = (certificate: typeof demoDonationCertificates[0]) => {
    try {
      const doc = generateDonationCertificate(
        profile.name,
        certificate.certificateNumber,
        certificate.donationDate,
        certificate.foodItems,
        certificate.totalWeight,
        certificate.ngoName
      );
      
      doc.save(`donation-certificate-${certificate.certificateNumber}.pdf`);
      toast.success('Certificate downloaded successfully!');
    } catch (error) {
      console.error('Error generating certificate:', error);
      toast.error('Failed to generate certificate. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Active Order Tracking */}
        {demoActiveOrder && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <OrderTracking order={demoActiveOrder} />
          </div>
        )}

        {/* Sustainability Rewards Section */}
        <RewardsWallet />

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Profile</h2>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              {isEditing ? (
                <>
                  <Save size={20} />
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <Edit2 size={20} />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <User className="text-gray-400" size={24} />
              <div className="flex-1">
                <label className="block text-sm text-gray-600">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full mt-1 p-2 border rounded"
                  />
                ) : (
                  <p className="text-gray-900">{profile.name}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Mail className="text-gray-400" size={24} />
              <div className="flex-1">
                <label className="block text-sm text-gray-600">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full mt-1 p-2 border rounded"
                  />
                ) : (
                  <p className="text-gray-900">{profile.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Phone className="text-gray-400" size={24} />
              <div className="flex-1">
                <label className="block text-sm text-gray-600">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full mt-1 p-2 border rounded"
                  />
                ) : (
                  <p className="text-gray-900">{profile.phone}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <MapPin className="text-gray-400" size={24} />
              <div className="flex-1">
                <label className="block text-sm text-gray-600">Default Delivery Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="w-full mt-1 p-2 border rounded"
                  />
                ) : (
                  <p className="text-gray-900">{profile.address}</p>
                )}
              </div>
            </div>

            {/* Health Information Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Health Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Ruler className="text-gray-400" size={24} />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600">Height (cm)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={profile.healthInfo.height}
                        onChange={(e) => setProfile({
                          ...profile,
                          healthInfo: {
                            ...profile.healthInfo,
                            height: Number(e.target.value)
                          }
                        })}
                        className="w-full mt-1 p-2 border rounded"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.healthInfo.height} cm</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Weight className="text-gray-400" size={24} />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600">Weight (kg)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={profile.healthInfo.weight}
                        onChange={(e) => setProfile({
                          ...profile,
                          healthInfo: {
                            ...profile.healthInfo,
                            weight: Number(e.target.value)
                          }
                        })}
                        className="w-full mt-1 p-2 border rounded"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.healthInfo.weight} kg</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="text-gray-400" size={24} />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600">Age</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={profile.healthInfo.age}
                        onChange={(e) => setProfile({
                          ...profile,
                          healthInfo: {
                            ...profile.healthInfo,
                            age: Number(e.target.value)
                          }
                        })}
                        className="w-full mt-1 p-2 border rounded"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.healthInfo.age} years</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Users className="text-gray-400" size={24} />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600">Gender</label>
                    {isEditing ? (
                      <select
                        value={profile.healthInfo.gender}
                        onChange={(e) => setProfile({
                          ...profile,
                          healthInfo: {
                            ...profile.healthInfo,
                            gender: e.target.value as 'male' | 'female' | 'other'
                          }
                        })}
                        className="w-full mt-1 p-2 border rounded"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 capitalize">{profile.healthInfo.gender}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* BMI Information */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Body Mass Index (BMI)</h4>
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-2xl font-bold">{bmi}</p>
                    <p className={`text-sm font-medium ${bmiCategory.color}`}>
                      {bmiCategory.category}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full"
                        style={{ width: `${Math.min(bmi * 2, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Underweight</span>
                      <span>Normal</span>
                      <span>Overweight</span>
                      <span>Obese</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <button
              onClick={handleLogout}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Donation Certificates Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Award className="text-red-500 mr-2" size={24} />
            Food Donation Certificates
          </h2>
          
          <div className="space-y-4">
            {demoDonationCertificates.map((certificate) => (
              <div
                key={certificate.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-red-500 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{certificate.ngoName}</h3>
                    <p className="text-gray-600 text-sm">
                      Certificate #{certificate.certificateNumber}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {certificate.donationDate.toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 mt-2">
                      Items: {certificate.foodItems.join(', ')}
                    </p>
                    <p className="text-gray-600">
                      Total Weight: {certificate.totalWeight} kg
                    </p>
                  </div>
                  <button
                    onClick={() => handleDownloadCertificate(certificate)}
                    className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    <Download size={20} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}

            {demoDonationCertificates.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Award className="mx-auto mb-2" size={48} />
                <p>No donation certificates yet. Start donating to make a difference!</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <RecentOrders userId={user.username} />
        </div>
      </div>
    </div>
  );
};