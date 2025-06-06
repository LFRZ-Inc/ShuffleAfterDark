'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Play, 
  Heart, 
  Bookmark, 
  Share, 
  Flag, 
  Download, 
  Star,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  User
} from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface SceneData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  rating: number;
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  tags: string[];
  creator: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    contentCount: number;
  };
  ageRating: string;
  isNSFW: boolean;
  isPremium: boolean;
  createdAt: string;
  contentWarnings: string[];
}

export default function ScenePage() {
  const params = useParams();
  const { isXXXEnabled, ageVerified, user } = useApp();
  const [scene, setScene] = useState<SceneData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Mock scene data - in real app this would come from API
  const mockScene: SceneData = {
    id: params.id as string,
    title: 'Romantic Sunset Intimacy',
    description: 'A beautiful and intimate scene featuring real couples sharing tender moments during golden hour. This artistic piece focuses on emotional connection and natural beauty.',
    videoUrl: '/placeholder-video.mp4',
    thumbnailUrl: '/placeholder-romantic.jpg',
    duration: '12:34',
    rating: 4.8,
    viewCount: 15420,
    likeCount: 1234,
    dislikeCount: 45,
    tags: ['romantic', 'couples', 'intimate', 'artistic', 'golden-hour'],
    creator: {
      id: 'creator-1',
      name: 'Artistic Expressions',
      avatar: '/placeholder-avatar.jpg',
      verified: true,
      contentCount: 127,
    },
    ageRating: '18+',
    isNSFW: false,
    isPremium: false,
    createdAt: '2024-01-15',
    contentWarnings: ['Adult Content', 'Nudity'],
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setScene(mockScene);
      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  const handlePlay = () => {
    setIsPlaying(true);
    // In real app, this would start video playback
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // In real app, this would update user preferences
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In real app, this would save to user's favorites
  };

  const handleReport = () => {
    setShowReportModal(true);
  };

  const handleDownload = () => {
    // In real app, this would initiate download for premium users
    console.log('Download initiated');
  };

  if (!ageVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Age verification required</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="aspect-video bg-dark-700 rounded-lg"></div>
            <div className="h-8 bg-dark-700 rounded w-3/4"></div>
            <div className="h-4 bg-dark-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!scene || (scene.isNSFW && !isXXXEnabled)) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Content Not Available</h1>
          <p className="text-gray-400">
            {scene?.isNSFW && !isXXXEnabled 
              ? 'This content requires XXX mode to be enabled.'
              : 'The requested content could not be found.'
            }
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Video Player */}
          <div className="mb-8">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              {!isPlaying ? (
                <div className="relative w-full h-full">
                  <div className="w-full h-full bg-gradient-to-br from-primary-600/20 to-primary-800/20 flex items-center justify-center">
                    <button
                      onClick={handlePlay}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6 transition-all duration-200"
                    >
                      <Play className="w-16 h-16 text-white" />
                    </button>
                  </div>
                  
                  {/* Content Warnings */}
                  {scene.contentWarnings.length > 0 && (
                    <div className="absolute top-4 left-4 space-y-2">
                      {scene.contentWarnings.map((warning) => (
                        <div key={warning} className="bg-red-600 text-white text-sm px-3 py-1 rounded">
                          {warning}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Duration */}
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded">
                    {scene.duration}
                  </div>

                  {/* Age Rating */}
                  <div className="absolute top-4 right-4 bg-black/80 text-white text-sm px-3 py-1 rounded">
                    {scene.ageRating}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <p className="text-white">Video Player Placeholder</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Actions */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{scene.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{scene.viewCount.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{scene.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{scene.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{scene.likeCount}</span>
                  </button>

                  <button
                    onClick={handleSave}
                    className={`p-2 rounded-lg transition-colors ${
                      isSaved ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button className="p-2 bg-dark-700 text-gray-300 hover:bg-dark-600 rounded-lg transition-colors">
                    <Share className="w-4 h-4" />
                  </button>

                  {user && (
                    <button
                      onClick={handleDownload}
                      className="p-2 bg-dark-700 text-gray-300 hover:bg-dark-600 rounded-lg transition-colors"
                      title="Download (Premium)"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={handleReport}
                    className="p-2 bg-dark-700 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="card">
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-gray-300 leading-relaxed">{scene.description}</p>
              </div>

              {/* Tags */}
              <div className="card">
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {scene.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-dark-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-primary-600 hover:text-white transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Creator Info */}
              <div className="card">
                <h3 className="font-semibold mb-4">Creator</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{scene.creator.name}</h4>
                      {scene.creator.verified && (
                        <div className="w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{scene.creator.contentCount} videos</p>
                  </div>
                </div>
                <button className="btn-primary w-full">Follow Creator</button>
              </div>

              {/* Scene Info */}
              <div className="card">
                <h3 className="font-semibold mb-4">Scene Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Published:</span>
                    <span>{new Date(scene.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span>{scene.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating:</span>
                    <span>{scene.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Views:</span>
                    <span>{scene.viewCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span>{scene.isPremium ? 'Premium' : 'Free'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Report Content</h3>
            <div className="space-y-3">
              {[
                'Inappropriate Content',
                'Copyright Violation',
                'Spam',
                'Harassment',
                'Underage Content',
                'Non-consensual',
                'Other'
              ].map((reason) => (
                <label key={reason} className="flex items-center space-x-3">
                  <input type="radio" name="report-reason" className="text-primary-600" />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <textarea
                placeholder="Additional details (optional)"
                className="input-field w-full h-24 resize-none"
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowReportModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  // Handle report submission
                }}
                className="btn-danger flex-1"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
} 