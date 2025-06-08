'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function QuickTestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testEverything = async () => {
    setLoading(true);
    setTestResults([]);

    // Test 1: Image accessibility
    addResult('🖼️ Testing image accessibility...');
    try {
      const response = await fetch('/content/Eropolis_Toulouse_2009_03.jpg');
      if (response.ok) {
        addResult('✅ Image is accessible via fetch');
      } else {
        addResult(`❌ Image fetch failed: ${response.status} ${response.statusText}`);
      }
    } catch (error: any) {
      addResult(`❌ Image fetch error: ${error.message}`);
    }

    // Test 2: Supabase connection
    addResult('🔗 Testing Supabase connection...');
    try {
      const { data, error } = await supabase.from('scenes_nsfw').select('count').limit(1);
      if (error) {
        addResult(`❌ Supabase connection failed: ${error.message}`);
      } else {
        addResult('✅ Supabase connection successful');
      }
    } catch (error: any) {
      addResult(`❌ Supabase connection error: ${error.message}`);
    }

    // Test 3: Account creation
    addResult('👤 Testing account creation...');
    const testEmail = `quicktest-${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            username: `testuser${Date.now()}`,
          },
        },
      });

      if (error) {
        addResult(`❌ Account creation failed: ${error.message}`);
      } else {
        addResult('✅ Account created successfully');
        addResult(`📧 User ID: ${data.user?.id}`);
        addResult(`📧 Email: ${data.user?.email}`);
        
        // Test 4: Check if profile was created
        if (data.user) {
          addResult('👤 Checking if user profile was created...');
          setTimeout(async () => {
            try {
              const { data: profile, error: profileError } = await supabase
                .from('users')
                .select('*')
                .eq('id', data.user!.id)
                .single();

              if (profileError) {
                addResult(`❌ Profile creation failed: ${profileError.message}`);
              } else {
                addResult('✅ User profile created automatically');
                addResult(`👤 Username: ${profile.username}`);
                addResult(`🔐 Role: ${profile.role}`);
              }
            } catch (error: any) {
              addResult(`❌ Profile check error: ${error.message}`);
            }
          }, 2000);
        }
      }
    } catch (error: any) {
      addResult(`❌ Account creation error: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Quick Test Page</h1>
      
      <div className="space-y-6">
        {/* Test Button */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <button 
            onClick={testEverything}
            disabled={loading}
            className="btn-primary text-lg px-8 py-3"
          >
            {loading ? '🔄 Running Tests...' : '🚀 Test Everything'}
          </button>
        </div>

        {/* Image Test */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Image Test</h2>
          <p className="mb-4">Direct image load test:</p>
          <img 
            src="/content/Eropolis_Toulouse_2009_03.jpg" 
            alt="Test Image"
            className="max-w-xs h-auto border border-gray-600"
            onLoad={() => console.log('✅ Image loaded in browser')}
            onError={(e) => {
              console.error('❌ Image failed to load in browser');
              console.log('Image src:', e.currentTarget.src);
            }}
          />
          <p className="text-xs text-gray-400 mt-2">Check browser console for image load status</p>
        </div>

        {/* Test Results */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Test Results</h2>
          {testResults.length === 0 ? (
            <p className="text-gray-400">Click "Test Everything" to run diagnostics</p>
          ) : (
            <div className="space-y-1">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono bg-dark-900 p-2 rounded">
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Environment Check */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Environment Check</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
            <p><strong>Supabase Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
            <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server-side'}</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <div className="space-x-4">
            <a href="/debug" className="text-primary-400 hover:text-primary-300">Debug Page</a>
            <a href="/auth-test" className="text-primary-400 hover:text-primary-300">Auth Test</a>
            <a href="/auth-debug" className="text-primary-400 hover:text-primary-300">Auth Debug</a>
            <a href="/browse-debug" className="text-primary-400 hover:text-primary-300">Browse Debug</a>
            <a href="/test-image" className="text-primary-400 hover:text-primary-300">Image Test</a>
            <a href="/browse" className="text-primary-400 hover:text-primary-300">Browse</a>
            <a href="/signup" className="text-primary-400 hover:text-primary-300">Signup</a>
          </div>
        </div>
      </div>
    </div>
  );
} 