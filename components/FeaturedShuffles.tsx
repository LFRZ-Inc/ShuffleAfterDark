'use client';

import { useApp } from '@/context/AppContext';
import { Play, Heart, Bookmark } from 'lucide-react';

export default function FeaturedShuffles() {
  const { isXXXEnabled } = useApp();

  // Placeholder data - in real app this would come from API
  const featuredContent = [
    {
      id: '1',
      title: 'Romantic Evening',
      description: 'Intimate and artistic content for couples',
      thumbnail: '/placeholder-romantic.jpg',
      duration: '12:34',
      rating: 4.8,
      isNSFW: false,
    },
    {
      id: '2',
      title: 'Artistic Expression',
      description: 'Beautiful and sensual artistic content',
      thumbnail: '/placeholder-artistic.jpg',
      duration: '8:45',
      rating: 4.6,
      isNSFW: false,
    },
    {
      id: '3',
      title: 'XXX Premium Content',
      description: 'Explicit premium content',
      thumbnail: '/placeholder-xxx.jpg',
      duration: '15:20',
      rating: 4.9,
      isNSFW: true,
    },
  ];

  const filteredContent = featuredContent.filter(item => 
    isXXXEnabled || !item.isNSFW
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Today's Featured Shuffles</h2>
        <button className="text-primary-400 hover:text-primary-300 transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <div
            key={item.id}
            className="card group cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <div className="relative aspect-video bg-dark-700 rounded-lg overflow-hidden mb-4">
              {/* Placeholder thumbnail */}
              <div className="w-full h-full bg-gradient-to-br from-primary-600/20 to-primary-800/20 flex items-center justify-center">
                <Play className="w-12 h-12 text-white/60" />
              </div>
              
              {/* Duration badge */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {item.duration}
              </div>

              {/* NSFW indicator */}
              {item.isNSFW && isXXXEnabled && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  XXX
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="btn-primary">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Now
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm">{item.rating}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">
            {isXXXEnabled 
              ? 'No featured content available at the moment.' 
              : 'Enable XXX mode to see more featured content.'
            }
          </p>
        </div>
      )}
    </section>
  );
} 