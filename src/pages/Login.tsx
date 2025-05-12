import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const demoCredentials = [
  { username: 'harishwaran', password: 'hari8892', userType: 'customer' },
  { username: 'anusha', password: 'hari8892', userType: 'admin' },
  { username: 'jayamurugan', password: 'hari8892', userType: 'delivery_partner', vehicleType: 'bike', licenseNumber: 'TN1234567' },
  { username: 'admin', password: 'admin123', userType: 'admin' }
];

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = demoCredentials.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (user) {
      login(user);
      if (user.userType === 'admin') {
        navigate('/admin');
      } else if (user.userType === 'delivery_partner') {
        navigate('/delivery');
      } else {
        navigate('/');
      }
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to Tasty Lens
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Username"
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
            <p className="font-semibold">Demo Credentials:</p>
            <ul className="mt-2 space-y-1">
              <li>harishwaran (Customer)</li>
              <li>jayamurugan (Delivery Partner)</li>
              <li>anusha (Customer)</li>
              <li>admin (Admin)</li>
              <li>Password for customers/delivery: hari8892</li>
              <li>Password for admin: admin123</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}