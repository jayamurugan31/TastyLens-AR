import React from 'react';
import { Leaf, Award, Shield } from 'lucide-react';

interface SustainabilityBadgeProps {
  score: number;
  isVerified: boolean;
}

export const SustainabilityBadge: React.FC<SustainabilityBadgeProps> = ({ score, isVerified }) => {
  const getBadgeColor = () => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };

  const getBadgeIcon = () => {
    if (score >= 80) return <Leaf className="text-green-500" size={20} />;
    if (score >= 60) return <Award className="text-yellow-500" size={20} />;
    return <Shield className="text-orange-500" size={20} />;
  };

  if (!isVerified) return null;

  return (
    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getBadgeColor()}`}>
      {getBadgeIcon()}
      <span className="font-medium">Eco Score: {score}</span>
    </div>
  );
};