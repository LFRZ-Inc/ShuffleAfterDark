'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Upload, 
  Video, 
  Image, 
  DollarSign, 
  BarChart3, 
  Settings, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Eye,
  Heart
} from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface CreatorStats {
  totalViews: number;
  totalLikes: number;
  totalEarnings: number;
  contentCount: number;
  followers: number;
  monthlyViews: number;
}

export default function CreatorPage() {
  const { ageVerified, user } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isVerified, setIsVerified] = useState(false);

  // Mock creator stats
  const stats: CreatorStats = {
    totalViews: 125430,
    totalLikes: 8920,
    totalEarnings: 2450.75,
    contentCount: 47,
    followers: 1250,
    monthlyViews: 23450,
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'upload', name: 'Upload Content', icon: Upload },
    { id: 'content', name: 'My Content', icon: Video },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'earnings', name: 'Earnings', icon: DollarSign },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  if (!ageVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card max-w-md w-full text-center">
          <Shield className="w-16 h-16 text-primary-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Age Verification Required</h2>
          <p className="text-gray-300 mb-6">
            You must complete age verification before accessing the creator portal.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Creator Portal</h1>
          <p className="text-gray-400 mb-6">Please sign in to access the creator portal.</p>
          <button className="btn-primary">Sign In</button>
        </div>
        <Footer />
      </div>
    );
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Verification Status */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isVerified ? (
              <>
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="text-lg font-semibold text-green-400">Verified Creator</h3>
                  <p className="text-gray-400">Your account is verified and approved for content uploads</p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="w-8 h-8 text-yellow-400" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400">Verification Pending</h3>
                  <p className="text-gray-400">Complete verification to start uploading content</p>
                </div>
              </>
            )}
          </div>
          {!isVerified && (
            <button className="btn-primary">Start Verification</button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <Eye className="w-8 h-8 text-primary-400" />
            <div>
              <p className="text-gray-400 text-sm">Total Views</p>
              <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-red-400" />
            <div>
              <p className="text-gray-400 text-sm">Total Likes</p>
              <p className="text-2xl font-bold">{stats.totalLikes.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Total Earnings</p>
              <p className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <Video className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Content Count</p>
              <p className="text-2xl font-bold">{stats.contentCount}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Followers</p>
              <p className="text-2xl font-bold">{stats.followers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-gray-400 text-sm">Monthly Views</p>
              <p className="text-2xl font-bold">{stats.monthlyViews.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-dark-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Content "Romantic Sunset" approved</span>
            </div>
            <span className="text-sm text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-dark-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span>Content "Artistic Expression" under review</span>
            </div>
            <span className="text-sm text-gray-400">1 day ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-dark-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span>Payout of $125.50 processed</span>
            </div>
            <span className="text-sm text-gray-400">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Upload New Content</h3>
        
        {!isVerified ? (
          <div className="text-center py-8">
            <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">Verification Required</h4>
            <p className="text-gray-400 mb-4">
              You must complete creator verification before uploading content.
            </p>
            <button className="btn-primary">Start Verification Process</button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Video File</label>
              <div className="border-2 border-dashed border-dark-600 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Drag and drop your video file here, or click to browse</p>
                <p className="text-sm text-gray-500">Supported formats: MP4, MOV, AVI (Max 2GB)</p>
                <button className="btn-primary mt-4">Choose File</button>
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Thumbnail Image</label>
              <div className="border-2 border-dashed border-dark-600 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 mb-2">Upload thumbnail (1920x1080 recommended)</p>
                <button className="btn-secondary">Choose Image</button>
              </div>
            </div>

            {/* Content Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  className="input-field w-full"
                  placeholder="Enter content title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select className="input-field w-full">
                  <option value="">Select category</option>
                  <option value="romantic">Romantic</option>
                  <option value="artistic">Artistic</option>
                  <option value="couples">Couples</option>
                  <option value="solo">Solo</option>
                  <option value="explicit">Explicit (XXX)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="input-field w-full h-32 resize-none"
                placeholder="Describe your content..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <input
                type="text"
                className="input-field w-full"
                placeholder="Add tags separated by commas"
              />
            </div>

            {/* Content Settings */}
            <div className="space-y-4">
              <h4 className="font-semibold">Content Settings</h4>
              
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <span>This content contains explicit material (18+)</span>
              </label>

              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <span>Premium content (requires subscription)</span>
              </label>

              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <span>Allow downloads for premium users</span>
              </label>
            </div>

            <div className="flex space-x-4">
              <button className="btn-primary flex-1">Upload Content</button>
              <button className="btn-secondary">Save as Draft</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">My Content</h3>
          <div className="flex space-x-2">
            <select className="input-field">
              <option>All Status</option>
              <option>Published</option>
              <option>Under Review</option>
              <option>Draft</option>
            </select>
            <button className="btn-primary">Upload New</button>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { title: 'Romantic Sunset', status: 'published', views: 15420, likes: 892 },
            { title: 'Artistic Expression', status: 'review', views: 0, likes: 0 },
            { title: 'Couples Intimacy', status: 'published', views: 8750, likes: 654 },
            { title: 'Draft Content', status: 'draft', views: 0, likes: 0 },
          ].map((content, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-12 bg-dark-600 rounded flex items-center justify-center">
                  <Video className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-medium">{content.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className={`px-2 py-1 rounded text-xs ${
                      content.status === 'published' ? 'bg-green-600 text-green-100' :
                      content.status === 'review' ? 'bg-yellow-600 text-yellow-100' :
                      'bg-gray-600 text-gray-100'
                    }`}>
                      {content.status === 'published' ? 'Published' :
                       content.status === 'review' ? 'Under Review' : 'Draft'}
                    </span>
                    <span>{content.views.toLocaleString()} views</span>
                    <span>{content.likes} likes</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="btn-secondary text-sm">Edit</button>
                <button className="btn-secondary text-sm">Analytics</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-neon-gradient bg-clip-text text-transparent">
            Creator Portal
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                          activeTab === tab.id
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-300 hover:bg-dark-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'upload' && renderUpload()}
              {activeTab === 'content' && renderContent()}
              {activeTab === 'analytics' && (
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">Analytics</h3>
                  <p className="text-gray-400">Detailed analytics coming soon...</p>
                </div>
              )}
              {activeTab === 'earnings' && (
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">Earnings</h3>
                  <p className="text-gray-400">Earnings dashboard coming soon...</p>
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">Creator Settings</h3>
                  <p className="text-gray-400">Creator settings coming soon...</p>
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