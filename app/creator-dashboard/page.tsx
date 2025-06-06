'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Upload, 
  Video, 
  Image, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle,
  Plus,
  Save,
  X
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface Creator {
  id: string;
  name: string;
  bio: string;
  website_url: string;
  contact_email: string;
  license_status: 'pending' | 'verified' | 'rejected';
  is_verified: boolean;
}

interface Scene {
  id: string;
  title: string;
  description: string;
  thumbnail_sfw_url: string;
  thumbnail_nsfw_url: string;
  video_url: string;
  tags: string[];
  duration: number;
  creator_id: string;
  license_url: string;
  license_verified: boolean;
  content_warnings: string[];
  age_rating: string;
  is_nsfw: boolean;
  is_premium: boolean;
  is_active: boolean;
  view_count: number;
  like_count: number;
  rating: number;
  creator?: Creator;
}

export default function CreatorDashboardPage() {
  const { ageVerified, user } = useApp();
  const [activeTab, setActiveTab] = useState('scenes');
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingScene, setEditingScene] = useState<Scene | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Form state for new scene
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail_sfw_url: '',
    thumbnail_nsfw_url: '',
    video_url: '',
    tags: '',
    duration: '',
    creator_id: '',
    license_url: '',
    license_verified: false,
    content_warnings: '',
    is_nsfw: false,
    is_premium: false,
  });

  useEffect(() => {
    checkAdminStatus();
    loadData();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      setIsAdmin(data?.role === 'admin');
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load scenes with creator info
      const { data: scenesData, error: scenesError } = await supabase
        .from('scenes_nsfw')
        .select(`
          *,
          creator:creators(*)
        `)
        .order('created_at', { ascending: false });

      if (scenesError) throw scenesError;
      setScenes(scenesData || []);

      // Load creators
      const { data: creatorsData, error: creatorsError } = await supabase
        .from('creators')
        .select('*')
        .order('name');

      if (creatorsError) throw creatorsError;
      setCreators(creatorsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const sceneData = {
        title: formData.title,
        description: formData.description,
        thumbnail_sfw_url: formData.thumbnail_sfw_url,
        thumbnail_nsfw_url: formData.thumbnail_nsfw_url,
        video_url: formData.video_url,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        duration: parseInt(formData.duration),
        creator_id: formData.creator_id || null,
        license_url: formData.license_url,
        license_verified: formData.license_verified,
        content_warnings: formData.content_warnings.split(',').map(w => w.trim()).filter(Boolean),
        is_nsfw: formData.is_nsfw,
        is_premium: formData.is_premium,
        is_active: true,
      };

      let error;
      if (editingScene) {
        const { error: updateError } = await supabase
          .from('scenes_nsfw')
          .update(sceneData)
          .eq('id', editingScene.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('scenes_nsfw')
          .insert([sceneData]);
        error = insertError;
      }

      if (error) throw error;

      // Reset form and reload data
      setFormData({
        title: '',
        description: '',
        thumbnail_sfw_url: '',
        thumbnail_nsfw_url: '',
        video_url: '',
        tags: '',
        duration: '',
        creator_id: '',
        license_url: '',
        license_verified: false,
        content_warnings: '',
        is_nsfw: false,
        is_premium: false,
      });
      setShowUploadForm(false);
      setEditingScene(null);
      loadData();
    } catch (error) {
      console.error('Error saving scene:', error);
      alert('Error saving scene. Please try again.');
    }
  };

  const handleEdit = (scene: Scene) => {
    setEditingScene(scene);
    setFormData({
      title: scene.title,
      description: scene.description || '',
      thumbnail_sfw_url: scene.thumbnail_sfw_url || '',
      thumbnail_nsfw_url: scene.thumbnail_nsfw_url || '',
      video_url: scene.video_url,
      tags: scene.tags.join(', '),
      duration: scene.duration.toString(),
      creator_id: scene.creator_id || '',
      license_url: scene.license_url || '',
      license_verified: scene.license_verified,
      content_warnings: scene.content_warnings.join(', '),
      is_nsfw: scene.is_nsfw,
      is_premium: scene.is_premium,
    });
    setShowUploadForm(true);
  };

  const handleDelete = async (sceneId: string) => {
    if (!confirm('Are you sure you want to delete this scene?')) return;
    
    try {
      const { error } = await supabase
        .from('scenes_nsfw')
        .update({ is_active: false })
        .eq('id', sceneId);
      
      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Error deleting scene:', error);
      alert('Error deleting scene. Please try again.');
    }
  };

  const toggleActive = async (sceneId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('scenes_nsfw')
        .update({ is_active: !currentStatus })
        .eq('id', sceneId);
      
      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Error toggling scene status:', error);
    }
  };

  if (!ageVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Age verification required</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">Please sign in to access the creator dashboard.</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">You need admin privileges to access this page.</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-dark-700 rounded w-1/4"></div>
            <div className="h-64 bg-dark-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold bg-neon-gradient bg-clip-text text-transparent">
              Creator Dashboard
            </h1>
            <button
              onClick={() => {
                setShowUploadForm(true);
                setEditingScene(null);
                setFormData({
                  title: '',
                  description: '',
                  thumbnail_sfw_url: '',
                  thumbnail_nsfw_url: '',
                  video_url: '',
                  tags: '',
                  duration: '',
                  creator_id: '',
                  license_url: '',
                  license_verified: false,
                  content_warnings: '',
                  is_nsfw: false,
                  is_premium: false,
                });
              }}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Scene</span>
            </button>
          </div>

          {/* Upload/Edit Form */}
          {showUploadForm && (
            <div className="card mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">
                  {editingScene ? 'Edit Scene' : 'Upload New Scene'}
                </h3>
                <button
                  onClick={() => {
                    setShowUploadForm(false);
                    setEditingScene(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="input-field w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Duration (seconds) *</label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="input-field w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field w-full h-24 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">SFW Thumbnail URL</label>
                    <input
                      type="url"
                      value={formData.thumbnail_sfw_url}
                      onChange={(e) => setFormData({ ...formData, thumbnail_sfw_url: e.target.value })}
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">NSFW Thumbnail URL</label>
                    <input
                      type="url"
                      value={formData.thumbnail_nsfw_url}
                      onChange={(e) => setFormData({ ...formData, thumbnail_nsfw_url: e.target.value })}
                      className="input-field w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Video URL (Affiliate Link) *</label>
                  <input
                    type="url"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    className="input-field w-full"
                    placeholder="https://lustery.com/affiliate-id/video-name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="input-field w-full"
                      placeholder="romantic, couples, intimate"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Creator</label>
                    <select
                      value={formData.creator_id}
                      onChange={(e) => setFormData({ ...formData, creator_id: e.target.value })}
                      className="input-field w-full"
                    >
                      <option value="">Select Creator</option>
                      {creators.map((creator) => (
                        <option key={creator.id} value={creator.id}>
                          {creator.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">License URL</label>
                    <input
                      type="url"
                      value={formData.license_url}
                      onChange={(e) => setFormData({ ...formData, license_url: e.target.value })}
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Content Warnings (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.content_warnings}
                      onChange={(e) => setFormData({ ...formData, content_warnings: e.target.value })}
                      className="input-field w-full"
                      placeholder="Adult Content, Nudity"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.license_verified}
                      onChange={(e) => setFormData({ ...formData, license_verified: e.target.checked })}
                      className="rounded"
                    />
                    <span>License Verified</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.is_nsfw}
                      onChange={(e) => setFormData({ ...formData, is_nsfw: e.target.checked })}
                      className="rounded"
                    />
                    <span>NSFW Content</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.is_premium}
                      onChange={(e) => setFormData({ ...formData, is_premium: e.target.checked })}
                      className="rounded"
                    />
                    <span>Premium Content</span>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>{editingScene ? 'Update Scene' : 'Create Scene'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadForm(false);
                      setEditingScene(null);
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Scenes List */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6">Manage Scenes</h3>
            
            <div className="space-y-4">
              {scenes.map((scene) => (
                <div key={scene.id} className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-12 bg-dark-600 rounded flex items-center justify-center">
                      <Video className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{scene.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{scene.creator?.name || 'No Creator'}</span>
                        <span>{Math.floor(scene.duration / 60)}:{(scene.duration % 60).toString().padStart(2, '0')}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          scene.license_verified ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'
                        }`}>
                          {scene.license_verified ? 'Licensed' : 'Unlicensed'}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          scene.is_nsfw ? 'bg-red-600 text-red-100' : 'bg-blue-600 text-blue-100'
                        }`}>
                          {scene.is_nsfw ? 'NSFW' : 'SFW'}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          scene.is_premium ? 'bg-yellow-600 text-yellow-100' : 'bg-gray-600 text-gray-100'
                        }`}>
                          {scene.is_premium ? 'Premium' : 'Free'}
                        </span>
                        <span>{scene.view_count.toLocaleString()} views</span>
                        <span>{scene.like_count} likes</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleActive(scene.id, scene.is_active)}
                      className={`p-2 rounded transition-colors ${
                        scene.is_active 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-700'
                      }`}
                      title={scene.is_active ? 'Active' : 'Inactive'}
                    >
                      {scene.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(scene)}
                      className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(scene.id)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {scenes.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No scenes found. Click "Add New Scene" to get started.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 