import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useReturnStore } from '../store/useReturnStore';
import { ReturnGuidelines } from './ReturnGuidelines';
import toast from 'react-hot-toast';

interface ReturnOrderModalProps {
  orderId: string;
  userId: string;
  onClose: () => void;
}

export const ReturnOrderModal: React.FC<ReturnOrderModalProps> = ({
  orderId,
  userId,
  onClose,
}) => {
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [reason, setReason] = useState('');
  const { addReturnRequest } = useReturnStore();

  const generateReturnOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason.trim()) {
      toast.error('Please provide a reason for return');
      return;
    }

    const returnOTP = generateReturnOTP();
    const returnRequest = {
      orderId,
      userId,
      reason,
      status: 'pending',
      returnOTP,
      createdAt: new Date(),
    };

    addReturnRequest(returnRequest);
    toast.success(`Return request initiated! Your return OTP is: ${returnOTP}`);
    onClose();
  };

  if (showGuidelines) {
    return (
      <ReturnGuidelines
        onClose={onClose}
        onAccept={() => setShowGuidelines(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Return Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Reason for Return
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={4}
              placeholder="Please explain why you want to return this order..."
              required
            />
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Submit Return Request
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};