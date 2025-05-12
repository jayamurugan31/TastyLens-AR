import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { RestaurantDetails } from './pages/RestaurantDetails';
import { Cart } from './pages/Cart';
import { DeliveryPartner } from './pages/DeliveryPartner';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';
import { OrderFood } from './components/OrderFood';
import { Chatbot } from './components/Chatbot';
import { Donators } from './pages/Donators';
import { Community } from './pages/Community';
import { BlockchainDemo } from './pages/BlockchainDemo';
import { TourGuide } from './components/TourGuide';
import { ImpactButton } from './components/ImpactButton';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';

function App() {
  const [location, setLocation] = useState('T. Nagar, Chennai');
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 relative">
        <Toaster position="top-right" />
        <TourGuide />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route
            path="*"
            element={
              <>
                <Header
                  location={location}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onChatbotOpen={() => setIsChatbotOpen(true)}
                />
                <Navigation />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurants" element={<Home />} />
                    <Route path="/restaurants/:id" element={<RestaurantDetails />} />
                    <Route path="/order" element={<OrderFood />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/donate" element={<Donators />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/blockchain" element={<BlockchainDemo />} />
                    {user?.userType === 'delivery_partner' && (
                      <Route path="/delivery" element={<DeliveryPartner />} />
                    )}
                  </Routes>
                </main>
                <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
                <ImpactButton />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;