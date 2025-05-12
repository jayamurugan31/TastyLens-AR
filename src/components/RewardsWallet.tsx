import React from 'react';
import { Wallet, Gift, TrendingUp, History } from 'lucide-react';
import { useBlockchainStore } from '../store/useBlockchainStore';
import toast from 'react-hot-toast';

export const RewardsWallet: React.FC = () => {
  const { tokenBalance, sustainableOrders, totalOrders } = useBlockchainStore();

  const handleRedeem = (amount: number) => {
    if (tokenBalance < amount) {
      toast.error('Insufficient tokens');
      return;
    }
    
    toast.success(`Redeemed ${amount} tokens!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Wallet className="text-red-500 mr-2" size={24} />
          Sustainability Rewards
        </h2>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
          {tokenBalance} Tokens
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Gift className="text-purple-500 mr-2" size={20} />
              <span className="font-medium">Available</span>
            </div>
            <span className="text-xl font-bold">{tokenBalance}</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="text-blue-500 mr-2" size={20} />
              <span className="font-medium">Eco Orders</span>
            </div>
            <span className="text-xl font-bold">{sustainableOrders}</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <History className="text-green-500 mr-2" size={20} />
              <span className="font-medium">Total Orders</span>
            </div>
            <span className="text-xl font-bold">{totalOrders}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold mb-3">Redeem Rewards</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleRedeem(100)}
            className="p-4 border border-gray-200 rounded-lg hover:border-red-500 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">₹100 Off</span>
              <span className="text-sm text-gray-500">100 Tokens</span>
            </div>
            <p className="text-sm text-gray-600">Get ₹100 off on your next order</p>
          </button>

          <button
            onClick={() => handleRedeem(200)}
            className="p-4 border border-gray-200 rounded-lg hover:border-red-500 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">₹250 Off</span>
              <span className="text-sm text-gray-500">200 Tokens</span>
            </div>
            <p className="text-sm text-gray-600">Get ₹250 off on orders above ₹1000</p>
          </button>

          <button
            onClick={() => handleRedeem(500)}
            className="p-4 border border-gray-200 rounded-lg hover:border-red-500 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Free Delivery</span>
              <span className="text-sm text-gray-500">500 Tokens</span>
            </div>
            <p className="text-sm text-gray-600">Free delivery on your next 5 orders</p>
          </button>

          <button
            onClick={() => handleRedeem(1000)}
            className="p-4 border border-gray-200 rounded-lg hover:border-red-500 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Premium Membership</span>
              <span className="text-sm text-gray-500">1000 Tokens</span>
            </div>
            <p className="text-sm text-gray-600">1 month of premium benefits</p>
          </button>
        </div>
      </div>
    </div>
  );
};