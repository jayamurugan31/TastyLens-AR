import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Upload, X, Heart, MapPin, Clock, Calendar, Search, Filter, ChevronDown, CheckCircle, XCircle, AlertCircle, Droplet, Scale, ThermometerSun, Package, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface DonationSlot {
  id: string;
  time: string;
  capacity: number;
  available: boolean;
}

interface NGO {
  id: string;
  name: string;
  address: string;
  type: string;
  capacity: number;
  image: string;
  rating: number;
  distance: string;
  slots: DonationSlot[];
}

interface FoodItem {
  name: string;
  weight: number;
  unit: 'kg' | 'g';
  type: string;
  temperature: number;
  packagingType: string;
  preparationTime: string;
  expiryTime: string;
  image: string;
  description: string;
}

const demoNGOs: NGO[] = [
  {
    id: '1',
    name: 'Feeding Hope Foundation',
    address: 'Anna Nagar, Chennai',
    type: 'Food Distribution',
    capacity: 500,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=60',
    rating: 4.8,
    distance: '2.3 km',
    slots: [
      { id: '1-1', time: '09:00 AM - 11:00 AM', capacity: 100, available: true },
      { id: '1-2', time: '02:00 PM - 04:00 PM', capacity: 150, available: true },
      { id: '1-3', time: '06:00 PM - 08:00 PM', capacity: 200, available: true }
    ]
  },
  {
    id: '2',
    name: 'Food For All',
    address: 'T. Nagar, Chennai',
    type: 'Food Bank',
    capacity: 300,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop&q=60',
    rating: 4.6,
    distance: '1.5 km',
    slots: [
      { id: '2-1', time: '10:00 AM - 12:00 PM', capacity: 80, available: true },
      { id: '2-2', time: '03:00 PM - 05:00 PM', capacity: 120, available: true }
    ]
  },
  {
    id: '3',
    name: 'Share & Care',
    address: 'Adyar, Chennai',
    type: 'Community Kitchen',
    capacity: 250,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=60',
    rating: 4.7,
    distance: '4.1 km',
    slots: [
      { id: '3-1', time: '11:00 AM - 01:00 PM', capacity: 100, available: true },
      { id: '3-2', time: '04:00 PM - 06:00 PM', capacity: 150, available: true }
    ]
  }
];

const foodTypes = [
  'Cooked Rice',
  'Cooked Vegetables',
  'Chapati/Roti',
  'Boiled Eggs',
  'Boiled Chicken',
  'Pet Food',
  'Other'
];

const packagingTypes = [
  'Aluminum Container',
  'Plastic Container',
  'Paper Box',
  'Disposable Plates',
  'Other'
];

