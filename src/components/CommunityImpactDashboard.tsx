import React, { useState, useEffect } from 'react';
import { Heart, Leaf, Users, TrendingUp, Building2, Scale } from 'lucide-react';

interface ImpactStats {
  totalMealsDonated: number;
  sheltersHelped: number;
  co2Saved: number;
  livesImpacted: number;
  activeDonors: number;
  foodWastePrevented: number;
}

export const CommunityImpactDashboard: React.FC = () => {
  const [stats, setStats] = useState<ImpactStats>({
    totalMealsDonated: 0,
    sheltersHelped: 0,
    co2Saved: 0,
    livesImpacted: 0,
    activeDonors: 0,
    foodWastePrevented: 0
  });

  const targetStats: ImpactStats = {
    totalMealsDonated: 25678,
    sheltersHelped: 142,
    co2Saved: 4567,
    livesImpacted: 12890,
    activeDonors: 3456,
    foodWastePrevented: 8900
  };

  useEffect(() => {
    // Animate the counters
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const incrementValues = {
      totalMealsDonated: targetStats.totalMealsDonated / steps,
      sheltersHelped: targetStats.sheltersHelped / steps,
      co2Saved: targetStats.co2Saved / steps,
      livesImpacted: targetStats.livesImpacted / steps,
      activeDonors: targetStats.activeDonors / steps,
      foodWastePrevented: targetStats.foodWastePrevented / steps
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetStats);
        return;
      }

      setStats(prevStats => ({
        totalMealsDonated: Math.min(
          Math.round(prevStats.totalMealsDonated + incrementValues.totalMealsDonated),
          targetStats.totalMealsDonated
        ),
        sheltersHelped: Math.min(
          Math.round(prevStats.sheltersHelped + incrementValues.sheltersHelped),
          targetStats.sheltersHelped
        ),
        co2Saved: Math.min(
          Math.round(prevStats.co2Saved + incrementValues.co2Saved),
          targetStats.co2Saved
        ),
        livesImpacted: Math.min(
          Math.round(prevStats.livesImpacted + incrementValues.livesImpacted),
          targetStats.livesImpacted
        ),
        activeDonors: Math.min(
          Math.round(prevStats.activeDonors + incrementValues.activeDonors),
          targetStats.activeDonors
        ),
        foodWastePrevented: Math.min(
          Math.round(prevStats.foodWastePrevented + incrementValues.foodWastePrevented),
          targetStats.foodWastePrevented
        )
      }));

      currentStep++;
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-8 text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Community Impact</h2>
        <p className="text-red-100">Together, we're making a difference</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-red-400/20 p-3 rounded-lg">
              <Heart className="w-8 h-8" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.totalMealsDonated.toLocaleString()}</p>
              <p className="text-red-100">Meals Donated</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-red-400/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-1000 ease-out"
              style={{ width: `${(stats.totalMealsDonated / targetStats.totalMealsDonated) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-green-400/20 p-3 rounded-lg">
              <Leaf className="w-8 h-8" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.co2Saved.toLocaleString()}</p>
              <p className="text-red-100">kg CO₂ Saved</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-green-400/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-1000 ease-out"
              style={{ width: `${(stats.co2Saved / targetStats.co2Saved) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-400/20 p-3 rounded-lg">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.sheltersHelped.toLocaleString()}</p>
              <p className="text-red-100">Shelters Helped</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-blue-400/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-1000 ease-out"
              style={{ width: `${(stats.sheltersHelped / targetStats.sheltersHelped) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-400/20 p-3 rounded-lg">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.livesImpacted.toLocaleString()}</p>
              <p className="text-red-100">Lives Impacted</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-purple-400/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-1000 ease-out"
              style={{ width: `${(stats.livesImpacted / targetStats.livesImpacted) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-400/20 p-3 rounded-lg">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.activeDonors.toLocaleString()}</p>
              <p className="text-red-100">Active Donors</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-yellow-400/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-1000 ease-out"
              style={{ width: `${(stats.activeDonors / targetStats.activeDonors) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-400/20 p-3 rounded-lg">
              <Scale className="w-8 h-8" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.foodWastePrevented.toLocaleString()}</p>
              <p className="text-red-100">kg Food Waste Prevented</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-orange-400/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-1000 ease-out"
              style={{ width: `${(stats.foodWastePrevented / targetStats.foodWastePrevented) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};