import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useReturnStore } from '../store/useReturnStore';
import { MessageSquare, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const { verifyDiscountToken } = useReturnStore();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [discountToken, setDiscountToken] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = isDiscountApplied ? subtotal * 0.2 : 0; // 20% discount
  const total = subtotal - discount;

  const handleApplyDiscount = () => {
    if (!discountToken) {
      toast.error('Please enter a discount token');
      return;
    }

    if (verifyDiscountToken(discountToken)) {
      setIsDiscountApplied(true);
      toast.success('Discount token applied successfully!');
    } else {
      toast.error('Invalid discount token');
    }
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    const otp = generateOTP();
    localStorage.setItem('currentOrderOTP', otp);
    
    toast.success('Order placed successfully! Share OTP with delivery partner: ' + otp);
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-4">Add some delicious items to your cart!</p>
          <button
            onClick={() => navigate('/restaurants')}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        
        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(item.id, item.quantity - 1);
                      } else {
                        removeItem(item.id);
                      }
                    }}
                    className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Discount Token Section */}
        <div className="mt-6 border-t pt-6">
          <div className="flex items-center space-x-2 mb-3">
            <Gift size={20} className="text-green-500" />
            <h3 className="text-lg font-semibold">Apply Discount Token</h3>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={discountToken}
              onChange={(e) => setDiscountToken(e.target.value.toUpperCase())}
              placeholder="Enter your discount token"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isDiscountApplied}
            />
            <button
              onClick={handleApplyDiscount}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDiscountApplied}
            >
              Apply
            </button>
          </div>
          {isDiscountApplied && (
            <p className="mt-2 text-sm text-green-600">
              20% discount applied successfully!
            </p>
          )}
        </div>

        {/* Special Instructions */}
        <div className="mt-6 border-t pt-6">
          <div className="flex items-center space-x-2 mb-3">
            <MessageSquare size={20} className="text-gray-500" />
            <h3 className="text-lg font-semibold">Add Special Instructions</h3>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Any special requests or delivery instructions?"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            rows={3}
          />
        </div>

        {/* Order Summary */}
        <div className="mt-6 pt-6 border-t">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            {isDiscountApplied && (
              <div className="flex justify-between items-center text-green-600">
                <span>Discount (20%):</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};