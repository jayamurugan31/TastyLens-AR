import React, { useState, useEffect } from 'react';
import { useBlockchainStore } from '../store/useBlockchainStore';
import { Shield, CheckCircle, Clock, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface OrderVerificationProps {
  orderId: number;
  onVerified: () => void;
}

export const OrderVerification: React.FC<OrderVerificationProps> = ({
  orderId,
  onVerified
}) => {
  const { verifyOrder } = useBlockchainStore();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerification = async () => {
    setIsVerifying(true);
    try {
      await verifyOrder(orderId);
      setIsVerified(true);
      onVerified();
      toast.success('Order verified successfully on blockchain!');
    } catch (error) {
      console.error('Verification failed:', error);
      toast.error('Order verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="text-green-500" size={24} />
        <h3 className="text-lg font-semibold">Blockchain Verification</h3>
      </div>

      <div className="space-y-4">
        {!isVerified ? (
          <>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock size={20} />
              <span>Waiting for blockchain verification</span>
            </div>

            <button
              onClick={handleVerification}
              disabled={isVerifying}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Shield size={20} />
                  <span>Verify Order</span>
                </>
              )}
            </button>
          </>
        ) : (
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle size={20} />
            <span>Order verified on blockchain</span>
          </div>
        )}
      </div>
    </div>
  );
};