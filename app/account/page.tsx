'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  User, 
  Settings, 
  Heart, 
  History, 
  CreditCard, 
  Shield, 
  Eye, 
  EyeOff,
  Edit,
  Save,
  X
} from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface UserProfile {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  joinDate: string;
  subscription: {
    tier: 'free' | 'premium' | 'premium_xxx';
    status: 'active' | 'cancelled' | 'expired';
    renewalDate?: string;
  };
  preferences: {
    favoriteGenres: string[];
    blockedTags: string[];
    preferredDuration: 'short' | 'medium' | 'long' | 'any';
    contentIntensity: 'soft' | 'medium' | 'intense' | 'any';
    shuffleAlgorithm: 'random' | 'smart' | 'trending';
    autoPlay: boolean;
    showContentWarnings: boolean;
    privateHistory: boolean;
  };
  stats: {
    totalViews: number;
    favoriteCount: number;
    shuffleCount: number;
    joinedDaysAgo: number;
  };
}

export default function AccountPage() {
  const { ageVerified, user, isXXXEnabled, incognitoMode, toggleIncognitoMode } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Mock user data - in real app this would come from API
  const mockProfile: UserProfile = {
    id: 'user-123',
    email: 'user@example.com',
    username: 'AdultContentLover',
    joinDate: '2024-01-15',
    subscription: {
      tier: 'premium',
      status: 'active',
      renewalDate: '2024-02-15',
    },
    preferences: {
      favoriteGenres: ['romantic', 'couples', 'artistic'],
      blockedTags: ['extreme'],
      preferredDuration: 'medium',
      contentIntensity: 'medium',
      shuffleAlgorithm: 'smart',
      autoPlay: false,
      showContentWarnings: true,
      privateHistory: false,
    },
    stats: {
      totalViews: 1247,
      favoriteCount: 89,
      shuffleCount: 456,
      joinedDaysAgo: 30,
    },
  };

  const [profile, setProfile] = useState(mockProfile);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'preferences', name: 'Preferences', icon: Settings },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'history', name: 'History', icon: History },
    { id: 'subscription', name: 'Subscription', icon: CreditCard },
    { id: 'privacy', name: 'Privacy', icon: Shield },
  ];

  const subscriptionTiers = [
    {
      id: 'free',
      name: 'Free',
      price: '$0/month',
      features: ['Limited daily shuffles', 'SFW content only', 'Basic features'],
    },
    {
      id: 'premium',
      name: 'Premium AfterDark',
      price: '$9.99/month',
      features: ['Unlimited shuffles', 'Full SFW library', 'HD quality', 'No ads'],
    },
    {
      id: 'premium_xxx',
      name: 'Premium+XXX',
      price: '$19.99/month',
      features: ['Everything in Premium', 'Full XXX library', '4K quality', 'Download access'],
    },
  ];

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
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p className="text-gray-400 mb-6">You need to be signed in to access your account.</p>
          <button className="btn-primary">Sign In</button>
        </div>
        <Footer />
      </div>
    );
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Profile Information</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-secondary flex items-center space-x-2"
          >
            {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 bg-dark-700 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  className="input-field w-full"
                  placeholder="Username"
                />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="input-field w-full"
                  placeholder="Email"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold">{profile.username}</h2>
                <p className="text-gray-400">{profile.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {new Date(profile.joinDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setIsEditing(false);
                // Save changes
              }}
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Account Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">{profile.stats.totalViews}</div>
            <div className="text-sm text-gray-400">Total Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">{profile.stats.favoriteCount}</div>
            <div className="text-sm text-gray-400">Favorites</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">{profile.stats.shuffleCount}</div>
            <div className="text-sm text-gray-400">Shuffles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">{profile.stats.joinedDaysAgo}</div>
            <div className="text-sm text-gray-400">Days Active</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Shuffle Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Preferred Duration</label>
            <select
              value={profile.preferences.preferredDuration}
              onChange={(e) => setProfile({
                ...profile,
                preferences: { ...profile.preferences, preferredDuration: e.target.value as any }
              })}
              className="input-field w-full"
            >
              <option value="any">Any Duration</option>
              <option value="short">Short (0-10 min)</option>
              <option value="medium">Medium (10-20 min)</option>
              <option value="long">Long (20+ min)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content Intensity</label>
            <select
              value={profile.preferences.contentIntensity}
              onChange={(e) => setProfile({
                ...profile,
                preferences: { ...profile.preferences, contentIntensity: e.target.value as any }
              })}
              className="input-field w-full"
            >
              <option value="any">Any Intensity</option>
              <option value="soft">Soft</option>
              <option value="medium">Medium</option>
              <option value="intense">Intense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Shuffle Algorithm</label>
            <select
              value={profile.preferences.shuffleAlgorithm}
              onChange={(e) => setProfile({
                ...profile,
                preferences: { ...profile.preferences, shuffleAlgorithm: e.target.value as any }
              })}
              className="input-field w-full"
            >
              <option value="smart">Smart (Recommended)</option>
              <option value="random">Random</option>
              <option value="trending">Trending</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={profile.preferences.autoPlay}
                onChange={(e) => setProfile({
                  ...profile,
                  preferences: { ...profile.preferences, autoPlay: e.target.checked }
                })}
                className="rounded"
              />
              <span>Auto-play videos</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={profile.preferences.showContentWarnings}
                onChange={(e) => setProfile({
                  ...profile,
                  preferences: { ...profile.preferences, showContentWarnings: e.target.checked }
                })}
                className="rounded"
              />
              <span>Show content warnings</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Favorite Genres</h3>
        <div className="flex flex-wrap gap-2">
          {['romantic', 'couples', 'artistic', 'solo', 'lgbtq', 'explicit'].map((genre) => (
            <button
              key={genre}
              onClick={() => {
                const favorites = profile.preferences.favoriteGenres.includes(genre)
                  ? profile.preferences.favoriteGenres.filter(g => g !== genre)
                  : [...profile.preferences.favoriteGenres, genre];
                setProfile({
                  ...profile,
                  preferences: { ...profile.preferences, favoriteGenres: favorites }
                });
              }}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                profile.preferences.favoriteGenres.includes(genre)
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSubscriptionTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Current Subscription</h3>
        <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
          <div>
            <h4 className="font-semibold text-lg">
              {subscriptionTiers.find(t => t.id === profile.subscription.tier)?.name}
            </h4>
            <p className="text-gray-400">
              Status: <span className="text-green-400">{profile.subscription.status}</span>
            </p>
            {profile.subscription.renewalDate && (
              <p className="text-sm text-gray-500">
                Renews on {new Date(profile.subscription.renewalDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {subscriptionTiers.find(t => t.id === profile.subscription.tier)?.price}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Available Plans</h3>
        <div className="space-y-4">
          {subscriptionTiers.map((tier) => (
            <div
              key={tier.id}
              className={`p-4 rounded-lg border transition-colors ${
                profile.subscription.tier === tier.id
                  ? 'border-primary-600 bg-primary-600/10'
                  : 'border-dark-600 hover:border-dark-500'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-lg">{tier.name}</h4>
                <div className="text-xl font-bold">{tier.price}</div>
              </div>
              <ul className="space-y-1 text-sm text-gray-400 mb-4">
                {tier.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
              {profile.subscription.tier !== tier.id && (
                <button className="btn-primary w-full">
                  {tier.id === 'free' ? 'Downgrade' : 'Upgrade'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Incognito Mode</h4>
              <p className="text-sm text-gray-400">
                Prevents saving cookies and browsing history
              </p>
            </div>
            <button
              onClick={toggleIncognitoMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                incognitoMode ? 'bg-primary-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  incognitoMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Private History</h4>
              <p className="text-sm text-gray-400">
                Hide viewing history from your account
              </p>
            </div>
            <button
              onClick={() => setProfile({
                ...profile,
                preferences: { ...profile.preferences, privateHistory: !profile.preferences.privateHistory }
              })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                profile.preferences.privateHistory ? 'bg-primary-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  profile.preferences.privateHistory ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">XXX Mode Access</h4>
              <p className="text-sm text-gray-400">
                Currently {isXXXEnabled ? 'enabled' : 'disabled'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {isXXXEnabled ? (
                <Eye className="w-5 h-5 text-primary-400" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Data Management</h3>
        <div className="space-y-3">
          <button className="btn-secondary w-full">Download My Data</button>
          <button className="btn-secondary w-full">Clear Viewing History</button>
          <button className="btn-danger w-full">Delete Account</button>
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
            Account Settings
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
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'preferences' && renderPreferencesTab()}
              {activeTab === 'subscription' && renderSubscriptionTab()}
              {activeTab === 'privacy' && renderPrivacyTab()}
              {activeTab === 'favorites' && (
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">Favorite Content</h3>
                  <p className="text-gray-400">Your favorite content will appear here.</p>
                </div>
              )}
              {activeTab === 'history' && (
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">Viewing History</h3>
                  {profile.preferences.privateHistory ? (
                    <p className="text-gray-400">History is disabled in your privacy settings.</p>
                  ) : (
                    <p className="text-gray-400">Your viewing history will appear here.</p>
                  )}
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