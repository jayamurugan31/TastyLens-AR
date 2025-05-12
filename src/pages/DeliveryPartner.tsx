import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useReturnStore } from '../store/useReturnStore';
import { useNGOStore } from '../store/useNGOStore';
import { NGOSelectionModal } from '../components/NGOSelectionModal';
import { User, DeliveryStatus } from '../types';
import { Check, X, MapPin, Navigation, Package, Timer, CheckCircle, RotateCcw, Heart, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

// Random barcode images from Unsplash
const barcodeImages = [
  'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=123456789012',
  'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=987654321098',
  'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=567890123456'
];

export const DeliveryPartner: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'online' | 'offline'>('offline');
  const [otpInput, setOtpInput] = useState('');
  const [returnOtpInput, setReturnOtpInput] = useState('');
  const [donationOtpInput, setDonationOtpInput] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [deliveryProgress, setDeliveryProgress] = useState<DeliveryStatus['status']>('picked_up');
  const { verifyReturnOTP, updateReturnStatus, generateDiscountToken } = useReturnStore();
  const [showNGOModal, setShowNGOModal] = useState(false);
  const { selectedNGO, setSelectedNGO } = useNGOStore();
  const [discountToken, setDiscountToken] = useState<string | null>(null);

  // Demo data - In a real app, this would come from the backend
  const currentDelivery = {
    orderId: "ORD123456",
    pickupAddress: {
      fullAddress: "Hotel Crescent, 5th Avenue, Nungambakkam",
      landmark: "Near Apollo Hospital",
      contactName: "Restaurant Manager",
      contactPhone: "+91 9876543210"
    },
    dropAddress: {
      fullAddress: "123, Anna Nagar East",
      landmark: "Near East Park Signal",
      contactName: "John Doe",
      contactPhone: "+91 9876543211"
    },
    estimatedTime: "25 mins",
    hasReturnRequest: true
  };

  if (!user || user.userType !== 'delivery_partner') {
    navigate('/login');
    return null;
  }

  const handleStatusChange = (newStatus: 'online' | 'offline') => {
    setStatus(newStatus);
    toast.success(`You are now ${newStatus}`);
  };

  const verifyOTP = () => {
    const currentOTP = localStorage.getItem('currentOrderOTP');
    
    if (otpInput === currentOTP) {
      setVerificationStatus('success');
      toast.success('Order verified successfully!');
      localStorage.removeItem('currentOrderOTP');
    } else {
      setVerificationStatus('failed');
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const handleReturnOTPVerification = () => {
    if (verifyReturnOTP(currentDelivery.orderId, returnOtpInput)) {
      updateReturnStatus(currentDelivery.orderId, 'completed');
      setDeliveryProgress('return_completed');
      setShowNGOModal(true);
      toast.success('Return verified successfully! Select an NGO for donation.');
    } else {
      toast.error('Invalid return OTP. Please try again.');
    }
  };

  const handleNGOSelection = (ngo: User) => {
    setSelectedNGO(ngo);
    setShowNGOModal(false);
    const donationOTP = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('donationOTP', donationOTP);
    toast.success(`NGO selected! Donation OTP: ${donationOTP}`);
    setDeliveryProgress('ngo_donation_initiated');
  };

  const handleDonationOTPVerification = () => {
    const storedOTP = localStorage.getItem('donationOTP');
    if (donationOtpInput === storedOTP) {
      setDeliveryProgress('ngo_donation_completed');
      localStorage.removeItem('donationOTP');
      
      // Generate discount token after successful donation
      const token = generateDiscountToken(currentDelivery.orderId);
      setDiscountToken(token);
      
      toast.success('Food successfully donated to NGO!');
      toast.success('Discount token generated for the customer!', {
        duration: 5000,
        icon: '🎁'
      });
    } else {
      toast.error('Invalid donation OTP. Please try again.');
    }
  };

  const updateDeliveryStatus = (newStatus: DeliveryStatus['status']) => {
    setDeliveryProgress(newStatus);
    toast.success(`Delivery status updated to: ${newStatus.replace(/_/g, ' ')}`);
  };

  const getProgressPercentage = () => {
    const statuses: DeliveryStatus['status'][] = ['picked_up', 'on_the_way', 'near_location', 'delivered'];
    return ((statuses.indexOf(deliveryProgress) + 1) / statuses.length) * 100;
  };

  const getRandomBarcodeImage = () => {
    return barcodeImages[Math.floor(Math.random() * barcodeImages.length)];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Delivery Partner Dashboard</h2>
          <div className="flex items-center space-x-4">
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg"
              value={status}
              onChange={(e) => handleStatusChange(e.target.value as 'online' | 'offline')}
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Current Delivery</h3>
            <p>Vehicle Type: {user.vehicleType}</p>
            <p>License Number: {user.licenseNumber}</p>
            <p className="mt-4">Status: <span className={`font-semibold ${status === 'online' ? 'text-green-600' : 'text-red-600'}`}>{status}</span></p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Order Verification</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Order OTP
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    maxLength={6}
                  />
                  <button
                    onClick={verifyOTP}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Verify
                  </button>
                </div>
                {/* Barcode image for Order OTP */}
                <div className="mt-4">
                  <img
                    src={getRandomBarcodeImage()}
                    alt="Order OTP Barcode"
                    className="w-full h-16 object-cover rounded-lg"
                  />
                </div>
              </div>

              {verificationStatus !== 'pending' && (
                <div className={`flex items-center space-x-2 ${
                  verificationStatus === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {verificationStatus === 'success' ? (
                    <>
                      <Check size={20} />
                      <span>Order verified successfully!</span>
                    </>
                  ) : (
                    <>
                      <X size={20} />
                      <span>Invalid OTP. Please try again.</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Return Order Verification Section */}
          {currentDelivery.hasReturnRequest && (
            <div className="bg-gray-50 p-6 rounded-lg col-span-2">
              <h3 className="text-lg font-semibold mb-4">Return Order Verification</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-orange-500 mb-4">
                  <RotateCcw size={20} />
                  <span>Return request initiated by customer</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Return OTP
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={returnOtpInput}
                      onChange={(e) => setReturnOtpInput(e.target.value)}
                      placeholder="Enter return OTP"
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      maxLength={6}
                    />
                    <button
                      onClick={handleReturnOTPVerification}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                    >
                      Verify Return
                    </button>
                  </div>
                  {/* Barcode image for Return OTP */}
                  <div className="mt-4">
                    <img
                      src={getRandomBarcodeImage()}
                      alt="Return OTP Barcode"
                      className="w-full h-16 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NGO Donation Section */}
          {selectedNGO && deliveryProgress === 'ngo_donation_initiated' && (
            <div className="bg-gray-50 p-6 rounded-lg col-span-2">
              <h3 className="text-lg font-semibold mb-4">NGO Donation Verification</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-green-500 mb-4">
                  <Heart size={20} />
                  <span>Donating to: {selectedNGO.ngoDetails?.name}</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Donation OTP
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={donationOtpInput}
                      onChange={(e) => setDonationOtpInput(e.target.value)}
                      placeholder="Enter donation OTP"
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      maxLength={6}
                    />
                    <button
                      onClick={handleDonationOTPVerification}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      Verify Donation
                    </button>
                  </div>
                  {/* Barcode image for Donation OTP */}
                  <div className="mt-4">
                    <img
                      src={getRandomBarcodeImage()}
                      alt="Donation OTP Barcode"
                      className="w-full h-16 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Discount Token Section */}
          {discountToken && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6 col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Gift className="text-green-500" size={24} />
                <h3 className="text-lg font-semibold text-green-700">Discount Token Generated</h3>
              </div>
              <p className="text-green-600 mb-2">
                The customer will receive the following discount token for their next order:
              </p>
              <div className="bg-white border-2 border-green-500 rounded-lg p-4 flex items-center justify-between">
                <code className="text-lg font-mono font-bold text-green-600">{discountToken}</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(discountToken);
                    toast.success('Token copied to clipboard!');
                  }}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Copy
                </button>
              </div>
              <p className="mt-2 text-sm text-green-600">
                This token can be used for a 20% discount on the next order.
              </p>
              {/* Barcode image for Discount Token */}
              <div className="mt-4">
                <img
                  src={getRandomBarcodeImage()}
                  alt="Discount Token Barcode"
                  className="w-full h-16 object-cover rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Delivery Progress Section */}
          <div className="bg-gray-50 p-6 rounded-lg col-span-2">
            <h3 className="text-lg font-semibold mb-4">Delivery Progress</h3>
            <div className="mb-6">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-red-600">
                      {getProgressPercentage()}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                  <div
                    style={{ width: `${getProgressPercentage()}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 transition-all duration-500"
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {[
                  { status: 'picked_up', icon: Package, label: 'Picked Up' },
                  { status: 'on_the_way', icon: Navigation, label: 'On the Way' },
                  { status: 'near_location', icon: MapPin, label: 'Near Location' },
                  { status: 'delivered', icon: CheckCircle, label: 'Delivered' }
                ].map(({ status, icon: Icon, label }) => (
                  <button
                    key={status}
                    onClick={() => updateDeliveryStatus(status as DeliveryStatus['status'])}
                    className={`p-4 rounded-lg border ${
                      deliveryProgress === status
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-500'
                    } transition-colors`}
                  >
                    <Icon
                      size={24}
                      className={deliveryProgress === status ? 'text-red-500' : 'text-gray-400'}
                    />
                    <span className="block mt-2 text-sm font-medium">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Address Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="text-red-500" size={20} />
                  <h4 className="font-semibold">Pickup Address</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700">{currentDelivery.pickupAddress.fullAddress}</p>
                  <p className="text-gray-600 text-sm">Landmark: {currentDelivery.pickupAddress.landmark}</p>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm">Contact: {currentDelivery.pickupAddress.contactName}</p>
                    <p className="text-sm text-red-500">{currentDelivery.pickupAddress.contactPhone}</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="text-green-500" size={20} />
                  <h4 className="font-semibold">Delivery Address</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700">{currentDelivery.dropAddress.fullAddress}</p>
                  <p className="text-gray-600 text-sm">Landmark: {currentDelivery.dropAddress.landmark}</p>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm">Contact: {currentDelivery.dropAddress.contactName}</p>
                    <p className="text-sm text-green-500">{currentDelivery.dropAddress.contactPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Timer className="text-gray-500" size={20} />
                <span className="text-sm font-medium">Estimated Delivery Time:</span>
              </div>
              <span className="text-red-500 font-semibold">{currentDelivery.estimatedTime}</span>
            </div>
          </div>
        </div>
      </div>

      {showNGOModal && (
        <NGOSelectionModal
          onClose={() => setShowNGOModal(false)}
          onSelect={handleNGOSelection}
        />
      )}
    </div>
  );
};