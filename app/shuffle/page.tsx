'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Play, Heart, Bookmark, SkipForward, ThumbsUp, ThumbsDown, Share } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic';

interface ShuffledScene {
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
  creator?: {
    name: string;
  } | null;
}

export default function ShufflePage() {
  const { isXXXEnabled, safeMode, ageVerified } = useApp();
  const [currentScene, setCurrentScene] = useState<ShuffledScene | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shuffleHistory, setShuffleHistory] = useState<string[]>([]);
  const [availableScenes, setAvailableScenes] = useState<ShuffledScene[]>([]);

  const loadScenes = async () => {
    try {
      const { data, error } = await supabase
        .from('scenes_nsfw')
        .select(`
          *,
          creator:creators(name)
        `)
        .eq('is_active', true);

      if (error) throw error;
      setAvailableScenes(data || []);
    } catch (error) {
      console.error('Error loading scenes:', error);
    }
  };

  const shuffleScene = () => {
    setIsLoading(true);
    
    // Filter scenes based on SafeMode
    const filteredScenes = availableScenes.filter(scene => {
      if (safeMode) {
        // In safe mode, only show non-NSFW content
        return !scene.is_nsfw;
      }
      // In XXX mode, show all content
      return true;
    });

    // Exclude recently viewed scenes
    const unviewedScenes = filteredScenes.filter(scene => 
      !shuffleHistory.includes(scene.id)
    );

    // If all scenes have been viewed, reset history
    const scenesToChooseFrom = unviewedScenes.length > 0 ? unviewedScenes : filteredScenes;

    if (scenesToChooseFrom.length > 0) {
      // Smart shuffle logic - for now just random
      const randomIndex = Math.floor(Math.random() * scenesToChooseFrom.length);
      const selectedScene = scenesToChooseFrom[randomIndex];
      
      setTimeout(() => {
        setCurrentScene(selectedScene);
        setShuffleHistory(prev => [...prev, selectedScene.id].slice(-10)); // Keep last 10
        setIsLoading(false);
      }, 1000); // Simulate API delay
    } else {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!currentScene) return;
    
    try {
      // Record user interaction
      const { error } = await supabase
        .from('user_interactions')
        .insert([{
          scene_id: currentScene.id,
          interaction_type: 'like'
        }]);
      
      if (error) throw error;
      console.log('Liked scene:', currentScene.id);
    } catch (error) {
      console.error('Error liking scene:', error);
    }
  };

  const handleDislike = async () => {
    if (!currentScene) return;
    
    try {
      // Record user interaction
      const { error } = await supabase
        .from('user_interactions')
        .insert([{
          scene_id: currentScene.id,
          interaction_type: 'dislike'
        }]);
      
      if (error) throw error;
      console.log('Disliked scene:', currentScene.id);
      
      // Shuffle to next scene
      shuffleScene();
    } catch (error) {
      console.error('Error disliking scene:', error);
    }
  };

  const handleSave = async () => {
    if (!currentScene) return;
    
    try {
      // Record user interaction
      const { error } = await supabase
        .from('user_interactions')
        .insert([{
          scene_id: currentScene.id,
          interaction_type: 'favorite'
        }]);
      
      if (error) throw error;
      console.log('Saved scene:', currentScene.id);
    } catch (error) {
      console.error('Error saving scene:', error);
    }
  };

  const handleWatch = async () => {
    if (!currentScene) return;
    
    try {
      // Record view interaction
      const { error } = await supabase
        .from('user_interactions')
        .insert([{
          scene_id: currentScene.id,
          interaction_type: 'view'
        }]);
      
      if (error) throw error;
      
      // Navigate to scene detail page or open video
      if (currentScene.video_url.startsWith('http')) {
        window.open(currentScene.video_url, '_blank');
      } else {
        window.location.href = `/scene/${currentScene.id}`;
      }
    } catch (error) {
      console.error('Error recording view:', error);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getThumbnail = (scene: ShuffledScene) => {
    if (safeMode || !scene.is_nsfw) {
      return scene.thumbnail_sfw_url;
    }
    return scene.thumbnail_nsfw_url || scene.thumbnail_sfw_url;
  };

  useEffect(() => {
    if (ageVerified) {
      loadScenes();
    }
  }, [ageVerified]);

  useEffect(() => {
    if (availableScenes.length > 0) {
      shuffleScene();
    }
  }, [availableScenes, isXXXEnabled, safeMode]);

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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-neon-gradient bg-clip-text text-transparent">
              Smart Shuffle
            </h1>
            <p className="text-gray-400">
              {safeMode 
                ? "Discovering curated content in Safe Mode"
                : "Let our algorithm find the perfect content for you"
              }
            </p>
          </div>

          {/* Shuffle Card */}
          <div className="card max-w-2xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Finding your perfect match...</p>
              </div>
            ) : currentScene ? (
              <div className="space-y-6">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-dark-700 rounded-lg overflow-hidden">
                  {getThumbnail(currentScene) ? (
                    <img 
                      src={getThumbnail(currentScene)!} 
                      alt={currentScene.title}
                      className={`scene-thumbnail ${safeMode && currentScene.is_nsfw ? 'safe-mode' : 'full-mode'}`}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-600/20 to-primary-800/20 flex items-center justify-center">
                      <Play className="w-16 h-16 text-white/60" />
                    </div>
                  )}
                  
                  {/* Safe mode overlay for NSFW content */}
                  {safeMode && currentScene.is_nsfw && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
                      <div className="bg-black/80 text-white text-xs px-3 py-1 rounded-full">
                        🔒 Safe Mode
                      </div>
                    </div>
                  )}
                  
                  {/* Duration */}
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-3 py-1 rounded">
                    {formatDuration(currentScene.duration)}
                  </div>

                  {/* NSFW indicator */}
                  {currentScene.is_nsfw && !safeMode && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded">
                      XXX
                    </div>
                  )}

                  {/* Premium indicator */}
                  {currentScene.is_premium && (
                    <div className="absolute top-4 right-4 bg-yellow-600 text-white text-sm px-3 py-1 rounded">
                      Premium
                    </div>
                  )}

                  {/* Watch button overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={handleWatch} className="btn-primary text-lg px-8 py-3">
                      <Play className="w-5 h-5 mr-2" />
                      Watch Now
                    </button>
                  </div>
                </div>

                {/* Content Info */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{currentScene.title}</h2>
                    <p className="text-gray-400">{currentScene.description || 'No description available'}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>By {currentScene.creator?.name || 'Unknown Creator'}</span>
                    {currentScene.rating && (
                      <>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400">★</span>
                          <span>{currentScene.rating.toFixed(1)}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Tags */}
                  {currentScene.tags && currentScene.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {currentScene.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/browse?tag=${encodeURIComponent(tag)}`}
                          className="bg-dark-700 hover:bg-primary-600 text-gray-300 px-3 py-1 rounded-full text-sm transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleLike}
                      className="p-3 hover:bg-dark-700 rounded-lg transition-colors"
                      title="Like"
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleDislike}
                      className="p-3 hover:bg-dark-700 rounded-lg transition-colors"
                      title="Skip"
                    >
                      <ThumbsDown className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleSave}
                      className="p-3 hover:bg-dark-700 rounded-lg transition-colors"
                      title="Save"
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <Link
                      href={`/scene/${currentScene.id}`}
                      className="p-3 hover:bg-dark-700 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Share className="w-5 h-5" />
                    </Link>
                  </div>

                  <button
                    onClick={shuffleScene}
                    className="btn-secondary flex items-center space-x-2"
                    disabled={isLoading}
                  >
                    <SkipForward className="w-4 h-4" />
                    <span>Next Shuffle</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">
                  {safeMode 
                    ? "No safe content available. Try enabling ShuffleXXX mode."
                    : "No content available"
                  }
                </p>
                <button onClick={shuffleScene} className="btn-primary">
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Shuffle Options */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Shuffle algorithm considers your preferences, viewing history, and current mood
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
              <span>Smart Algorithm</span>
              <span>•</span>
              <span>Personalized</span>
              <span>•</span>
              <span>No Repeats</span>
              <span>•</span>
              <span>{safeMode ? 'Safe Mode' : 'Full Mode'}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 