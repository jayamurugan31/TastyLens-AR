import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { ReturnOrderModal } from '../components/ReturnOrderModal';
import { SustainabilityBadge } from '../components/SustainabilityBadge';
import { restaurants } from '../data/restaurants';
import { useAuthStore } from '../store/useAuthStore';
import { QrCode, Leaf } from 'lucide-react';
import toast from 'react-hot-toast';

export const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const restaurant = restaurants.find((r) => r.id === Number(id));
  const { addItem } = useCartStore();
  const { user } = useAuthStore();
  const [showReturnModal, setShowReturnModal] = useState(false);

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-bold mb-4">Restaurant not found</h2>
        <button
          onClick={() => navigate('/restaurants')}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  const handleAddToCart = (item: typeof restaurant.menu[0]) => {
    addItem(item);
    toast.success(`${item.name} added to cart!`);
  };

  const handleReturnRequest = () => {
    if (!user) {
      toast.error('Please login to initiate a return');
      navigate('/login');
      return;
    }
    setShowReturnModal(true);
  };

  const handleARQRMenu = () => {
    window.open('https://drive.google.com/file/d/1c9yAMm8VZYDXv69UfjO3wHXTX8qcageE/view?usp=drive_link', '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                {restaurant.rating} ★
              </span>
              <SustainabilityBadge score={75} isVerified={true} />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleReturnRequest}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              Return Order
            </button>
            <button
              onClick={handleARQRMenu}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center space-x-2"
            >
              <QrCode size={20} />
              <span>AR-QR Menu Card</span>
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
        <p className="text-gray-500">{restaurant.location}</p>

        {/* Sustainability Info */}
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Leaf className="text-green-500" size={20} />
            <h3 className="font-semibold">Sustainability Initiatives</h3>
          </div>
          <ul className="space-y-2 text-sm text-green-700">
            <li>• Uses eco-friendly packaging</li>
            <li>• Sources ingredients locally</li>
            <li>• Implements food waste reduction program</li>
            <li>• Energy-efficient kitchen equipment</li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <div className="space-y-4">
            {restaurant.menu.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{item.name}</h3>
                    {item.isVegetarian && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        Veg
                      </span>
                    )}
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                      {item.spiceLevel}
                    </span>
                    {/* Add eco-friendly badge for sustainable items */}
                    {item.isVegetarian && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded flex items-center">
                        <Leaf size={12} className="mr-1" />
                        Eco-friendly
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
                    <span>🕒 {item.prepTime}</span>
                    <span>🔥 {item.calories}</span>
                    <span>👥 Serves {item.serves}</span>
                  </div>
                  <p className="text-red-500 font-medium mt-2">₹{item.price}</p>
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showReturnModal && (
        <ReturnOrderModal
          orderId="ORD123456"
          userId={user?.username || ''}
          onClose={() => setShowReturnModal(false)}
        />
      )}
    </div>
  );
};