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
  User,
  ExternalLink
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface SceneData {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_sfw_url: string | null;
  thumbnail_nsfw_url: string | null;
  duration: number;
  tags: string[] | null;
  creator_id: string | null;
  license_url: string | null;
  license_verified: boolean | null;
  content_warnings: string[] | null;
  age_rating: string | null;
  is_nsfw: boolean | null;
  is_premium: boolean | null;
  is_active: boolean | null;
  view_count: number | null;
  like_count: number | null;
  dislike_count: number | null;
  rating: number | null;
  published_at: string | null;
  created_at: string | null;
  creator?: {
    id: string;
    name: string;
    bio: string | null;
    is_verified: boolean | null;
    content_count: number | null;
  } | null;
}

export default function ScenePage() {
  const params = useParams();
  const { isXXXEnabled, safeMode, ageVerified, user } = useApp();
  const [scene, setScene] = useState<SceneData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');

  const loadScene = async () => {
    try {
      const sceneId = Array.isArray(params.id) ? params.id[0] : params.id;
      
      const { data, error } = await supabase
        .from('scenes_nsfw')
        .select(`
          *,
          creator:creators(
            id,
            name,
            bio,
            is_verified,
            content_count
          )
        `)
        .eq('id', sceneId)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      
      // Check if content should be blocked in safe mode
      if (safeMode && data.is_nsfw) {
        setScene(null);
      } else {
        setScene(data);
        
        // Record view
        await supabase
          .from('user_interactions')
          .insert([{
            scene_id: data.id,
            interaction_type: 'view'
          }]);
      }
    } catch (error) {
      console.error('Error loading scene:', error);
      setScene(null);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getThumbnail = () => {
    if (!scene) return null;
    if (safeMode || !scene.is_nsfw) {
      return scene.thumbnail_sfw_url;
    }
    return scene.thumbnail_nsfw_url || scene.thumbnail_sfw_url;
  };

  const handlePlay = () => {
    setIsPlaying(true);
    
    // If it's an external link, open in new tab
    if (scene?.video_url.startsWith('http')) {
      window.open(scene.video_url, '_blank');
    }
  };

  // Check if the video_url is actually an image
  const isImage = scene?.video_url.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  const isExternalVideo = scene?.video_url.startsWith('http');

  const handleLike = async () => {
    if (!scene) return;
    
    try {
      await supabase
        .from('user_interactions')
        .insert([{
          scene_id: scene.id,
          interaction_type: 'like'
        }]);
      
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error liking scene:', error);
    }
  };

  const handleSave = async () => {
    if (!scene) return;
    
    try {
      await supabase
        .from('user_interactions')
        .insert([{
          scene_id: scene.id,
          interaction_type: 'favorite'
        }]);
      
      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Error saving scene:', error);
    }
  };

  const handleReport = () => {
    setShowReportModal(true);
  };

  const submitReport = async () => {
    if (!scene || !reportReason) return;
    
    try {
      await supabase
        .from('content_reports')
        .insert([{
          scene_id: scene.id,
          report_type: reportReason,
          description: reportDetails,
          status: 'pending'
        }]);
      
      setShowReportModal(false);
      setReportReason('');
      setReportDetails('');
      
      // Show success message (you could add a toast notification here)
      alert('Report submitted successfully. Thank you for helping keep our platform safe.');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting report. Please try again.');
    }
  };

  const handleDownload = () => {
    // In real app, this would initiate download for premium users
    console.log('Download initiated');
  };

  useEffect(() => {
    if (ageVerified && params.id) {
      loadScene();
    }
  }, [params.id, ageVerified, safeMode]);

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

  if (!scene) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Content Not Available</h1>
          <p className="text-gray-400 mb-4">
            {safeMode 
              ? 'This content is not available in Safe Mode. Try enabling ShuffleXXX mode.'
              : 'The requested content could not be found.'
            }
          </p>
          <Link href="/browse" className="btn-primary">
            Browse Other Content
          </Link>
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
          {/* Media Player/Viewer */}
          <div className="mb-8">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              {isImage ? (
                /* Image Display */
                <div className="relative w-full h-full">
                  <img 
                    src={scene.video_url} 
                    alt={scene.title}
                    className={`scene-image w-full h-full object-cover ${safeMode && scene.is_nsfw ? 'safe-mode' : 'full-mode'}`}
                  />
                  
                  {/* Safe mode overlay for NSFW images */}
                  {safeMode && scene.is_nsfw && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-center">
                        <div className="text-2xl mb-2">🔒</div>
                        <div className="text-sm">Safe Mode Active</div>
                        <div className="text-xs text-gray-300 mt-1">Enable Full Experience to view</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-4 bg-black/80 text-white text-sm px-3 py-1 rounded flex items-center space-x-1">
                    <span>📷</span>
                    <span>Image</span>
                  </div>
                </div>
              ) : !isPlaying ? (
                /* Video Thumbnail with Play Button */
                <div className="relative w-full h-full">
                  {getThumbnail() ? (
                    <img 
                      src={getThumbnail()!} 
                      alt={scene.title}
                      className={`scene-image w-full h-full object-cover ${safeMode && scene.is_nsfw ? 'safe-mode' : 'full-mode'}`}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-600/20 to-primary-800/20 flex items-center justify-center">
                      <Play className="w-16 h-16 text-white/60" />
                    </div>
                  )}
                  
                  {/* Safe mode overlay for NSFW video thumbnails */}
                  {safeMode && scene.is_nsfw && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-center">
                        <div className="text-2xl mb-2">🔒</div>
                        <div className="text-sm">Safe Mode Active</div>
                        <div className="text-xs text-gray-300 mt-1">Enable Full Experience to view</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button
                      onClick={handlePlay}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6 transition-all duration-200 flex items-center space-x-3"
                    >
                      <Play className="w-16 h-16 text-white" />
                      {isExternalVideo && <ExternalLink className="w-6 h-6 text-white" />}
                    </button>
                  </div>
                </div>
              ) : (
                /* Video Player */
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <p className="text-white">Video Player Placeholder</p>
                </div>
              )}
              
              {/* Content Warnings */}
              {scene.content_warnings && scene.content_warnings.length > 0 && (
                <div className="absolute top-4 left-4 space-y-2">
                  {scene.content_warnings.map((warning) => (
                    <div key={warning} className="bg-red-600 text-white text-sm px-3 py-1 rounded">
                      {warning}
                    </div>
                  ))}
                </div>
              )}

              {/* Duration (only for videos) */}
              {!isImage && (
                <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded">
                  {formatDuration(scene.duration)}
                </div>
              )}

              {/* Age Rating */}
              {scene.age_rating && (
                <div className="absolute top-4 right-4 bg-black/80 text-white text-sm px-3 py-1 rounded">
                  {scene.age_rating}
                </div>
              )}

              {/* NSFW indicator */}
              {scene.is_nsfw && !safeMode && (
                <div className="absolute top-16 right-4 bg-red-600 text-white text-sm px-3 py-1 rounded">
                  XXX
                </div>
              )}

              {/* Premium indicator */}
              {scene.is_premium && (
                <div className="absolute top-4 left-4 bg-yellow-600 text-white text-sm px-3 py-1 rounded">
                  Premium
                </div>
              )}

              {/* External link indicator */}
              {isExternalVideo && (
                <div className="absolute bottom-4 left-4 bg-blue-600 text-white text-sm px-3 py-1 rounded flex items-center space-x-1">
                  <ExternalLink className="w-3 h-3" />
                  <span>External Link</span>
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
                      <span>{scene.view_count ? scene.view_count.toLocaleString() : 0} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(scene.duration)}</span>
                    </div>
                    {scene.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{scene.rating.toFixed(1)}</span>
                      </div>
                    )}
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
                    <span>{scene.like_count || 0}</span>
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

                  {user && scene.is_premium && (
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
                <p className="text-gray-300 leading-relaxed">
                  {scene.description || 'No description available.'}
                </p>
              </div>

              {/* Tags */}
              {scene.tags && scene.tags.length > 0 && (
                <div className="card">
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {scene.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/browse?tag=${encodeURIComponent(tag)}`}
                        className="bg-dark-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-primary-600 hover:text-white transition-colors cursor-pointer"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* License Information */}
              {scene.license_url && (
                <div className="card">
                  <h3 className="font-semibold mb-3">License & Attribution</h3>
                  <div className="license-attribution">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-sm text-gray-300 mb-2">
                          <strong>"{scene.title}"</strong> by{' '}
                          <strong>{scene.creator?.name || 'Unknown Creator'}</strong>
                        </p>
                        <p className="text-xs text-gray-400">
                          This content is licensed and verified for distribution.
                          {scene.license_verified && (
                            <span className="text-green-400 ml-2">✓ License Verified</span>
                          )}
                        </p>
                      </div>
                      <a
                        href={scene.license_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm ml-4"
                      >
                        View License
                      </a>
                    </div>
                    
                    {/* License details */}
                    <div className="text-xs text-gray-500 border-t border-dark-600 pt-3">
                      <p>
                        Original source:{' '}
                        <a 
                          href={scene.license_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          {scene.license_url.includes('wikimedia') ? 'Wikimedia Commons' : 'View Source'}
                        </a>
                      </p>
                      {scene.published_at && (
                        <p className="mt-1">
                          Published: {new Date(scene.published_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Creator Info */}
              {scene.creator && (
                <div className="card">
                  <h3 className="font-semibold mb-4">Creator</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{scene.creator.name}</h4>
                        {scene.creator.is_verified && (
                          <div className="w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {scene.creator.content_count || 0} videos
                      </p>
                    </div>
                  </div>
                  {scene.creator.bio && (
                    <p className="text-sm text-gray-400 mb-4">{scene.creator.bio}</p>
                  )}
                  <Link href={`/creator/${scene.creator.id}`} className="btn-primary w-full">
                    View Creator Profile
                  </Link>
                </div>
              )}

              {/* Scene Info */}
              <div className="card">
                <h3 className="font-semibold mb-4">Scene Information</h3>
                <div className="space-y-3 text-sm">
                  {scene.published_at && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Published:</span>
                      <span>{new Date(scene.published_at).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span>{formatDuration(scene.duration)}</span>
                  </div>
                  {scene.rating && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rating:</span>
                      <span>{scene.rating.toFixed(1)}/5</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Views:</span>
                    <span>{scene.view_count ? scene.view_count.toLocaleString() : 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span>{scene.is_premium ? 'Premium' : 'Free'}</span>
                  </div>
                  {scene.age_rating && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Age Rating:</span>
                      <span>{scene.age_rating}</span>
                    </div>
                  )}
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
                  <input 
                    type="radio" 
                    name="report-reason" 
                    value={reason}
                    checked={reportReason === reason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="text-primary-600" 
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <textarea
                placeholder="Additional details (optional)"
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                className="input-field w-full h-24 resize-none"
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportReason('');
                  setReportDetails('');
                }}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={submitReport}
                disabled={!reportReason}
                className="btn-danger flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
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