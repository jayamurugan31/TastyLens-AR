import React, { useState } from 'react';
import { useBlockchainStore } from '../store/useBlockchainStore';
import { Wallet, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface BlockchainPaymentProps {
  amount: number;
  restaurantAddress: string;
  onSuccess: (orderId: number) => void;
  onError: (error: Error) => void;
}

export const BlockchainPayment: React.FC<BlockchainPaymentProps> = ({
  amount,
  restaurantAddress,
  onSuccess,
  onError
}) => {
  const { initialize, createOrder, payOrder } = useBlockchainStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      await initialize();
      const orderId = await createOrder(restaurantAddress, amount);
      await payOrder(orderId, amount);
      onSuccess(orderId);
      toast.success('Payment completed successfully!');
    } catch (error) {
      console.error('Payment failed:', error);
      onError(error as Error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wallet className="text-blue-500" size={24} />
          <h3 className="text-lg font-semibold">Blockchain Payment</h3>
        </div>
        <span className="text-lg font-bold">{amount} ETH</span>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-blue-500" size={20} />
            <span className="text-sm text-blue-700">Secure blockchain transaction</span>
          </div>
        </div>

        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="text-yellow-500" size={20} />
            <span className="text-sm text-yellow-700">
              Make sure you have MetaMask installed and enough ETH in your wallet
            </span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <Wallet size={20} />
              <span>Pay with ETH</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};