import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Filter } from 'lucide-react';
import { restaurants } from '../data/restaurants';

export const OrderFood: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');

  const cuisines = Array.from(
    new Set(
      restaurants.flatMap((r) => r.cuisine.split(', '))
    )
  ).sort();

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || restaurant.cuisine.includes(selectedCuisine);
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for restaurants or cuisines"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
          >
            <option value="all">All Cuisines</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
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
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <MapPin size={16} className="mr-1" />
                <span>{restaurant.location}</span>
              </div>
              <button
                onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
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