import React from 'react';
import { X } from 'lucide-react';
import { useNGOStore } from '../store/useNGOStore';
import { User } from '../types';

interface NGOSelectionModalProps {
  onClose: () => void;
  onSelect: (ngo: User) => void;
}

export const NGOSelectionModal: React.FC<NGOSelectionModalProps> = ({
  onClose,
  onSelect,
}) => {
  const { ngos } = useNGOStore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select NGO for Food Donation</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {ngos.map((ngo) => (
            <div
              key={ngo.username}
              className="border border-gray-200 rounded-lg p-4 hover:border-red-500 cursor-pointer transition-colors"
              onClick={() => onSelect(ngo)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{ngo.ngoDetails?.name}</h3>
                  <p className="text-gray-600">{ngo.ngoDetails?.type}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  Capacity: {ngo.ngoDetails?.capacity}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <p>{ngo.address}</p>
                <p>Operating Hours: {ngo.ngoDetails?.operatingHours}</p>
                <p>Contact: {ngo.ngoDetails?.contactPerson}</p>
                <p>Phone: {ngo.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};