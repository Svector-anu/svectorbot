import React, { useState, useEffect } from 'react';
import { Zap, Star, Trophy, Rocket } from 'lucide-react';

export default function TapToEarn() {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const [energy, setEnergy] = useState(100);
  const [achievements, setAchievements] = useState([]);

  const handleTap = () => {
    if (energy > 0) {
      const earnedPoints = 1 * multiplier;
      setPoints(prev => prev + earnedPoints);
      setEnergy(prev => Math.max(0, prev - 5));

      if (points + earnedPoints >= level * 100) {
        setLevel(prev => prev + 1);
        setMultiplier(prev => prev + 0.5);
      }
    }
  };

  useEffect(() => {
    const energyTimer = setInterval(() => {
      setEnergy(prev => Math.min(100, prev + 10));
    }, 5000);

    return () => clearInterval(energyTimer);
  }, []);

  useEffect(() => {
    const checkAchievements = () => {
      const possibleAchievements = [
        { name: 'First Tapper', threshold: 10 },
        { name: 'Point Master', threshold: 100 },
        { name: 'Tap Champion', threshold: 500 }
      ];

      possibleAchievements.forEach(achievement => {
        if (points >= achievement.threshold && 
            !achievements.includes(achievement.name)) {
          setAchievements(prev => [...prev, achievement.name]);
        }
      });
    };

    checkAchievements();
  }, [points]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white 
                    flex flex-col items-center justify-center p-4 space-y-6 
                    relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 
        bg-[radial-gradient(#a3bffa_1px,transparent_1px)] 
        [background-size:16px_16px]"></div>

      {/* Stats Container */}
      <div className="relative z-10 w-full max-w-md 
        bg-white shadow-xl rounded-2xl border border-blue-100 p-6 text-center 
        transform transition-all hover:scale-105 hover:shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="text-blue-500" />
            <span className="text-xl font-bold text-blue-800">Level {level}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="text-yellow-500" />
            <span className="text-xl font-bold text-blue-800">{energy}%</span>
          </div>
        </div>

        <h1 className="text-5xl font-extrabold text-blue-800 mb-4">
          {points} Points
        </h1>
        <p className="text-blue-600">Multiplier: {multiplier}x</p>
      </div>

      {/* Tap Button */}
      <button 
        onClick={handleTap}
        disabled={energy === 0}
        className={`relative w-64 h-64 rounded-full 
                    ${energy > 0 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105' 
                      : 'bg-gray-300 cursor-not-allowed'}
                    transform transition-all duration-300 
                    flex items-center justify-center shadow-xl
                    focus:outline-none focus:ring-4 focus:ring-blue-300`}
      >
        <div className="absolute inset-0 rounded-full 
                        bg-blue-400/30 animate-ping"></div>
        <div className="relative z-10 flex flex-col items-center">
          <Rocket className="w-16 h-16 text-white mb-4" />
          <span className="text-2xl font-bold text-white">
            {energy > 0 ? 'TAP!' : 'Recharging'}
          </span>
        </div>
      </button>

      {/* Achievements */}
      <div className="w-full max-w-md bg-white 
                      shadow-md rounded-2xl p-4 text-center 
                      border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Achievements</h2>
        <div className="grid grid-cols-3 gap-2">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-blue-50 rounded-lg p-2 text-blue-800">
              <Star className="mx-auto mb-2 text-yellow-500" />
              <p className="text-sm">{achievement}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}