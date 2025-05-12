import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, Pizza, Heart, Users, Wallet } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex space-x-8 navigation-tabs">
          <Link
            to="/restaurants"
            className={`flex items-center space-x-2 pb-2 ${
              isActive('/restaurants') || isActive('/')
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Truck size={20} />
            <span>Restaurants</span>
          </Link>
          <Link
            to="/order"
            className={`flex items-center space-x-2 pb-2 ${
              isActive('/order')
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Pizza size={20} />
            <span>Order Food</span>
          </Link>
          <Link
            to="/donate"
            className={`flex items-center space-x-2 pb-2 ${
              isActive('/donate')
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Heart size={20} />
            <span>Donate Food</span>
          </Link>
          <Link
            to="/community"
            className={`flex items-center space-x-2 pb-2 ${
              isActive('/community')
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users size={20} />
            <span>Community</span>
          </Link>
          <Link
            to="/blockchain"
            className={`flex items-center space-x-2 pb-2 ${
              isActive('/blockchain')
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Wallet size={20} />
            <span>Blockchain Demo</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}