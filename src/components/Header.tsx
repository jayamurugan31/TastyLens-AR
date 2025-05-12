import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, Bot, ShoppingCart } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';

interface HeaderProps {
  location: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onChatbotOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  location,
  searchQuery,
  onSearchChange,
  onChatbotOpen,
}) => {
  const { isLoggedIn, user, logout } = useAuthStore();
  const { items } = useCartStore();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-cursive font-bold">
              Tasty Lens
            </Link>
            <div className="flex items-center space-x-2 text-gray-600 location-selector">
              <MapPin size={20} />
              <span>{location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/cart"
              className="relative flex items-center text-gray-700 hover:text-gray-900"
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <div className="auth-buttons">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-900 mr-4"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome, {user?.username}</span>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Profile
                  </Link>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={onChatbotOpen}
              className="ai-nutritionist flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <Bot size={20} />
              <span>AI Nutritionist</span>
            </button>
          </div>
        </div>

        <div className="mt-4 relative search-bar">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};