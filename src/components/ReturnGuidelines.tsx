import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';

interface ReturnGuidelinesProps {
  onClose: () => void;
  onAccept: () => void;
}

export const ReturnGuidelines: React.FC<ReturnGuidelinesProps> = ({ onClose, onAccept }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Guidelines for Returning Food</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Steps Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Check className="text-green-500 mr-2" size={24} />
              Steps to Return Food Safely
            </h3>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800">1. Check Food Freshness</h4>
                <ul className="mt-2 space-y-1 text-green-700">
                  <li>• Ensure the food is not spoiled, not expired, and has been stored properly</li>
                  <li>• Discard any food that has changed smell, color, or texture</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800">2. Separate Edible Portions</h4>
                <ul className="mt-2 space-y-1 text-green-700">
                  <li>• Remove any spicy, salty, or oily components</li>
                  <li>• Segregate safe foods like boiled rice, vegetables, or plain meats</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800">3. Proper Packaging</h4>
                <ul className="mt-2 space-y-1 text-green-700">
                  <li>• Use clean, sealed containers or biodegradable wraps</li>
                  <li>• Avoid plastic bags that could be harmful if ingested</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800">4. Storage Guidelines</h4>
                <ul className="mt-2 space-y-1 text-green-700">
                  <li>• Store in a refrigerator or cool place if not donating immediately</li>
                  <li>• Keep away from open spaces to prevent pest attraction</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Foods to Avoid Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="text-red-500 mr-2" size={24} />
              Do NOT Return These Items
            </h3>
            <div className="bg-red-50 p-4 rounded-lg">
              <ul className="space-y-2 text-red-700">
                <li className="flex items-center">
                  <X size={16} className="mr-2" />
                  Food that has gone bad or smells sour
                </li>
                <li className="flex items-center">
                  <X size={16} className="mr-2" />
                  Leftovers mixed with spices or sauces
                </li>
                <li className="flex items-center">
                  <X size={16} className="mr-2" />
                  Food with mold, fungus, or pests
                </li>
                <li className="flex items-center">
                  <X size={16} className="mr-2" />
                  Bones from cooked meat
                </li>
                <li className="flex items-center">
                  <X size={16} className="mr-2" />
                  Large quantities of dairy products
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              I Understand, Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};