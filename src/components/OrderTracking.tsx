import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Package, Clock, MapPin, Navigation, CheckCircle } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingProps {
  order: Order;
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyAl7FqK8frobtdcRUKpiVY34SQGTG9pFII'; // Replace with your actual API key

export const OrderTracking: React.FC<OrderTrackingProps> = ({ order }) => {
  if (!order.deliveryPartner) return null;

  const { currentLocation } = order.deliveryPartner;
  const position = { lat: currentLocation.latitude, lng: currentLocation.longitude };

  const getOrderProgress = () => {
    switch (order.status) {
      case 'confirmed':
        return 25;
      case 'preparing':
        return 50;
      case 'out_for_delivery':
        return 75;
      case 'delivered':
        return 100;
      default:
        return 0;
    }
  };

  const orderSteps = [
    { status: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
    { status: 'preparing', label: 'Preparing', icon: Package },
    { status: 'out_for_delivery', label: 'Out for Delivery', icon: Navigation },
    { status: 'delivered', label: 'Delivered', icon: CheckCircle }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-6">Order Tracking</h3>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="flex justify-between mb-2">
            {orderSteps.map((step, index) => {
              const isCompleted = getOrderProgress() >= ((index + 1) * 25);
              const isCurrent = order.status === step.status;
              const Icon = step.icon;

              return (
                <div
                  key={step.status}
                  className={`flex flex-col items-center ${
                    isCompleted ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-100'
                        : isCurrent
                        ? 'bg-blue-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <span className="text-xs mt-1">{step.label}</span>
                </div>
              );
            })}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${getOrderProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Estimated Time */}
      <div className="flex items-center space-x-2 mb-6 p-4 bg-blue-50 rounded-lg">
        <Clock className="text-blue-500" size={20} />
        <div>
          <p className="text-sm text-blue-600">Estimated Delivery Time</p>
          <p className="font-semibold">{order.estimatedDeliveryTime}</p>
        </div>
      </div>

      {/* Delivery Partner Location */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Delivery Partner Location</h4>
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin size={16} />
          <span>{currentLocation.address}</span>
        </div>

        <div className="h-64 rounded-lg overflow-hidden">
          <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <Map
              zoom={15}
              center={position}
              gestureHandling="greedy"
              mapId="tasty-lens-map"
            >
              <Marker position={position} />
            </Map>
          </APIProvider>
        </div>
      </div>
    </div>
  );
};