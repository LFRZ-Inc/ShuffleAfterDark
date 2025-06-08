'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/context/AppContext';

export default function DebugPage() {
  const [scenes, setScenes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { safeMode, isXXXEnabled, ageVerified } = useApp();

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
      </div>
    </div>
  );
} 