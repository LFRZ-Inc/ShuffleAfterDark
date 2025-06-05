'use client';

import { useApp } from '@/context/AppContext';
import { TrendingUp } from 'lucide-react';

export default function TrendingTags() {
  const { isXXXEnabled } = useApp();

  const trendingTags = [
    { name: 'Romantic', count: 1234, isNSFW: false },
    { name: 'Artistic', count: 987, isNSFW: false },
    { name: 'Couples', count: 756, isNSFW: false },
    { name: 'Sensual', count: 654, isNSFW: false },
    { name: 'Intimate', count: 543, isNSFW: false },
    { name: 'Explicit', count: 432, isNSFW: true },
    { name: 'Hardcore', count: 321, isNSFW: true },
    { name: 'Fetish', count: 210, isNSFW: true },
  ];

  const filteredTags = trendingTags.filter(tag => 
    isXXXEnabled || !tag.isNSFW
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center space-x-2">
        <TrendingUp className="w-6 h-6 text-primary-400" />
        <h2 className="text-3xl font-bold">Trending Tags</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {filteredTags.map((tag) => (
          <button
            key={tag.name}
            className="group relative overflow-hidden bg-dark-700 hover:bg-dark-600 border border-dark-600 hover:border-primary-500 rounded-full px-4 py-2 transition-all duration-200"
          >
            <span className="text-white font-medium">{tag.name}</span>
            <span className="ml-2 text-xs text-gray-400">
              {tag.count.toLocaleString()}
            </span>
            {tag.isNSFW && isXXXEnabled && (
              <span className="ml-2 text-xs bg-red-600 text-white px-1 rounded">
                XXX
              </span>
            )}
          </button>
        ))}
      </div>

      {filteredTags.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No trending tags available</p>
        </div>
      )}
    </section>
  );
} 