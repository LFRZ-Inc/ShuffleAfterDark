'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Filter, Grid, List, Play, Heart, Bookmark } from 'lucide-react';

// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic';

interface BrowseScene {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  rating: number;
  tags: string[];
  creator: string;
  isNSFW: boolean;
  viewCount: number;
}

export default function BrowsePage() {
  const { isXXXEnabled, ageVerified } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - in real app this would come from API
  const mockScenes: BrowseScene[] = [
    {
      id: '1',
      title: 'Romantic Sunset',
      description: 'A beautiful and intimate scene perfect for couples',
      thumbnail: '/placeholder-romantic.jpg',
      duration: '12:34',
      rating: 4.8,
      tags: ['romantic', 'couples', 'intimate'],
      creator: 'Artistic Expressions',
      isNSFW: false,
      viewCount: 15420,
    },
    {
      id: '2',
      title: 'Artistic Expression',
      description: 'Creative and sensual artistic content',
      thumbnail: '/placeholder-artistic.jpg',
      duration: '8:45',
      rating: 4.6,
      tags: ['artistic', 'creative', 'sensual'],
      creator: 'Creative Studios',
      isNSFW: false,
      viewCount: 9876,
    },
    {
      id: '3',
      title: 'XXX Premium Scene',
      description: 'Explicit premium adult content',
      thumbnail: '/placeholder-xxx.jpg',
      duration: '15:20',
      rating: 4.9,
      tags: ['explicit', 'premium', 'hardcore'],
      creator: 'Premium Creator',
      isNSFW: true,
      viewCount: 23456,
    },
    {
      id: '4',
      title: 'Couples Intimacy',
      description: 'Real couples sharing intimate moments',
      thumbnail: '/placeholder-couples.jpg',
      duration: '18:12',
      rating: 4.7,
      tags: ['couples', 'real', 'intimate'],
      creator: 'Real Couples',
      isNSFW: false,
      viewCount: 12345,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Content', nsfw: false },
    { id: 'romantic', name: 'Romantic', nsfw: false },
    { id: 'artistic', name: 'Artistic', nsfw: false },
    { id: 'couples', name: 'Couples', nsfw: false },
    { id: 'explicit', name: 'Explicit', nsfw: true },
    { id: 'premium', name: 'Premium', nsfw: true },
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'recent', name: 'Most Recent' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'duration', name: 'Duration' },
  ];

  // Filter content based on XXX mode and search
  const filteredScenes = mockScenes.filter(scene => {
    const matchesXXXMode = isXXXEnabled || !scene.isNSFW;
    const matchesSearch = searchQuery === '' || 
      scene.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scene.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scene.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || 
      scene.tags.includes(selectedCategory);
    
    return matchesXXXMode && matchesSearch && matchesCategory;
  });

  const availableCategories = categories.filter(cat => 
    isXXXEnabled || !cat.nsfw
  );

  if (!ageVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Age verification required</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-neon-gradient bg-clip-text text-transparent">
            Browse Content
          </h1>
          <p className="text-gray-400">
            Explore our curated collection of {isXXXEnabled ? 'adult' : 'romantic'} content
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search content, creators, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full pl-10"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Categories */}
            <div className="flex items-center space-x-2">
              {availableCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>

            {/* View Mode */}
            <div className="flex items-center space-x-1 bg-dark-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="card">
              <h3 className="font-semibold mb-4">Advanced Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <select className="input-field w-full">
                    <option value="">Any Duration</option>
                    <option value="short">Short (0-10 min)</option>
                    <option value="medium">Medium (10-20 min)</option>
                    <option value="long">Long (20+ min)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <select className="input-field w-full">
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Creator</label>
                  <select className="input-field w-full">
                    <option value="">Any Creator</option>
                    <option value="verified">Verified Only</option>
                    <option value="indie">Independent</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredScenes.length} results
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Content Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredScenes.map((scene) => (
              <div
                key={scene.id}
                className="card group cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <div className="relative aspect-video bg-dark-700 rounded-lg overflow-hidden mb-4">
                  <div className="w-full h-full bg-gradient-to-br from-primary-600/20 to-primary-800/20 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white/60" />
                  </div>
                  
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {scene.duration}
                  </div>

                  {scene.isNSFW && isXXXEnabled && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      XXX
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="btn-primary">
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{scene.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{scene.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span>{scene.rating}</span>
                    </div>
                    <span className="text-gray-500">{scene.viewCount.toLocaleString()} views</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">By {scene.creator}</span>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 hover:bg-dark-700 rounded transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-dark-700 rounded transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredScenes.map((scene) => (
              <div key={scene.id} className="card">
                <div className="flex items-center space-x-4">
                  <div className="relative w-32 h-20 bg-dark-700 rounded-lg overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-primary-600/20 to-primary-800/20 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white/60" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                      {scene.duration}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{scene.title}</h3>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">{scene.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>By {scene.creator}</span>
                      <span>★ {scene.rating}</span>
                      <span>{scene.viewCount.toLocaleString()} views</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="btn-primary">Watch</button>
                    <button className="p-2 hover:bg-dark-700 rounded transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-dark-700 rounded transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredScenes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No content found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More */}
        {filteredScenes.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Load More Content
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
} 