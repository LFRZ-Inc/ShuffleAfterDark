'use client';

import { useApp } from '@/context/AppContext';
import { Heart, Palette, Users, User, Rainbow, Flame } from 'lucide-react';

export default function MoodSelector() {
  const { isXXXEnabled } = useApp();

  const moods = [
    {
      id: 'romantic',
      name: 'Romantic',
      description: 'Intimate and loving content',
      icon: Heart,
      color: 'from-pink-500 to-red-500',
      isNSFW: false,
    },
    {
      id: 'artistic',
      name: 'Artistic',
      description: 'Beautiful and creative expression',
      icon: Palette,
      color: 'from-purple-500 to-indigo-500',
      isNSFW: false,
    },
    {
      id: 'couples',
      name: 'Couples',
      description: 'Content for partners',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      isNSFW: false,
    },
    {
      id: 'solo',
      name: 'Solo',
      description: 'Individual performances',
      icon: User,
      color: 'from-green-500 to-emerald-500',
      isNSFW: false,
    },
    {
      id: 'lgbtq',
      name: 'LGBTQ+',
      description: 'Diverse and inclusive content',
      icon: Rainbow,
      color: 'from-yellow-500 to-orange-500',
      isNSFW: false,
    },
    {
      id: 'nsfw',
      name: 'NSFW',
      description: 'Explicit adult content',
      icon: Flame,
      color: 'from-red-600 to-pink-600',
      isNSFW: true,
    },
  ];

  const availableMoods = moods.filter(mood => 
    isXXXEnabled || !mood.isNSFW
  );

  const handleMoodClick = (moodId: string) => {
    // In a real app, this would navigate to shuffle with mood filter
    console.log('Selected mood:', moodId);
  };

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Shuffle by Mood</h2>
        <p className="text-gray-400">
          Choose your desired mood and let our algorithm find the perfect content
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {availableMoods.map((mood) => {
          const IconComponent = mood.icon;
          return (
            <button
              key={mood.id}
              onClick={() => handleMoodClick(mood.id)}
              className="group relative overflow-hidden rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
              
              {/* Content */}
              <div className="relative z-10">
                <IconComponent className="w-8 h-8 mx-auto mb-3 text-white" />
                <h3 className="font-semibold text-white mb-1">{mood.name}</h3>
                <p className="text-xs text-gray-300 opacity-80">{mood.description}</p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-xl transition-colors" />
            </button>
          );
        })}
      </div>

      {/* XXX Mode disabled message */}
      {!isXXXEnabled && (
        <div className="text-center p-6 bg-dark-800/50 rounded-lg border border-dark-700">
          <p className="text-gray-400 mb-2">
            Some mood categories are hidden in safe mode
          </p>
          <p className="text-sm text-gray-500">
            Enable XXX mode to access all content categories
          </p>
        </div>
      )}
    </section>
  );
} 