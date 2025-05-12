import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Leaf, X, ArrowRight } from 'lucide-react';

export const ImpactButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDonate = () => {
    setShowModal(false);
    navigate('/donate');
  };

  const handleSustainableMeal = () => {
    setShowModal(false);
    navigate('/restaurants', { state: { filter: 'sustainable' } });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center space-x-2 z-50"
      >
        <span className="font-medium">Make an Impact Today</span>
        <ArrowRight size={20} />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg mx-4 relative overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white">
              <h2 className="text-2xl font-bold">Choose Your Impact Path</h2>
              <p className="text-red-100 mt-2">
                Make a difference in your community today
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Donate Option */}
              <button
                onClick={handleDonate}
                className="w-full bg-white border-2 border-red-500 rounded-xl p-6 text-left hover:bg-red-50 transition-colors group"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg group-hover:bg-red-200 transition-colors">
                    <Heart className="text-red-500" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                      <span>Donate a Meal</span>
                      <ArrowRight className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Help provide nutritious meals to those in need through our network of local shelters and NGOs.
                    </p>
                  </div>
                </div>
              </button>

              {/* Sustainable Meal Option */}
              <button
                onClick={handleSustainableMeal}
                className="w-full bg-white border-2 border-green-500 rounded-xl p-6 text-left hover:bg-green-50 transition-colors group"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Leaf className="text-green-500" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                      <span>Choose a Sustainable Meal</span>
                      <ArrowRight className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Order from restaurants committed to sustainable practices and reducing food waste.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Impact Stats */}
            <div className="p-6 bg-gray-50 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-500">25,678</p>
                  <p className="text-sm text-gray-600">Meals Donated</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">4,567</p>
                  <p className="text-sm text-gray-600">kg CO₂ Saved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};