import React from 'react';
import { Package, RotateCcw, Gift, Clock, Phone, MapPin, Star, User } from 'lucide-react';
import { Order, ReturnRequest } from '../types';
import { useReturnStore } from '../store/useReturnStore';
import toast from 'react-hot-toast';

interface RecentOrdersProps {
  userId: string;
}

export const RecentOrders: React.FC<RecentOrdersProps> = ({ userId }) => {
  const { returnRequests, discountTokens } = useReturnStore();

  // Demo orders - In a real app, this would come from an API
  const recentOrders: Order[] = [
    {
      id: 'ORD123456',
      userId,
      restaurantId: 1,
      items: [
        { id: 1, name: 'Chicken Biryani', price: 250, quantity: 2 },
        { id: 2, name: 'Butter Naan', price: 40, quantity: 3 }
      ],
      status: 'delivered',
      totalAmount: 620,
      createdAt: new Date('2024-03-20T14:30:00'),
      deliveryAddress: {
        fullAddress: '123 Main St, Chennai',
        contactName: 'John Doe',
        contactPhone: '+91 9876543210'
      },
      deliveryPartner: {
        name: 'Jayamurugan',
        phone: '+91 9876543212',
        vehicleType: 'bike',
        vehicleNumber: 'TN01AB1234',
        currentLocation: {
          latitude: 13.0827,
          longitude: 80.2707,
          address: 'Anna Nagar, Chennai'
        },
        rating: 4.8,
        totalDeliveries: 1250,
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60'
      },
      estimatedDeliveryTime: '30-35 mins'
    },
    {
      id: 'ORD123457',
      userId,
      restaurantId: 2,
      items: [
        { id: 3, name: 'Masala Dosa', price: 80, quantity: 2 },
        { id: 4, name: 'Filter Coffee', price: 40, quantity: 2 }
      ],
      status: 'ngo_donation_completed',
      totalAmount: 240,
      createdAt: new Date('2024-03-19T12:15:00'),
      deliveryAddress: {
        fullAddress: '456 Park Ave, Chennai',
        contactName: 'John Doe',
        contactPhone: '+91 9876543210'
      },
      deliveryPartner: {
        name: 'Ramesh Kumar',
        phone: '+91 9876543213',
        vehicleType: 'scooter',
        vehicleNumber: 'TN01CD5678',
        currentLocation: {
          latitude: 13.0569,
          longitude: 80.2425,
          address: 'T. Nagar, Chennai'
        },
        rating: 4.7,
        totalDeliveries: 980,
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60'
      },
      estimatedDeliveryTime: '25-30 mins'
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'return_initiated':
      case 'return_completed':
        return 'bg-orange-100 text-orange-800';
      case 'ngo_donation_initiated':
      case 'ngo_donation_completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <Package size={16} />;
      case 'return_initiated':
      case 'return_completed':
        return <RotateCcw size={16} />;
      case 'ngo_donation_initiated':
      case 'ngo_donation_completed':
        return <Gift size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Find associated token for returned orders
  const getDiscountToken = (orderId: string) => {
    for (const [token, associatedOrderId] of discountTokens.entries()) {
      if (associatedOrderId === orderId) return token;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Recent Orders</h3>
      <div className="space-y-4">
        {recentOrders.map((order) => {
          const discountToken = getDiscountToken(order.id);
          
          return (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">Order #{order.id}</h4>
                    <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status.replace(/_/g, ' ')}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <span className="font-semibold">₹{order.totalAmount}</span>
              </div>

              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {order.deliveryPartner && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium mb-3">Delivery Partner Details</h5>
                  <div className="flex items-start space-x-4">
                    {order.deliveryPartner.photo && (
                      <img
                        src={order.deliveryPartner.photo}
                        alt={order.deliveryPartner.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-gray-500" />
                        <span className="font-medium">{order.deliveryPartner.name}</span>
                        <div className="flex items-center text-yellow-500">
                          <Star size={14} />
                          <span className="ml-1 text-sm">{order.deliveryPartner.rating}</span>
                        </div>
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Phone size={14} />
                          <span>{order.deliveryPartner.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} />
                          <span>{order.deliveryPartner.currentLocation.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {discountToken && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-700">
                    <Gift size={16} />
                    <span className="font-medium">Discount Token Generated</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <code className="font-mono text-green-600">{discountToken}</code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(discountToken);
                        toast.success('Token copied to clipboard!');
                      }}
                      className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};