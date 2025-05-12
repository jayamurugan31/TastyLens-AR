import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Upload, X, Heart, MapPin, Clock, Calendar, Search, Filter, ChevronDown, CheckCircle, XCircle, AlertCircle, Droplet, Scale, ThermometerSun, Package, ArrowRight, Image, Users, MessageCircle, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Post {
  id: string;
  userName: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isDonationSuccess?: boolean;
  donationDetails?: {
    ngoName: string;
    items: string[];
    weight: number;
    location: string;
  };
}

const initialPosts: Post[] = [
  {
    id: '1',
    userName: 'Priya Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1630410364547-5bb6d31c8c42?w=800&auto=format&fit=crop&q=60',
    caption: 'Just donated a month\'s worth of food to our local shelter! Every small act counts ❤️ #FoodDonation #Community',
    likes: 156,
    comments: 23,
    timeAgo: '2 hours ago',
    isDonationSuccess: true,
    donationDetails: {
      ngoName: 'Feeding Hope Foundation',
      items: ['Rice', 'Vegetables', 'Bread'],
      weight: 25,
      location: 'Anna Nagar, Chennai'
    }
  },
  {
    id: '2',
    userName: 'Karthik Raja',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop&q=60',
    caption: 'Monthly food distribution drive completed! Grateful to be part of this amazing community 🙏 #GivingBack',
    likes: 234,
    comments: 45,
    timeAgo: '5 hours ago'
  }
];

export const Community: React.FC = () => {
  const { isLoggedIn, user } = useAuthStore();
  const navigate = useNavigate();
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donationImage, setDonationImage] = useState<string>('');
  const [donationDetails, setDonationDetails] = useState({
    caption: '',
    ngoName: '',
    items: '',
    weight: '',
    location: ''
  });
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setDonationImage(imageUrl);
    }
  };

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationImage || !donationDetails.caption || !donationDetails.ngoName) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Create new post
    const newPost: Post = {
      id: Date.now().toString(),
      userName: user?.username || 'Anonymous',
      userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=60',
      image: donationImage,
      caption: donationDetails.caption,
      likes: 0,
      comments: 0,
      timeAgo: 'Just now',
      isDonationSuccess: true,
      donationDetails: {
        ngoName: donationDetails.ngoName,
        items: donationDetails.items.split(',').map(item => item.trim()),
        weight: parseFloat(donationDetails.weight) || 0,
        location: donationDetails.location
      }
    };

    // Add new post to the beginning of the posts array
    setPosts([newPost, ...posts]);

    toast.success('Donation success story shared!');
    setShowDonationForm(false);
    setDonationImage('');
    setDonationDetails({
      caption: '',
      ngoName: '',
      items: '',
      weight: '',
      location: ''
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-2xl font-bold mb-2">Community Feed</h1>
        <p className="text-gray-600">Share your food donation stories and inspire others</p>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Heart className="text-red-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Total Donations</p>
                <p className="text-xl font-bold text-red-500">1,234</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Package className="text-blue-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Food Shared</p>
                <p className="text-xl font-bold text-blue-500">856 kg</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="text-green-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Lives Impacted</p>
                <p className="text-xl font-bold text-green-500">10k+</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowDonationForm(true)}
          className="mt-6 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 flex items-center justify-center space-x-2"
        >
          <Image size={20} />
          <span>Share Donation Success Story</span>
        </button>
      </div>

      {/* Donation Success Form Modal */}
      {showDonationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Share Your Donation Success</h3>
              <button
                onClick={() => setShowDonationForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitDonation} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {donationImage ? (
                      <div className="relative">
                        <img
                          src={donationImage}
                          alt="Donation preview"
                          className="mx-auto h-48 w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setDonationImage('')}
                          className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Camera className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-500 hover:text-red-600">
                            <span>Upload a photo</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption
                </label>
                <textarea
                  value={donationDetails.caption}
                  onChange={(e) => setDonationDetails({ ...donationDetails, caption: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows={3}
                  placeholder="Share your donation experience..."
                  required
                />
              </div>

              {/* NGO Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NGO Name
                </label>
                <input
                  type="text"
                  value={donationDetails.ngoName}
                  onChange={(e) => setDonationDetails({ ...donationDetails, ngoName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter NGO name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Items Donated
                  </label>
                  <input
                    type="text"
                    value={donationDetails.items}
                    onChange={(e) => setDonationDetails({ ...donationDetails, items: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., Rice, Vegetables"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={donationDetails.weight}
                    onChange={(e) => setDonationDetails({ ...donationDetails, weight: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter weight"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={donationDetails.location}
                  onChange={(e) => setDonationDetails({ ...donationDetails, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter location"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowDonationForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Share Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Post Header */}
            <div className="p-4 flex items-center space-x-3">
              <img
                src={post.userAvatar}
                alt={post.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{post.userName}</h3>
                <p className="text-sm text-gray-500">{post.timeAgo}</p>
              </div>
            </div>

            {/* Post Image */}
            <img
              src={post.image}
              alt="Post"
              className="w-full h-96 object-cover"
            />

            {/* Post Content */}
            <div className="p-4">
              <p className="text-gray-800 mb-4">{post.caption}</p>

              {/* Donation Details */}
              {post.isDonationSuccess && post.donationDetails && (
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="text-green-500" size={20} />
                    <h4 className="font-semibold text-green-700">Donation Details</h4>
                  </div>
                  <div className="space-y-2 text-sm text-green-600">
                    <p>NGO: {post.donationDetails.ngoName}</p>
                    <p>Items: {post.donationDetails.items.join(', ')}</p>
                    <p>Weight: {post.donationDetails.weight} kg</p>
                    <p>Location: {post.donationDetails.location}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500">
                  <Heart size={20} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
                  <MessageCircle size={20} />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};