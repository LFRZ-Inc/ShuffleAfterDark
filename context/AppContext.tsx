'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { UserData, UserPreferences } from '@/types/database';

interface AppContextType {
  // Authentication
  user: User | null;
  userProfile: UserData | null;
  isLoading: boolean;
  
  // Age verification
  ageVerified: boolean;
  setAgeVerified: (verified: boolean) => void;
  
  // Content filtering
  isXXXEnabled: boolean;
  toggleXXXMode: () => void;
  safeMode: boolean;
  
  // Privacy
  incognitoMode: boolean;
  toggleIncognitoMode: () => void;
  
  // User functions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserData>) => Promise<void>;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ageVerified, setAgeVerified] = useState(false);
  const [isXXXEnabled, setIsXXXEnabled] = useState(false);
  const [incognitoMode, setIncognitoMode] = useState(false);

  useEffect(() => {
    // Check initial session
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await loadUserProfile(session.user.id);
        } else {
          setUser(null);
          setUserProfile(null);
        }
        setIsLoading(false);
      }
    );

    // Load saved preferences from localStorage
    loadLocalPreferences();

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        await loadUserProfile(user.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // If user doesn't exist in our users table, create them
        if (error.code === 'PGRST116') {
          await createUserProfile(userId);
          return;
        }
        throw error;
      }

      setUserProfile(data as UserData);
      
      // Set age verification and XXX mode based on user profile
      if (data.age_verified) {
        setAgeVerified(true);
      }
      
      // Check subscription for XXX access
      if (data.subscription_tier === 'premium_xxx' && data.subscription_status === 'active') {
        setIsXXXEnabled(true);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const createUserProfile = async (userId: string) => {
    try {
      const { data: authUser } = await supabase.auth.getUser();
      if (!authUser.user) return;

      const newProfile = {
        id: userId,
        email: authUser.user.email || '',
        username: authUser.user.email?.split('@')[0] || 'user',
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
          privateHistory: false,
        },
      };

      const { data, error } = await supabase
        .from('users')
        .insert([newProfile])
        .select()
        .single();

      if (error) throw error;
      setUserProfile(data as UserData);
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  const loadLocalPreferences = () => {
    // Only access localStorage in the browser
    if (typeof window === 'undefined') return;
    
    try {
      const savedAgeVerified = localStorage.getItem('ageVerified');
      const savedXXXMode = localStorage.getItem('xxxMode');
      const savedIncognito = localStorage.getItem('incognitoMode');

      if (savedAgeVerified === 'true') {
        setAgeVerified(true);
      }
      
      if (savedXXXMode === 'true') {
        setIsXXXEnabled(true);
      }
      
      if (savedIncognito === 'true') {
        setIncognitoMode(true);
      }
    } catch (error) {
      console.error('Error loading local preferences:', error);
    }
  };

  const handleSetAgeVerified = (verified: boolean) => {
    setAgeVerified(verified);
    
    // Only access localStorage in the browser
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ageVerified', verified.toString());
      } catch (error) {
        console.error('Error saving age verification:', error);
      }
    }
    
    // Update user profile if logged in
    if (user && userProfile) {
      updateUserProfile({ age_verified: verified });
    }
  };

  const toggleXXXMode = () => {
    const newMode = !isXXXEnabled;
    setIsXXXEnabled(newMode);
    
    // Only access localStorage in the browser
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('xxxMode', newMode.toString());
      } catch (error) {
        console.error('Error saving XXX mode:', error);
      }
    }
  };

  const toggleIncognitoMode = () => {
    const newMode = !incognitoMode;
    setIncognitoMode(newMode);
    
    // Only access localStorage in the browser
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('incognitoMode', newMode.toString());
      } catch (error) {
        console.error('Error saving incognito mode:', error);
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUserProfile = async (updates: Partial<UserData>) => {
    if (!user || !userProfile) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      setUserProfile(data as UserData);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const updateUserPreferences = async (preferences: Partial<UserPreferences>) => {
    if (!user || !userProfile) return;

    try {
      const currentPreferences = (userProfile.preferences as unknown as UserPreferences) || {
        favoriteGenres: [],
        blockedTags: [],
        preferredDuration: 'any',
        contentIntensity: 'any',
        shuffleAlgorithm: 'smart',
        autoPlay: false,
        showContentWarnings: true,
        privateHistory: false,
      };

      const updatedPreferences = {
        ...currentPreferences,
        ...preferences,
      };

      await updateUserProfile({ preferences: updatedPreferences as any });
    } catch (error) {
      console.error('Error updating user preferences:', error);
      throw error;
    }
  };

  const value: AppContextType = {
    user,
    userProfile,
    isLoading,
    ageVerified,
    setAgeVerified: handleSetAgeVerified,
    isXXXEnabled,
    toggleXXXMode,
    incognitoMode,
    toggleIncognitoMode,
    signIn,
    signUp,
    signOut,
    updateUserProfile,
    updateUserPreferences,
    safeMode: !isXXXEnabled,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 