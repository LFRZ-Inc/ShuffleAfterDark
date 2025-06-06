'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Play, Heart, Bookmark, SkipForward, ThumbsUp, ThumbsDown, Share } from 'lucide-react';

// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic';

interface ShuffledScene {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  rating: number;
  tags: string[];
  creator: string;
  isNSFW: boolean;
}

export default function ShufflePage() {
  const { isXXXEnabled, ageVerified } = useApp();
  const [currentScene, setCurrentScene] = useState<ShuffledScene | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shuffleHistory, setShuffleHistory] = useState<string[]>([]);

  // Mock shuffle data - in real app this would come from API
  const mockScenes: ShuffledScene[] = [
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
    },
  ];

  const shuffleScene = () => {
    setIsLoading(true);
    
    // Filter scenes based on XXX mode
    const availableScenes = mockScenes.filter(scene => 
      isXXXEnabled || !scene.isNSFW
    );

    // Exclude recently viewed scenes
    const unviewedScenes = availableScenes.filter(scene => 
      !shuffleHistory.includes(scene.id)
    );

    // If all scenes have been viewed, reset history
    const scenesToChooseFrom = unviewedScenes.length > 0 ? unviewedScenes : availableScenes;

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

  const handleLike = () => {
    console.log('Liked scene:', currentScene?.id);
    // In real app, this would update user preferences
  };

  const handleDislike = () => {
    console.log('Disliked scene:', currentScene?.id);
    // In real app, this would update user preferences and shuffle again
    shuffleScene();
  };

  const handleSave = () => {
    console.log('Saved scene:', currentScene?.id);
    // In real app, this would save to user's favorites
  };

  const handleWatch = () => {
    console.log('Watching scene:', currentScene?.id);
    // In real app, this would navigate to the scene detail page or open video player
  };

  useEffect(() => {
    if (ageVerified) {
      shuffleScene();
    }
  }, [ageVerified, isXXXEnabled]);

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
              Let our algorithm find the perfect content for you
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
                  <div className="w-full h-full bg-gradient-to-br from-primary-600/20 to-primary-800/20 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white/60" />
                  </div>
                  
                  {/* Duration */}
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-3 py-1 rounded">
                    {currentScene.duration}
                  </div>

                  {/* NSFW indicator */}
                  {currentScene.isNSFW && isXXXEnabled && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded">
                      XXX
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
                    <p className="text-gray-400">{currentScene.description}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>By {currentScene.creator}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span>{currentScene.rating}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {currentScene.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-dark-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
                      title="Dislike"
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
                    <button className="p-3 hover:bg-dark-700 rounded-lg transition-colors" title="Share">
                      <Share className="w-5 h-5" />
                    </button>
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
                <p className="text-gray-400 mb-4">No content available</p>
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
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 