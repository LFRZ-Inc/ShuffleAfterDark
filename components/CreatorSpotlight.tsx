'use client';

import { Star, ExternalLink } from 'lucide-react';

export default function CreatorSpotlight() {
  const featuredCreators = [
    {
      id: '1',
      name: 'Artistic Expressions',
      bio: 'Creating beautiful and intimate content for couples',
      avatar: '/placeholder-creator1.jpg',
      contentCount: 45,
      rating: 4.9,
      verified: true,
    },
    {
      id: '2',
      name: 'Romantic Studios',
      bio: 'Professional romantic and sensual content',
      avatar: '/placeholder-creator2.jpg',
      contentCount: 78,
      rating: 4.8,
      verified: true,
    },
    {
      id: '3',
      name: 'Indie Creator',
      bio: 'Independent artist focusing on authentic experiences',
      avatar: '/placeholder-creator3.jpg',
      contentCount: 23,
      rating: 4.7,
      verified: false,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Creator Spotlight</h2>
        <button className="text-primary-400 hover:text-primary-300 transition-colors">
          View All Creators
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredCreators.map((creator) => (
          <div
            key={creator.id}
            className="card group cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600/20 to-primary-800/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-400">
                  {creator.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">{creator.name}</h3>
                  {creator.verified && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-400">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{creator.rating}</span>
                  <span>•</span>
                  <span>{creator.contentCount} videos</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4">{creator.bio}</p>

            <div className="flex items-center justify-between">
              <button className="btn-secondary text-sm">
                View Profile
              </button>
              <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 