'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/context/AppContext';

export default function AuthTestPage() {
  const [authState, setAuthState] = useState<any>(null);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, userProfile, signUp, signIn, signOut } = useApp();

  const addTestResult = (test: string, success: boolean, message: string, data?: any) => {
    setTestResults(prev => [...prev, {
      test,
      success,
      message,
      data,
      timestamp: new Date().toISOString()
    }]);
  };

  const runAuthTests = async () => {
    setLoading(true);
    setTestResults([]);

    try {
      // Test 1: Check current session
      addTestResult('Session Check', true, 'Checking current session...');
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        addTestResult('Session Check', false, sessionError.message);
      } else {
        addTestResult('Session Check', true, `Session: ${session.session ? 'Active' : 'None'}`, session);
      }

      // Test 2: Test user creation
      const testEmail = `test-${Date.now()}@example.com`;
      const testPassword = 'TestPassword123!';
      const testUsername = `testuser${Date.now()}`;

      addTestResult('User Creation', true, 'Attempting to create test user...');
      try {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: testEmail,
          password: testPassword,
          options: {
            data: {
              username: testUsername,
            },
          },
        });

        if (signUpError) {
          addTestResult('User Creation', false, signUpError.message);
        } else {
          addTestResult('User Creation', true, 'User created successfully', signUpData);
          
          // Test 3: Check if user profile was created automatically
          if (signUpData.user) {
            setTimeout(async () => {
              const { data: profileData, error: profileError } = await supabase
                .from('users')
                .select('*')
                .eq('id', signUpData.user!.id)
                .single();

              if (profileError) {
                addTestResult('Profile Creation', false, `Profile not created: ${profileError.message}`);
              } else {
                addTestResult('Profile Creation', true, 'User profile created automatically', profileData);
              }
            }, 2000);
          }
        }
      } catch (error: any) {
        addTestResult('User Creation', false, error.message);
      }

      // Test 4: Test database policies
      addTestResult('Database Policies', true, 'Testing database access policies...');
      try {
        const { data: scenesData, error: scenesError } = await supabase
          .from('scenes_nsfw')
          .select('id, title, is_active')
          .limit(3);

        if (scenesError) {
          addTestResult('Database Policies', false, `Cannot read scenes: ${scenesError.message}`);
        } else {
          addTestResult('Database Policies', true, `Can read ${scenesData.length} scenes`, scenesData);
        }
      } catch (error: any) {
        addTestResult('Database Policies', false, error.message);
      }

      // Test 5: Test authentication state listener
      addTestResult('Auth Listener', true, 'Testing auth state changes...');
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        addTestResult('Auth Listener', true, `Auth event: ${event}`, { event, session: !!session });
      });

      // Clean up listener after 5 seconds
      setTimeout(() => {
        subscription.unsubscribe();
        addTestResult('Auth Listener', true, 'Auth listener cleaned up');
      }, 5000);

    } catch (error: any) {
      addTestResult('General Error', false, error.message);
    } finally {
      setLoading(false);
    }
  };

  const testSignOut = async () => {
    try {
      await signOut();
      addTestResult('Sign Out', true, 'Successfully signed out');
    } catch (error: any) {
      addTestResult('Sign Out', false, error.message);
    }
  };

  useEffect(() => {
    // Get current auth state
    const getAuthState = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const { data: { user } } = await supabase.auth.getUser();
      setAuthState({ session, user });
    };
    getAuthState();
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Authentication Test Page</h1>
      
      <div className="space-y-6">
        {/* Current Auth State */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Current Authentication State</h2>
          <div className="space-y-2 text-sm">
            <p><strong>App User:</strong> {user ? user.email : 'None'}</p>
            <p><strong>App Profile:</strong> {userProfile ? userProfile.username : 'None'}</p>
            <p><strong>Supabase Session:</strong> {authState?.session ? 'Active' : 'None'}</p>
            <p><strong>Supabase User:</strong> {authState?.user ? authState.user.email : 'None'}</p>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Test Controls</h2>
          <div className="flex space-x-4">
            <button 
              onClick={runAuthTests} 
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Running Tests...' : 'Run Authentication Tests'}
            </button>
            {user && (
              <button onClick={testSignOut} className="btn-secondary">
                Test Sign Out
              </button>
            )}
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Test Results</h2>
          {testResults.length === 0 ? (
            <p className="text-gray-400">No tests run yet. Click "Run Authentication Tests" to start.</p>
          ) : (
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded border-l-4 ${
                    result.success 
                      ? 'border-green-500 bg-green-900/20' 
                      : 'border-red-500 bg-red-900/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{result.test}</span>
                    <span className={`text-sm ${result.success ? 'text-green-400' : 'text-red-400'}`}>
                      {result.success ? '✅ PASS' : '❌ FAIL'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{result.message}</p>
                  {result.data && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-400 cursor-pointer">View Data</summary>
                      <pre className="text-xs bg-dark-900 p-2 rounded mt-1 overflow-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{new Date(result.timestamp).toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Environment Info */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Environment Configuration</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}</p>
            <p><strong>Supabase Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}</p>
            <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Navigation</h2>
          <div className="space-x-4">
            <a href="/debug" className="text-primary-400 hover:text-primary-300">Debug Page</a>
            <a href="/signup" className="text-primary-400 hover:text-primary-300">Signup Page</a>
            <a href="/login" className="text-primary-400 hover:text-primary-300">Login Page</a>
            <a href="/browse" className="text-primary-400 hover:text-primary-300">Browse Page</a>
          </div>
        </div>
      </div>
    </div>
  );
} 