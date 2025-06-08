import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if we're in a build environment
const isBuildTime = process.env.NODE_ENV === 'production' && typeof window === 'undefined';

// Create a fallback client for build time when env vars might not be available
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey || isBuildTime) {
    // During build time or when env vars are missing, return a mock client
    console.warn('Supabase environment variables not found or in build mode. Using fallback configuration.');
    return createClient<Database>(
      'https://placeholder.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
        global: {
          fetch: () => Promise.reject(new Error('Supabase not available during build')),
        },
      }
    );
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
};

export const supabase = createSupabaseClient();

// Helper function to get the current user
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.warn('Failed to get current user:', error);
    return null;
  }
};

// Helper function to sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.warn('Failed to sign out:', error);
  }
}; 