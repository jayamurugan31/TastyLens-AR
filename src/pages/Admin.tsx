import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Restaurant, MenuItem } from '../types';
import { restaurants } from '../data/restaurants';
import { Lock, User, Plus, Edit2, Trash2, Save, X, Search, Filter, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminCredential {
  id: string;
  password: string;
}

const adminCredentials: AdminCredential[] = [
  { id: 'admin1', password: '3108' },
  { id: 'admin2', password: '3108' },
  { id: 'admin3', password: '3108' }
];

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { user, login } = useAuthStore();
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCuisine, setFilterCuisine] = useState('all');
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    description: '',
    spiceLevel: 'Medium',
    prepTime: '',
    calories: '',
    serves: '1 person'
  });

  useEffect(() => {
    if (user?.userType !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isValidAdmin = adminCredentials.some(
      admin => admin.id === adminId && admin.password === password
    );

    if (isValidAdmin) {
      login({
        username: adminId,
        userType: 'admin'
      });
      toast.success('Successfully logged in as admin');
    } else {
      toast.error('Invalid admin credentials');
    }
  };

  const handleAddItem = () => {
    if (!selectedRestaurant) return;

    const newMenuItem: MenuItem = {
      id: Math.max(...selectedRestaurant.menu.map(item => item.id)) + 1,
      name: newItem.name || '',
      price: newItem.price || 0,
      description: newItem.description || '',
      spiceLevel: newItem.spiceLevel || 'Medium',
      prepTime: newItem.prepTime || '',
      calories: newItem.calories || '',
      serves: newItem.serves || '1 person'
    };

    selectedRestaurant.menu.push(newMenuItem);
    setNewItem({
      name: '',
      price: 0,
      description: '',
      spiceLevel: 'Medium',
      prepTime: '',
      calories: '',
      serves: '1 person'
    });
    toast.success('Menu item added successfully');
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
  };

  const handleSaveEdit = () => {
    if (!editingItem || !selectedRestaurant) return;

    const index = selectedRestaurant.menu.findIndex(item => item.id === editingItem.id);
    if (index !== -1) {
      selectedRestaurant.menu[index] = editingItem;
      setEditingItem(null);
      toast.success('Menu item updated successfully');
    }
  };

  const handleDeleteItem = (itemId: number) => {
    if (!selectedRestaurant) return;

    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      selectedRestaurant.menu = selectedRestaurant.menu.filter(item => item.id !== itemId);
      toast.success('Menu item deleted successfully');
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = filterCuisine === 'all' || restaurant.cuisine.includes(filterCuisine);
    return matchesSearch && matchesCuisine;
  });

  if (!user?.userType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Admin ID"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">Restaurant Menu Management</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Search restaurants..."
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
            <select
              value={filterCuisine}
              onChange={(e) => setFilterCuisine(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
            >
              <option value="all">All Cuisines</option>
              <option value="South Indian">South Indian</option>
              <option value="North Indian">North Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Continental">Continental</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400" size={20} />
          </div>
        </div>

        {/* Restaurant List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => setSelectedRestaurant(restaurant)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedRestaurant?.id === restaurant.id
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-red-500'
              }`}
            >
              <h3 className="font-semibold">{restaurant.name}</h3>
              <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
              <p className="text-sm text-gray-500 mt-1">
                {restaurant.menu.length} menu items
              </p>
            </div>
          ))}
        </div>

        {selectedRestaurant && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                Menu Items - {selectedRestaurant.name}
              </h3>
              <button
                onClick={() => setNewItem({
                  name: '',
                  price: 0,
                  description: '',
                  spiceLevel: 'Medium',
                  prepTime: '',
                  calories: '',
                  serves: '1 person'
                })}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Add New Item</span>
              </button>
            </div>

            {/* New Item Form */}
            {Object.keys(newItem).length > 0 && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Add New Menu Item</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                    placeholder="Item Name"
                  />
                  <input
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                    className="px-4 py-2 border rounded-lg"
                    placeholder="Price"
                  />
                  <input
                    type="text"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="px-4 py-2 border rounded-lg md:col-span-2"
                    placeholder="Description"
                  />
                  <select
                    value={newItem.spiceLevel}
                    onChange={(e) => setNewItem({ ...newItem, spiceLevel: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="Mild">Mild</option>
                    <option value="Medium">Medium</option>
                    <option value="Hot">Hot</option>
                  </select>
                  <input
                    type="text"
                    value={newItem.prepTime}
                    onChange={(e) => setNewItem({ ...newItem, prepTime: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                    placeholder="Preparation Time"
                  />
                  <input
                    type="text"
                    value={newItem.calories}
                    onChange={(e) => setNewItem({ ...newItem, calories: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                    placeholder="Calories"
                  />
                  <input
                    type="text"
                    value={newItem.serves}
                    onChange={(e) => setNewItem({ ...newItem, serves: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                    placeholder="Serves"
                  />
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    onClick={() => setNewItem({})}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddItem}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            )}

            {/* Menu Items List */}
            <div className="space-y-4">
              {selectedRestaurant.menu.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-red-500 transition-colors"
                >
                  {editingItem?.id === item.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          className="px-4 py-2 border rounded-lg"
                          placeholder="Item Name"
                        />
                        <input
                          type="number"
                          value={editingItem.price}
                          onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                          className="px-4 py-2 border rounded-lg"
                          placeholder="Price"
                        />
                        <input
                          type="text"
                          value={editingItem.description}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                          className="px-4 py-2 border rounded-lg md:col-span-2"
                          placeholder="Description"
                        />
                        <select
                          value={editingItem.spiceLevel}
                          onChange={(e) => setEditingItem({ ...editingItem, spiceLevel: e.target.value })}
                          className="px-4 py-2 border rounded-lg"
                        >
                          <option value="Mild">Mild</option>
                          <option value="Medium">Medium</option>
                          <option value="Hot">Hot</option>
                        </select>
                        <input
                          type="text"
                          value={editingItem.prepTime}
                          onChange={(e) => setEditingItem({ ...editingItem, prepTime: e.target.value })}
                          className="px-4 py-2 border rounded-lg"
                          placeholder="Preparation Time"
                        />
                      </div>
                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={() => setEditingItem(null)}
                          className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <X size={20} />
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                        >
                          <Save size={20} />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>₹{item.price}</span>
                          <span>{item.spiceLevel}</span>
                          <span>{item.prepTime}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};