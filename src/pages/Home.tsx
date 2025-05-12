import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { restaurants } from '../data/restaurants';
import { CommunityImpactDashboard } from '../components/CommunityImpactDashboard';
import { ImpactMediaCarousel } from '../components/ImpactMediaCarousel';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const handleRestaurantClick = (restaurantId: number) => {
    navigate(`/restaurants/${restaurantId}`);
  };

  const handlePromotionClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/restaurants');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Promotional Banner */}
      <div className="bg-black rounded-xl overflow-hidden relative mb-8">
        <img
          src="https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=800&auto=format&fit=crop&q=60"
          alt="Promotional Banner"
          className="w-full h-80 object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
          <h2 className="text-4xl font-bold mb-4">Get up to 50% OFF</h2>
          <p className="text-xl mb-6">on your dining bills with Tasty Lens</p>
          <button
            onClick={handlePromotionClick}
            className="bg-red-500 text-white px-6 py-3 rounded-lg w-fit hover:bg-red-600 transition-colors"
          >
            Check out all the restaurants
          </button>
        </div>
      </div>

      {/* Community Impact Dashboard */}
      <div className="mb-12">
        <CommunityImpactDashboard />
      </div>

      {/* Impact Media Carousel */}
      <div className="mb-12">
        <ImpactMediaCarousel />
      </div>

      {/* Restaurant List */}
      <h2 className="text-2xl font-bold mb-6">T. Nagar Restaurants, Chennai</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 restaurant-cards">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
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
              <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{restaurant.cost}</span>
                <span>{restaurant.distance}</span>
              </div>
              {restaurant.closing && (
                <p className="text-red-500 text-sm mt-2">{restaurant.closing}</p>
              )}
              <button
                onClick={() => handleRestaurantClick(restaurant.id)}
                className="mt-4 block w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-center"
              >
                View Menu
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};