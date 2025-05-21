import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';

const ADMIN_CREDENTIALS = {
  'admin1': '3108',
  'admin2': '3108', 
  'admin3': '3108'
};

export const Admin: React.FC = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (ADMIN_CREDENTIALS[adminId as keyof typeof ADMIN_CREDENTIALS] === password) {
      login({
        username: adminId,
        userType: 'admin'
      });
      toast.success('Welcome to TastyLens Admin Panel!');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            TastyLens Admin Panel
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your credentials to access the admin panel
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Admin ID"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Login
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p className="font-semibold">Available Admin IDs:</p>
            <ul className="mt-2 space-y-1">
              <li>• admin1</li>
              <li>• admin2</li>
              <li>• admin3</li>
              <li>Password for all admins: 3108</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};