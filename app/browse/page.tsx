'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Filter, Grid, List, Play, Heart, Bookmark } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic';

interface BrowseScene {
  id: string;
  title: string;
  description: string | null;
  thumbnail_sfw_url: string | null;
  thumbnail_nsfw_url: string | null;
  video_url: string;
  duration: number;
  tags: string[] | null;
  creator_id: string | null;
  is_nsfw: boolean | null;
  is_premium: boolean | null;
  rating: number | null;
  view_count: number | null;
  created_at?: string | null;
  creator?: {
    name: string;
  } | null;
}

export default function BrowsePage() {
  const { isXXXEnabled, safeMode, ageVerified } = useApp();
  const searchParams = useSearchParams();
  const [scenes, setScenes] = useState<BrowseScene[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [durationFilter, setDurationFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const categories = [
    { id: 'all', name: 'All Content', nsfw: false },
    { id: 'romantic', name: 'Romantic', nsfw: false },
    { id: 'artistic', name: 'Artistic', nsfw: false },
    { id: 'couples', name: 'Couples', nsfw: false },
    { id: 'softcore', name: 'Softcore', nsfw: false },
    { id: 'explicit', name: 'Explicit', nsfw: true },
    { id: 'premium', name: 'Premium', nsfw: true },
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'recent', name: 'Most Recent' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'duration', name: 'Duration' },
  ];

  const loadScenes = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('scenes_nsfw')
        .select(`
          *,
          creator:creators(name)
        `)
        .eq('is_active', true);

      // Apply SafeMode filter
      if (safeMode) {
        query = query.eq('is_nsfw', false);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      setScenes(data || []);
    } catch (error) {
      console.error('Error loading scenes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getThumbnail = (scene: BrowseScene) => {
    if (safeMode || !scene.is_nsfw) {
      return scene.thumbnail_sfw_url;
    }
    return scene.thumbnail_nsfw_url || scene.thumbnail_sfw_url;
  };

  // Filter and sort scenes
  const filteredScenes = scenes.filter(scene => {
    const matchesSearch = searchQuery === '' || 
      scene.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (scene.description && scene.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (scene.tags && scene.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = selectedCategory === 'all' || 
      (scene.tags && scene.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase())));
    
    const matchesTag = selectedTag === '' ||
      (scene.tags && scene.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()));

    const matchesDuration = durationFilter === '' || 
      (durationFilter === 'short' && scene.duration <= 600) ||
      (durationFilter === 'medium' && scene.duration > 600 && scene.duration <= 1200) ||
      (durationFilter === 'long' && scene.duration > 1200);

    const matchesRating = ratingFilter === '' ||
      (scene.rating && scene.rating >= parseFloat(ratingFilter));
    
    return matchesSearch && matchesCategory && matchesTag && matchesDuration && matchesRating;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.view_count || 0) - (a.view_count || 0);
      case 'recent':
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'duration':
        return b.duration - a.duration;
      default:
        return 0;
    }
  });

  const availableCategories = categories.filter(cat => 
    !safeMode || !cat.nsfw
  );

  const handleSceneClick = async (scene: BrowseScene) => {
    try {
      // Record view interaction
      await supabase
        .from('user_interactions')
        .insert([{
          scene_id: scene.id,
          interaction_type: 'view'
        }]);
    } catch (error) {
      console.error('Error recording view:', error);
    }

    // Navigate to scene or external link
    if (scene.video_url.startsWith('http')) {
      window.open(scene.video_url, '_blank');
    } else {
      window.location.href = `/scene/${scene.id}`;
    }
  };

  const handleLike = async (sceneId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await supabase
        .from('user_interactions')
        .insert([{
          scene_id: sceneId,
          interaction_type: 'like'
        }]);
    } catch (error) {
      console.error('Error liking scene:', error);
    }
  };

  const handleSave = async (sceneId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await supabase
        .from('user_interactions')
        .insert([{
          scene_id: sceneId,
          interaction_type: 'favorite'
        }]);
    } catch (error) {
      console.error('Error saving scene:', error);
    }
  };

  useEffect(() => {
    if (ageVerified) {
      loadScenes();
    }
  }, [ageVerified, safeMode]);

  // Update filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    
    if (category) setSelectedCategory(category);
    if (tag) setSelectedTag(tag);
    if (search) setSearchQuery(search);
  }, [searchParams]);

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
            Explore our curated collection of {safeMode ? 'romantic and artistic' : 'adult'} content
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
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedTag(''); // Clear tag filter when selecting category
                  }}
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
                  <select 
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="">Any Duration</option>
                    <option value="short">Short (0-10 min)</option>
                    <option value="medium">Medium (10-20 min)</option>
                    <option value="long">Long (20+ min)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <select 
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Content Type</label>
                  <select className="input-field w-full">
                    <option value="">All Types</option>
                    <option value="free">Free Content</option>
                    <option value="premium">Premium Content</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters */}
        {(selectedTag || selectedCategory !== 'all' || searchQuery) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-400">Active filters:</span>
            {selectedTag && (
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm flex items-center">
                Tag: {selectedTag}
                <button 
                  onClick={() => setSelectedTag('')}
                  className="ml-2 hover:bg-primary-700 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm flex items-center">
                Category: {selectedCategory}
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="ml-2 hover:bg-primary-700 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm flex items-center">
                Search: {searchQuery}
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-2 hover:bg-primary-700 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            {isLoading ? 'Loading...' : `Showing ${filteredScenes.length} results`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading content...</p>
          </div>
        ) : (
          <>
            {/* Content Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredScenes.map((scene) => (
                  <div
                    key={scene.id}
                    className="card group cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={() => handleSceneClick(scene)}
                  >
                    <div className="relative aspect-video bg-dark-700 rounded-lg overflow-hidden mb-4">
                      {getThumbnail(scene) ? (
                        <img 
                          src={getThumbnail(scene)!} 
                          alt={scene.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-600/20 to-primary-800/20 flex items-center justify-center">
                          <Play className="w-12 h-12 text-white/60" />
                        </div>
                      )}
                      
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {formatDuration(scene.duration)}
                      </div>

                      {scene.is_nsfw && !safeMode && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                          XXX
                        </div>
                      )}

                      {scene.is_premium && (
                        <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                          Premium
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
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {scene.description || 'No description available'}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          {scene.rating && (
                            <>
                              <span className="text-yellow-400">★</span>
                              <span>{scene.rating.toFixed(1)}</span>
                            </>
                          )}
                        </div>
                        <span className="text-gray-500">
                          {scene.view_count ? `${scene.view_count.toLocaleString()} views` : 'New'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          By {scene.creator?.name || 'Unknown Creator'}
                        </span>
                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={(e) => handleLike(scene.id, e)}
                            className="p-1 hover:bg-dark-700 rounded transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => handleSave(scene.id, e)}
                            className="p-1 hover:bg-dark-700 rounded transition-colors"
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Tags */}
                      {scene.tags && scene.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {scene.tags.slice(0, 3).map((tag) => (
                            <Link
                              key={tag}
                              href={`/browse?tag=${encodeURIComponent(tag)}`}
                              onClick={(e) => e.stopPropagation()}
                              className="bg-dark-700 hover:bg-primary-600 text-gray-300 px-2 py-1 rounded text-xs transition-colors"
                            >
                              {tag}
                            </Link>
                          ))}
                          {scene.tags.length > 3 && (
                            <span className="text-xs text-gray-500">+{scene.tags.length - 3} more</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredScenes.map((scene) => (
                  <div 
                    key={scene.id} 
                    className="card cursor-pointer hover:bg-dark-800 transition-colors"
                    onClick={() => handleSceneClick(scene)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative w-32 h-20 bg-dark-700 rounded-lg overflow-hidden flex-shrink-0">
                        {getThumbnail(scene) ? (
                          <img 
                            src={getThumbnail(scene)!} 
                            alt={scene.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-600/20 to-primary-800/20 flex items-center justify-center">
                            <Play className="w-6 h-6 text-white/60" />
                          </div>
                        )}
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                          {formatDuration(scene.duration)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">{scene.title}</h3>
                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                          {scene.description || 'No description available'}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>By {scene.creator?.name || 'Unknown Creator'}</span>
                          {scene.rating && <span>★ {scene.rating.toFixed(1)}</span>}
                          <span>{scene.view_count ? `${scene.view_count.toLocaleString()} views` : 'New'}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="btn-primary">Watch</button>
                        <button 
                          onClick={(e) => handleLike(scene.id, e)}
                          className="p-2 hover:bg-dark-700 rounded transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => handleSave(scene.id, e)}
                          className="p-2 hover:bg-dark-700 rounded transition-colors"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredScenes.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">
                  {safeMode 
                    ? "No safe content found matching your criteria. Try enabling ShuffleXXX mode for more content."
                    : "No content found matching your criteria"
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedTag('');
                    setDurationFilter('');
                    setRatingFilter('');
                  }}
                  className="btn-secondary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
} 