import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import {
  BarChart3,
  Users,
  ShoppingBag,
  Store,
  TrendingUp,
  Truck,
  Search,
  Edit2,
  Trash2,
  Plus,
  MapPin,
  Navigation,
  Clock
} from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import toast from 'react-hot-toast';

// Demo data - In a real app, this would come from the backend
const demoStats = {
  totalOrders: 1248,
  totalRevenue: 156000,
  activeDeliveries: 8,
  totalUsers: 450
};

const demoOrders = [
  {
    id: 'ORD123456',
    userId: 'USR001',
    restaurantId: 1,
    status: 'preparing',
    totalAmount: 850,
    createdAt: new Date(),
    items: [
      { id: 1, name: 'Chicken Biryani', price: 250, quantity: 2 }
    ]
  },
  {
    id: 'ORD123457',
    userId: 'USR002',
    restaurantId: 2,
    status: 'out_for_delivery',
    totalAmount: 450,
    createdAt: new Date(),
    items: [
      { id: 4, name: 'Chicken 65', price: 220, quantity: 1 }
    ]
  }
];

// Demo delivery partners data with more realistic Chennai coordinates
const demoDeliveryPartners = [
  {
    id: 'DP001',
    name: 'Jayamurugan',
    status: 'active',
    currentLocation: { lat: 13.0827, lng: 80.2707 }, // Anna Nagar
    currentOrder: 'ORD123457',
    vehicle: 'bike',
    lastUpdated: new Date(),
    currentAddress: 'Anna Nagar, Chennai',
    heading: 45,
    speed: '25 km/h'
  },
  {
    id: 'DP002',
    name: 'Ramesh Kumar',
    status: 'active',
    currentLocation: { lat: 13.0569, lng: 80.2425 }, // T Nagar
    currentOrder: 'ORD123458',
    vehicle: 'scooter',
    lastUpdated: new Date(),
    currentAddress: 'T. Nagar, Chennai',
    heading: 90,
    speed: '20 km/h'
  },
  {
    id: 'DP003',
    name: 'Karthik Raja',
    status: 'inactive',
    currentLocation: { lat: 13.0878, lng: 80.2785 }, // Egmore
    currentOrder: null,
    vehicle: 'bike',
    lastUpdated: new Date(),
    currentAddress: 'Egmore, Chennai',
    heading: 180,
    speed: '0 km/h'
  }
];

const GOOGLE_MAPS_API_KEY = 'AIzaSyAl7FqK8frobtdcRUKpiVY34SQGTG9pFII';

export const Admin: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'restaurants' | 'orders' | 'users' | 'tracking'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 13.0827, lng: 80.2707 }); // Default to Chennai center

  if (!user || user.userType !== 'admin') {
    navigate('/login');
    return null;
  }

  const handleDeleteRestaurant = (id: number) => {
    toast.success('Restaurant deleted successfully');
  };

  const handleEditRestaurant = (id: number) => {
    toast.success('Edit restaurant functionality will be implemented soon');
  };

  const handlePartnerSelect = (partnerId: string) => {
    setSelectedPartner(partnerId);
    const partner = demoDeliveryPartners.find(p => p.id === partnerId);
    if (partner) {
      setMapCenter(partner.currentLocation);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold">{demoStats.totalOrders}</h3>
            </div>
            <ShoppingBag className="text-red-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">₹{demoStats.totalRevenue}</h3>
            </div>
            <TrendingUp className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Active Deliveries</p>
              <h3 className="text-2xl font-bold">{demoStats.activeDeliveries}</h3>
            </div>
            <Truck className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">{demoStats.totalUsers}</h3>
            </div>
            <Users className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {demoOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">₹{order.totalAmount}</td>
                  <td className="py-3 px-4">{order.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRestaurants = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Restaurant</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {restaurant.rating} ★
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{restaurant.cuisine}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">{restaurant.location}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditRestaurant(restaurant.id)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteRestaurant(restaurant.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTracking = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Live Delivery Partner Tracking</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Partner List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search delivery partners..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div className="space-y-2">
              {demoDeliveryPartners.map((partner) => (
                <div
                  key={partner.id}
                  onClick={() => handlePartnerSelect(partner.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedPartner === partner.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{partner.name}</h4>
                      <p className="text-sm text-gray-500">{partner.vehicle}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      partner.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {partner.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map and Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Live Map */}
            <div className="h-[500px] rounded-lg overflow-hidden">
              <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                <Map
                  zoom={13}
                  center={mapCenter}
                  gestureHandling="greedy"
                  mapId="tasty-lens-map"
                >
                  {demoDeliveryPartners.map((partner) => (
                    <Marker
                      key={partner.id}
                      position={partner.currentLocation}
                      title={partner.name}
                      onClick={() => handlePartnerSelect(partner.id)}
                    />
                  ))}
                </Map>
              </APIProvider>
            </div>

            {/* Selected Partner Details */}
            {selectedPartner && (
              <div className="bg-gray-50 rounded-lg p-4">
                {(() => {
                  const partner = demoDeliveryPartners.find(p => p.id === selectedPartner);
                  if (!partner) return null;

                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{partner.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          partner.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {partner.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Current Location</p>
                          <div className="flex items-center space-x-1">
                            <MapPin size={16} className="text-red-500" />
                            <span>{partner.currentAddress}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Current Order</p>
                          <span>{partner.currentOrder || 'No active order'}</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Speed</p>
                          <span>{partner.speed}</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Heading</p>
                          <div className="flex items-center space-x-1">
                            <Navigation
                              size={16}
                              className="text-blue-500"
                              style={{ transform: `rotate(${partner.heading}deg)` }}
                            />
                            <span>{partner.heading}°</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <span>{partner.lastUpdated.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white min-h-screen shadow-sm">
          <div className="p-6">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <nav className="mt-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-3 w-full px-6 py-3 ${
                activeTab === 'dashboard' ? 'bg-red-50 text-red-500' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`flex items-center space-x-3 w-full px-6 py-3 ${
                activeTab === 'restaurants' ? 'bg-red-50 text-red-500' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Store size={20} />
              <span>Restaurants</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center space-x-3 w-full px-6 py-3 ${
                activeTab === 'orders' ? 'bg-red-50 text-red-500' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ShoppingBag size={20} />
              <span>Orders</span>
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`flex items-center space-x-3 w-full px-6 py-3 ${
                activeTab === 'tracking' ? 'bg-red-50 text-red-500' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Navigation size={20} />
              <span>Tracking</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center space-x-3 w-full px-6 py-3 ${
                activeTab === 'users' ? 'bg-red-50 text-red-500' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users size={20} />
              <span>Users</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'restaurants' && renderRestaurants()}
          {activeTab === 'tracking' && renderTracking()}
          {activeTab === 'orders' && (
            <div className="text-center text-gray-500 mt-8">
              Orders management coming soon
            </div>
          )}
          {activeTab === 'users' && (
            <div className="text-center text-gray-500 mt-8">
              User management coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
};