export const Donators: React.FC = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'guidelines' | 'donation'>('guidelines');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<DonationSlot | null>(null);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [currentFoodItem, setCurrentFoodItem] = useState<FoodItem>({
    name: '',
    weight: 0,
    unit: 'kg',
    type: foodTypes[0],
    temperature: 25,
    packagingType: packagingTypes[0],
    preparationTime: '',
    expiryTime: '',
    image: '',
    description: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrentFoodItem({
        ...currentFoodItem,
        image: imageUrl
      });
    }
  };

  const handleAddFoodItem = () => {
    if (!currentFoodItem.name || currentFoodItem.weight <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }
    setFoodItems([...foodItems, currentFoodItem]);
    setCurrentFoodItem({
      name: '',
      weight: 0,
      unit: 'kg',
      type: foodTypes[0],
      temperature: 25,
      packagingType: packagingTypes[0],
      preparationTime: '',
      expiryTime: '',
      image: '',
      description: ''
    });
  };

  const handleRemoveFoodItem = (index: number) => {
    setFoodItems(foodItems.filter((_, i) => i !== index));
  };

  const handleDonation = () => {
    if (!isLoggedIn) {
      toast.error('Please login to schedule a donation');
      navigate('/login');
      return;
    }

    if (!selectedNGO || !selectedSlot) {
      toast.error('Please select an NGO and time slot');
      return;
    }

    if (foodItems.length === 0) {
      setShowDonationForm(true);
      return;
    }

    const totalWeight = foodItems.reduce((sum, item) => {
      return sum + (item.unit === 'kg' ? item.weight : item.weight / 1000);
    }, 0);

    toast.success(`Donation of ${totalWeight}kg food scheduled successfully!`);
    setSelectedNGO(null);
    setSelectedSlot(null);
    setShowDonationForm(false);
    setFoodItems([]);
  };

  const renderGuidelines = () => (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-8 mb-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Make a Difference Today</h1>
          <p className="text-lg mb-6">
            Join our mission to reduce food waste and help those in need. Your donation can make a real impact in someone's life.
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Heart className="text-white" size={24} />
              <span className="text-xl font-semibold">10,000+</span>
              <span>Meals Donated</span>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-white" size={24} />
              <span className="text-xl font-semibold">25+</span>
              <span>NGO Partners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Guidelines Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Food Donation Guidelines</h2>
        <div className="space-y-6">
          {/* Safe Foods Section */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
              <CheckCircle className="mr-2" size={20} />
              Safe Foods for Donation
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-green-700">
                <CheckCircle className="mr-2" size={16} />
                Cooked Rice & Vegetables – Plain rice, boiled potatoes, carrots, and pumpkin
              </li>
              <li className="flex items-center text-green-700">
                <CheckCircle className="mr-2" size={16} />
                Boiled Chicken/Eggs – Without salt or spices
              </li>
              <li className="flex items-center text-green-700">
                <CheckCircle className="mr-2" size={16} />
                Chapati (Without Salt/Oil) – In moderation
              </li>
              <li className="flex items-center text-green-700">
                <CheckCircle className="mr-2" size={16} />
                Plain Curd/Milk – In small amounts
              </li>
              <li className="flex items-center text-green-700">
                <CheckCircle className="mr-2" size={16} />
                Pet Food/Kibble – Store-bought dog food
              </li>
            </ul>
          </div>

          {/* Foods to Avoid Section */}
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
              <XCircle className="mr-2" size={20} />
              Foods to Avoid
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-red-700">
                <XCircle className="mr-2" size={16} />
                Spicy, Oily, or Salty Food
              </li>
              <li className="flex items-center text-red-700">
                <XCircle className="mr-2" size={16} />
                Chocolate, Caffeine, or Sweets
              </li>
              <li className="flex items-center text-red-700">
                <XCircle className="mr-2" size={16} />
                Onions & Garlic
              </li>
              <li className="flex items-center text-red-700">
                <XCircle className="mr-2" size={16} />
                Bones from Cooked Meat
              </li>
              <li className="flex items-center text-red-700">
                <XCircle className="mr-2" size={16} />
                Dairy in Large Quantities
              </li>
            </ul>
          </div>

          {/* General Guidelines Section */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
              <AlertCircle className="mr-2" size={20} />
              General Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-center text-blue-700">
                  <MapPin className="mr-2" size={16} />
                  Choose a safe feeding spot away from traffic
                </li>
                <li className="flex items-center text-blue-700">
                  <CheckCircle className="mr-2" size={16} />
                  Use clean bowls or disposable plates
                </li>
                <li className="flex items-center text-blue-700">
                  <Droplet className="mr-2" size={16} />
                  Always provide fresh water
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center text-blue-700">
                  <AlertCircle className="mr-2" size={16} />
                  Monitor animal behavior during feeding
                </li>
                <li className="flex items-center text-blue-700">
                  <CheckCircle className="mr-2" size={16} />
                  Feed in small portions
                </li>
                <li className="flex items-center text-blue-700">
                  <CheckCircle className="mr-2" size={16} />
                  Maintain proper hygiene
                </li>
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={() => setCurrentStep('donation')}
          className="mt-8 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 flex items-center justify-center space-x-2"
        >
          <span>Continue to Donation</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderDonationSection = () => (
    <div className="max-w-7xl mx-auto">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search NGOs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
            >
              <option value="all">All Types</option>
              <option value="Food Distribution">Food Distribution</option>
              <option value="Food Bank">Food Bank</option>
              <option value="Community Kitchen">Community Kitchen</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400" size={20} />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* NGO List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoNGOs
          .filter((ngo) => {
            const matchesSearch = ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              ngo.address.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = selectedType === 'all' || ngo.type === selectedType;
            return matchesSearch && matchesType;
          })
          .map((ngo) => (
            <div
              key={ngo.id}
              className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all ${
                selectedNGO?.id === ngo.id ? 'ring-2 ring-red-500' : ''
              }`}
            >
              <img
                src={ngo.image}
                alt={ngo.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{ngo.name}</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    {ngo.rating} ★
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{ngo.type}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MapPin size={16} className="mr-1" />
                  <span>{ngo.address}</span>
                  <span className="mx-2">•</span>
                  <span>{ngo.distance}</span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium text-gray-700">Available Slots:</p>
                  {ngo.slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => {
                        setSelectedNGO(ngo);
                        setSelectedSlot(slot);
                        setShowDonationForm(true);
                      }}
                      className={`w-full p-2 text-sm rounded-lg border transition-colors ${
                        selectedNGO?.id === ngo.id && selectedSlot?.id === slot.id
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-red-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-2" />
                          {slot.time}
                        </div>
                        <span className="text-xs">
                          Capacity: {slot.capacity}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedNGO(ngo);
                    setShowDonationForm(true);
                  }}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Schedule Donation
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Food Donation Form Modal */}
      {showDonationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Food Donation Details</h3>
              <button
                onClick={() => setShowDonationForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Food Items List */}
              {foodItems.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Added Food Items:</h4>
                  <div className="space-y-4">
                    {foodItems.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium">{item.name}</h5>
                              <button
                                onClick={() => handleRemoveFoodItem(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X size={20} />
                              </button>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {item.weight} {item.unit} • {item.type} • {item.packagingType}
                            </p>
                            {item.description && (
                              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                            )}
                          </div>
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-lg ml-4"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Food Item Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Food Name
                  </label>
                  <input
                    type="text"
                    value={currentFoodItem.name}
                    onChange={(e) => setCurrentFoodItem({
                      ...currentFoodItem,
                      name: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter food name"
                  />
                </div>

                {/* Image Upload Section */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Food Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      {currentFoodItem.image ? (
                        <div className="relative">
                          <img
                            src={currentFoodItem.image}
                            alt="Food preview"
                            className="mx-auto h-32 w-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => setCurrentFoodItem({ ...currentFoodItem, image: '' })}
                            className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Camera className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-500 hover:text-red-600">
                              <span>Upload a photo</span>
                              <input
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageUpload}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description Field */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Food Description
                  </label>
                  <textarea
                    value={currentFoodItem.description}
                    onChange={(e) => setCurrentFoodItem({
                      ...currentFoodItem,
                      description: e.target.value
                    })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Describe the food items, including any special preparation notes or ingredients"
                  />
                </div>

                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight
                    </label>
                    <input
                      type="number"
                      value={currentFoodItem.weight}
                      onChange={(e) => setCurrentFoodItem({
                        ...currentFoodItem,
                        weight: parseFloat(e.target.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter weight"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <select
                      value={currentFoodItem.unit}
                      onChange={(e) => setCurrentFoodItem({
                        ...currentFoodItem,
                        unit: e.target.value as 'kg' | 'g'
                      })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Food Type
                  </label>
                  <select
                    value={currentFoodItem.type}
                    onChange={(e) => setCurrentFoodItem({
                      ...currentFoodItem,
                      type: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {foodTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={currentFoodItem.temperature}
                    onChange={(e) => setCurrentFoodItem({
                      ...currentFoodItem,
                      temperature: parseInt(e.target.value)
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter temperature"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Packaging Type
                  </label>
                  <select
                    value={currentFoodItem.packagingType}
                    onChange={(e) => setCurrentFoodItem({
                      ...currentFoodItem,
                      packagingType: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {packagingTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preparation Time
                  </label>
                  <input
                    type="time"
                    value={currentFoodItem.preparationTime}
                    onChange={(e) => setCurrentFoodItem({
                      ...currentFoodItem,
                      preparationTime: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Best Before Time
                  </label>
                  <input
                    type="time"
                    value={currentFoodItem.expiryTime}
                    onChange={(e) => setCurrentFoodItem({
                      ...currentFoodItem,
                      expiryTime: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleAddFoodItem}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Add Food Item
                </button>
                <button
                  onClick={handleDonation}
                  disabled={foodItems.length === 0}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Complete Donation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="px-4 py-8">
      {currentStep ===  'guidelines' ? renderGuidelines() : renderDonationSection()}
    </div>
  );
};