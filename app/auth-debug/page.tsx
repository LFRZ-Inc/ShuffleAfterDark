'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthDebugPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testSignup = async () => {
    setLoading(true);
    setTestResults([]);
    
    const testEmail = `authtest-${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    const testUsername = `testuser${Date.now()}`;

    addResult('🚀 Starting comprehensive auth test...');
    addResult(`📧 Test email: ${testEmail}`);
    addResult(`👤 Test username: ${testUsername}`);

    try {
      // Step 1: Test Supabase connection
      addResult('🔗 Testing Supabase connection...');
      const { data: connectionTest, error: connectionError } = await supabase
        .from('users')
        .select('count')
        .limit(1);

      if (connectionError) {
        addResult(`❌ Connection failed: ${connectionError.message}`);
        return;
      }
      addResult('✅ Supabase connection successful');

      // Step 2: Check current auth state
      addResult('🔍 Checking current auth state...');
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      addResult(`👤 Current user: ${currentUser ? currentUser.email : 'None'}`);

      // Step 3: Attempt signup
      addResult('📝 Attempting signup...');
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            username: testUsername,
          },
        },
      });

      if (signupError) {
        addResult(`❌ Signup failed: ${signupError.message}`);
        addResult(`🔍 Error details: ${JSON.stringify(signupError)}`);
        return;
      }

      addResult('✅ Signup request successful');
      addResult(`👤 User ID: ${signupData.user?.id}`);
      addResult(`📧 User email: ${signupData.user?.email}`);
      addResult(`✉️ Email confirmed: ${signupData.user?.email_confirmed_at ? 'Yes' : 'No'}`);

      // Step 4: Check if user was created in auth.users
      if (signupData.user) {
        addResult('🔍 Checking if user exists in auth.users...');
        const { data: authUser, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          addResult(`❌ Auth check failed: ${authError.message}`);
        } else {
          addResult(`✅ Auth user found: ${authUser.user?.email}`);
        }

        // Step 5: Wait a moment then check if profile was created
        addResult('⏳ Waiting 3 seconds for trigger to execute...');
        setTimeout(async () => {
          try {
            addResult('🔍 Checking if user profile was created...');
            const { data: profile, error: profileError } = await supabase
              .from('users')
              .select('*')
              .eq('id', signupData.user!.id)
              .single();

            if (profileError) {
              addResult(`❌ Profile not found: ${profileError.message}`);
              addResult('🔧 Attempting manual profile creation...');
              
              // Try to create profile manually
              const { data: manualProfile, error: manualError } = await supabase
                .from('users')
                .insert({
                  id: signupData.user!.id,
                  email: signupData.user!.email || testEmail,
                  username: testUsername,
                  role: 'user',
                  subscription_tier: 'free',
                  subscription_status: 'inactive',
                  age_verified: false,
                  preferences: {
                    favoriteGenres: [],
                    blockedTags: [],
                    preferredDuration: 'any',
                    contentIntensity: 'any',
                    shuffleAlgorithm: 'smart',
                    autoPlay: false,
                    showContentWarnings: true,
                    privateHistory: false
                  }
                })
                .select()
                .single();

              if (manualError) {
                addResult(`❌ Manual profile creation failed: ${manualError.message}`);
              } else {
                addResult('✅ Manual profile creation successful');
                addResult(`👤 Profile: ${manualProfile.username} (${manualProfile.role})`);
              }
            } else {
              addResult('✅ Profile created automatically by trigger');
              addResult(`👤 Username: ${profile.username}`);
              addResult(`🔐 Role: ${profile.role}`);
              addResult(`📊 Subscription: ${profile.subscription_tier}`);
            }
          } catch (error: any) {
            addResult(`💥 Profile check error: ${error.message}`);
          }
        }, 3000);
      }

    } catch (error: any) {
      addResult(`💥 Unexpected error: ${error.message}`);
      console.error('Auth test error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testSignin = async () => {
    addResult('🔑 Testing signin with existing user...');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'password123'
      });

      if (error) {
        addResult(`❌ Signin failed: ${error.message}`);
      } else {
        addResult('✅ Signin successful');
        addResult(`👤 User: ${data.user?.email}`);
      }
    } catch (error: any) {
      addResult(`💥 Signin error: ${error.message}`);
    }
  };

  const checkAuthUsers = async () => {
    addResult('👥 Checking all auth users...');
    
    try {
      // This won't work from client side, but let's try
      const { data, error } = await supabase
        .from('users')
        .select('id, email, username, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        addResult(`❌ User check failed: ${error.message}`);
      } else {
        addResult(`✅ Found ${data.length} users in public.users table`);
        data.forEach((user, index) => {
          addResult(`👤 ${index + 1}. ${user.username} (${user.email})`);
        });
      }
    } catch (error: any) {
      addResult(`💥 User check error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Auth Debug Page</h1>
      
      <div className="space-y-6">
        {/* Test Buttons */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Tests</h2>
          <div className="space-x-4">
            <button 
              onClick={testSignup}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? '🔄 Testing...' : '🚀 Test Signup'}
            </button>
            <button 
              onClick={testSignin}
              disabled={loading}
              className="btn-secondary"
            >
              🔑 Test Signin
            </button>
            <button 
              onClick={checkAuthUsers}
              disabled={loading}
              className="btn-secondary"
            >
              👥 Check Users
            </button>
          </div>
        </div>

        {/* Environment Info */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Environment</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}</p>
            <p><strong>Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}</p>
            <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server-side'}</p>
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Test Results</h2>
          {testResults.length === 0 ? (
            <p className="text-gray-400">Click a test button to see results</p>
          ) : (
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono bg-dark-900 p-2 rounded">
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-dark-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Navigation</h2>
          <div className="space-x-4">
            <a href="/quick-test" className="text-primary-400 hover:text-primary-300">Quick Test</a>
            <a href="/browse-debug" className="text-primary-400 hover:text-primary-300">Browse Debug</a>
            <a href="/signup" className="text-primary-400 hover:text-primary-300">Signup Page</a>
            <a href="/signin" className="text-primary-400 hover:text-primary-300">Signin Page</a>
          </div>
        </div>
      </div>
    </div>
  );
} 