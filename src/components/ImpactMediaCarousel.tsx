import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Users } from 'lucide-react';

interface ImpactStory {
  id: number;
  image: string;
  shelterName: string;
  mealsReceived: number;
  description: string;
  date: string;
  location: string;
}

const impactStories: ImpactStory[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=60',
    shelterName: 'Hope Foundation Shelter',
    mealsReceived: 250,
    description: 'Thanks to your donations, we were able to serve nutritious meals to over 100 families today.',
    date: '2 hours ago',
    location: 'Anna Nagar, Chennai'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&auto=format&fit=crop&q=60',
    shelterName: 'Caring Hearts Community Center',
    mealsReceived: 180,
    description: 'Your support helped us organize a community lunch program for elderly residents.',
    date: '1 day ago',
    location: 'T. Nagar, Chennai'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=60',
    shelterName: 'Children\'s Aid Society',
    mealsReceived: 320,
    description: 'We provided healthy meals to 150 children as part of our weekend nutrition program.',
    date: '2 days ago',
    location: 'Mylapore, Chennai'
  }
];

export const ImpactMediaCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    const newIndex = (currentIndex + 1) % impactStories.length;
    goToSlide(newIndex);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    const newIndex = (currentIndex - 1 + impactStories.length) % impactStories.length;
    goToSlide(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-red-500 to-red-600">
        <h2 className="text-2xl font-bold text-white mb-2">Impact in Action</h2>
        <p className="text-red-100">See where your donations are making a difference</p>
      </div>

      <div className="relative">
        {/* Main Image */}
        <div className="relative h-[400px] overflow-hidden">
          {impactStories.map((story, index) => (
            <div
              key={story.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentIndex ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
            >
              <img
                src={story.image}
                alt={story.shelterName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Story Details Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="text-red-500" size={20} />
                  <span className="text-sm font-medium">{story.date}</span>
                  <span className="text-sm">•</span>
                  <span className="text-sm">{story.location}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{story.shelterName}</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="text-red-400" size={20} />
                  <span className="font-medium">{story.mealsReceived} meals received</span>
                </div>
                <p className="text-sm text-gray-200">{story.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-lg p-2 rounded-full text-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-lg p-2 rounded-full text-white transition-colors"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2">
          {impactStories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};