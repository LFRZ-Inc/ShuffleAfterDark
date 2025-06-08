'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/context/AppContext';

export default function BrowseDebugPage() {
  const [scenes, setScenes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any[]>([]);
  const { ageVerified, safeMode, isXXXEnabled } = useApp();

  const addDebug = (message: string, data?: any) => {
    setDebugInfo(prev => [...prev, {
      timestamp: new Date().toISOString(),
      message,
      data
    }]);
  };

  const loadScenes = async () => {
    setLoading(true);
    setError(null);
    addDebug('🔄 Starting scene loading...');
    
    try {
      addDebug('📊 App State Check', {
        ageVerified,
        safeMode,
        isXXXEnabled
      });

      // Test basic connection first
      addDebug('🔗 Testing basic Supabase connection...');
      const { data: testData, error: testError } = await supabase
        .from('scenes_nsfw')
        .select('count')
        .limit(1);

      if (testError) {
        addDebug('❌ Basic connection failed', testError);
        throw testError;
      }
      addDebug('✅ Basic connection successful');

      // Now try the full query
      addDebug('📋 Building query...');
      let query = supabase
        .from('scenes_nsfw')
        .select(`
          *,
          creator:creators(name)
        `)
        .eq('is_active', true);

      addDebug('🔍 Query built, applying SafeMode filter...', { safeMode });

      // Apply SafeMode filter
      if (safeMode) {
        query = query.eq('is_nsfw', false);
        addDebug('🔒 SafeMode ON - filtering to SFW only');
      } else {
        addDebug('🔓 SafeMode OFF - showing all content');
      }

      addDebug('🚀 Executing query...');
      const { data, error } = await query;
      
      if (error) {
        addDebug('❌ Query failed', error);
        throw error;
      }
      
      addDebug('✅ Query successful', {
        resultCount: data?.length || 0,
        firstResult: data?.[0]?.title || 'None'
      });
      
      setScenes(data || []);
    } catch (error: any) {
      addDebug('💥 Error occurred', error);
      console.error('Error loading scenes:', error);
      setError(error.message);
    } finally {
      setLoading(false);
      addDebug('🏁 Loading complete');
    }
  };

  useEffect(() => {
    addDebug('🎬 Component mounted');
    if (ageVerified) {
      addDebug('✅ Age verified, loading scenes...');
      loadScenes();
    } else {
      addDebug('⚠️ Age not verified, skipping scene load');
    }
  }, [ageVerified, safeMode]);

  return (
    <div className="min-h-screen bg-dark-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Browse Debug Page</h1>
      
      <div className="space-y-6">
        {/* App State */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">App State</h2>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className={`p-2 rounded ${ageVerified ? 'bg-green-900' : 'bg-red-900'}`}>
              <strong>Age Verified:</strong> {ageVerified ? 'Yes' : 'No'}
            </div>
            <div className={`p-2 rounded ${safeMode ? 'bg-yellow-900' : 'bg-blue-900'}`}>
              <strong>Safe Mode:</strong> {safeMode ? 'ON' : 'OFF'}
            </div>
            <div className={`p-2 rounded ${isXXXEnabled ? 'bg-purple-900' : 'bg-gray-900'}`}>
              <strong>XXX Enabled:</strong> {isXXXEnabled ? 'Yes' : 'No'}
            </div>
          </div>
        </div>

        {/* Manual Test Button */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Manual Test</h2>
          <button 
            onClick={loadScenes}
            className="btn-primary"
            disabled={loading}
          >
            {loading ? '🔄 Loading...' : '🔄 Reload Scenes'}
          </button>
        </div>

        {/* Results */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Results</h2>
          {loading ? (
            <p>Loading scenes...</p>
          ) : error ? (
            <div className="text-red-400">
              <p><strong>Error:</strong> {error}</p>
            </div>
          ) : (
            <div>
              <p className="text-green-400 mb-3">
                <strong>✅ Found {scenes.length} scenes</strong>
              </p>
              {scenes.length > 0 && (
                <div className="space-y-2">
                  {scenes.slice(0, 3).map((scene) => (
                    <div key={scene.id} className="bg-dark-700 p-3 rounded">
                      <p><strong>{scene.title}</strong></p>
                      <p className="text-sm text-gray-300">
                        NSFW: {scene.is_nsfw ? 'Yes' : 'No'} | 
                        Creator: {scene.creator?.name || 'Unknown'} |
                        Thumbnail: {scene.thumbnail_sfw_url || 'None'}
                      </p>
                    </div>
                  ))}
                  {scenes.length > 3 && (
                    <p className="text-gray-400">... and {scenes.length - 3} more</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Debug Log */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Debug Log</h2>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {debugInfo.map((info, index) => (
              <div key={index} className="text-xs font-mono bg-dark-900 p-2 rounded">
                <span className="text-gray-500">{new Date(info.timestamp).toLocaleTimeString()}</span>
                <span className="ml-2">{info.message}</span>
                {info.data && (
                  <details className="mt-1">
                    <summary className="text-gray-400 cursor-pointer">View Data</summary>
                    <pre className="text-xs mt-1 overflow-auto">
                      {JSON.stringify(info.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Navigation</h2>
          <div className="space-x-4">
            <a href="/browse" className="text-primary-400 hover:text-primary-300">Original Browse</a>
            <a href="/quick-test" className="text-primary-400 hover:text-primary-300">Quick Test</a>
            <a href="/debug" className="text-primary-400 hover:text-primary-300">Debug Page</a>
          </div>
        </div>
      </div>
    </div>
  );
} 