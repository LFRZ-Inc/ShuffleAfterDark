'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/context/AppContext';

export default function DebugPage() {
  const [scenes, setScenes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPassword, setTestPassword] = useState('testpassword123');
  const [testUsername, setTestUsername] = useState('testuser');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const { safeMode, isXXXEnabled, ageVerified, signUp, signIn } = useApp();

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing Supabase connection...');
        
        // Test basic connection
        const { data: testData, error: testError } = await supabase
          .from('scenes_nsfw')
          .select('id, title, is_nsfw, is_active')
          .limit(5);

        if (testError) {
          throw testError;
        }

        console.log('Supabase connection successful:', testData);
        setScenes(testData || []);
      } catch (err: any) {
        console.error('Supabase connection error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  const testSignUp = async () => {
    setAuthError(null);
    setAuthSuccess(null);
    try {
      await signUp(testEmail, testPassword, testUsername);
      setAuthSuccess('Account created successfully! Check your email for verification.');
    } catch (err: any) {
      setAuthError(err.message);
      console.error('Signup error:', err);
    }
  };

  const testSignIn = async () => {
    setAuthError(null);
    setAuthSuccess(null);
    try {
      await signIn(testEmail, testPassword);
      setAuthSuccess('Signed in successfully!');
    } catch (err: any) {
      setAuthError(err.message);
      console.error('Signin error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Debug Page</h1>
      
      <div className="space-y-6">
        {/* App State */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">App State</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Age Verified:</strong> {ageVerified ? 'Yes' : 'No'}</p>
            <p><strong>XXX Enabled:</strong> {isXXXEnabled ? 'Yes' : 'No'}</p>
            <p><strong>Safe Mode:</strong> {safeMode ? 'ON' : 'OFF'}</p>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Environment</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing'}</p>
            <p><strong>Supabase Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'}</p>
          </div>
        </div>

        {/* Image Test */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Image Test</h2>
          <p className="mb-4">Testing image: <code>/content/Eropolis_Toulouse_2009_03.jpg</code></p>
          <div className="border border-gray-600 p-4 rounded mb-4">
            <img 
              src="/content/Eropolis_Toulouse_2009_03.jpg" 
              alt="Test Image"
              className="max-w-xs h-auto"
              onLoad={() => console.log('✅ Image loaded successfully')}
              onError={(e) => {
                console.error('❌ Image failed to load:', e);
                console.log('Attempted URL:', e.currentTarget.src);
              }}
            />
          </div>
          <p className="text-xs text-gray-400">Check browser console for image loading status</p>
        </div>

        {/* Account Creation Test */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Account Creation Test</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="email"
                placeholder="Email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="input-field"
              />
              <input
                type="password"
                placeholder="Password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Username"
                value={testUsername}
                onChange={(e) => setTestUsername(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="flex space-x-4">
              <button onClick={testSignUp} className="btn-primary">
                Test Sign Up
              </button>
              <button onClick={testSignIn} className="btn-secondary">
                Test Sign In
              </button>
            </div>
            {authError && (
              <div className="text-red-400 text-sm">
                <strong>Error:</strong> {authError}
              </div>
            )}
            {authSuccess && (
              <div className="text-green-400 text-sm">
                <strong>Success:</strong> {authSuccess}
              </div>
            )}
          </div>
        </div>

        {/* Database Test */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Database Connection</h2>
          {loading ? (
            <p>Testing connection...</p>
          ) : error ? (
            <div className="text-red-400">
              <p><strong>Error:</strong> {error}</p>
            </div>
          ) : (
            <div>
              <p className="text-green-400 mb-3"><strong>✅ Connection Successful!</strong></p>
              <p className="mb-2"><strong>Found {scenes.length} scenes:</strong></p>
              <div className="space-y-1 text-sm">
                {scenes.map((scene) => (
                  <div key={scene.id} className="bg-dark-700 p-2 rounded">
                    <p><strong>{scene.title}</strong></p>
                    <p>NSFW: {scene.is_nsfw ? 'Yes' : 'No'} | Active: {scene.is_active ? 'Yes' : 'No'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Navigation</h2>
          <div className="space-x-4">
            <a href="/test-image" className="text-primary-400 hover:text-primary-300">Test Image Page</a>
            <a href="/browse" className="text-primary-400 hover:text-primary-300">Browse Page</a>
            <a href="/scene/e65c5d9b-72c3-49e6-adbf-71f8e67f3573" className="text-primary-400 hover:text-primary-300">Test Scene</a>
            <a href="/signup" className="text-primary-400 hover:text-primary-300">Signup Page</a>
          </div>
        </div>
      </div>
    </div>
  );
} 