import React, { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';
import { ChefHat as Chef, ArrowRight, Star, ShoppingCart, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const TOUR_STEPS: Step[] = [
  {
    target: '.location-selector',
    content: (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Chef className="text-red-500" size={24} />
          <h3 className="text-lg font-bold">Welcome, Chief!</h3>
        </div>
        <p>First, make sure your location is set correctly so we can show you the best restaurants nearby!</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.search-bar',
    content: (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Chef className="text-red-500" size={24} />
          <h3 className="text-lg font-bold">Find Your Favorites!</h3>
        </div>
        <p>Search for your favorite restaurants, cuisines, or dishes. I'll help you discover amazing food!</p>
      </div>
    ),
  },
  {
    target: '.navigation-tabs',
    content: (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Chef className="text-red-500" size={24} />
          <h3 className="text-lg font-bold">Easy Navigation!</h3>
        </div>
        <p>Browse restaurants, order food, or even donate meals to those in need. You're in control!</p>
      </div>
    ),
  },
  {
    target: '.restaurant-cards',
    content: (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Chef className="text-red-500" size={24} />
          <h3 className="text-lg font-bold">Explore Restaurants!</h3>
        </div>
        <p>Check out our curated list of restaurants. Each card shows ratings, cuisine type, and distance!</p>
      </div>
    ),
  },
  {
    target: '.ai-nutritionist',
    content: (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Chef className="text-red-500" size={24} />
          <h3 className="text-lg font-bold">Need Advice?</h3>
        </div>
        <p>Chat with our AI Nutritionist for personalized diet recommendations and healthy eating tips!</p>
      </div>
    ),
  },
];

interface FloatingAssistantProps {
  message: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const FloatingAssistant: React.FC<FloatingAssistantProps> = ({ message, icon, onClick }) => (
  <div
    className="fixed bottom-20 right-4 flex items-center cursor-pointer transform hover:scale-105 transition-transform z-50"
    onClick={onClick}
  >
    <div className="bg-white p-3 rounded-l-lg shadow-lg flex items-center space-x-2 min-w-[200px]">
      <span className="text-sm font-medium">{message}</span>
      <ArrowRight size={16} className="text-red-500 flex-shrink-0" />
    </div>
    <div className="bg-red-500 p-3 rounded-r-lg shadow-lg text-white">
      {icon}
    </div>
  </div>
);

const ASSISTANT_MESSAGES = [
  {
    message: "Welcome back! Ready to explore?",
    icon: <Chef size={24} />,
    action: () => toast.success("Let me show you around!")
  },
  {
    message: "Hungry? Let's find something tasty!",
    icon: <Star size={24} />,
    action: () => toast.success("Check out our top-rated restaurants!")
  },
  {
    message: "Your cart is empty! Time to order?",
    icon: <ShoppingCart size={24} />,
    action: () => toast.success("Browse our delicious menu options!")
  },
  {
    message: "Make someone's day! Donate food!",
    icon: <Heart size={24} />,
    action: () => toast.success("Thank you for your kindness!")
  }
];

export const TourGuide: React.FC = () => {
  const [runTour, setRunTour] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showAssistant, setShowAssistant] = useState(true);

  useEffect(() => {
    // Force the assistant to be visible initially
    setShowAssistant(true);
    
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setRunTour(true);
    }

    // Reset localStorage for testing
    // localStorage.removeItem('hasSeenTour');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % ASSISTANT_MESSAGES.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem('hasSeenTour', 'true');
    }
  };

  const currentMessage = ASSISTANT_MESSAGES[messageIndex];

  return (
    <div className="relative z-50">
      <Joyride
        steps={TOUR_STEPS}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#ef4444',
            zIndex: 1000,
          },
          tooltip: {
            padding: '20px',
          },
          buttonNext: {
            backgroundColor: '#ef4444',
          },
          buttonBack: {
            color: '#ef4444',
          },
        }}
      />
      
      {showAssistant && (
        <FloatingAssistant
          message={currentMessage.message}
          icon={currentMessage.icon}
          onClick={() => {
            currentMessage.action();
            setShowAssistant(false);
            setTimeout(() => setShowAssistant(true), 3000);
          }}
        />
      )}
    </div>
  );
};