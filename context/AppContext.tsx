'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import Cookies from 'js-cookie';

interface AppContextType {
  isXXXEnabled: boolean;
  toggleXXXMode: () => void;
  user: User | null;
  isLoading: boolean;
  ageVerified: boolean;
  setAgeVerified: (verified: boolean) => void;
  incognitoMode: boolean;
  toggleIncognitoMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [isXXXEnabled, setIsXXXEnabled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ageVerified, setAgeVerified] = useState(false);
  const [incognitoMode, setIncognitoMode] = useState(false);

  // Initialize state from cookies/localStorage
  useEffect(() => {
    const savedXXXMode = Cookies.get('xxx-mode') === 'true';
    const savedAgeVerified = Cookies.get('age-verified') === 'true';
    const savedIncognitoMode = localStorage.getItem('incognito-mode') === 'true';

    setIsXXXEnabled(savedXXXMode);
    setAgeVerified(savedAgeVerified);
    setIncognitoMode(savedIncognitoMode);
  }, []);

  // Handle auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const toggleXXXMode = () => {
    if (!ageVerified) {
      // Redirect to age verification
      return;
    }
    
    const newValue = !isXXXEnabled;
    setIsXXXEnabled(newValue);
    
    if (!incognitoMode) {
      Cookies.set('xxx-mode', newValue.toString(), { expires: 30 });
    }
  };

  const handleSetAgeVerified = (verified: boolean) => {
    setAgeVerified(verified);
    if (!incognitoMode) {
      Cookies.set('age-verified', verified.toString(), { expires: 365 });
    }
  };

  const toggleIncognitoMode = () => {
    const newValue = !incognitoMode;
    setIncognitoMode(newValue);
    localStorage.setItem('incognito-mode', newValue.toString());
    
    if (newValue) {
      // Clear cookies when entering incognito mode
      Cookies.remove('xxx-mode');
      Cookies.remove('age-verified');
    }
  };

  const value: AppContextType = {
    isXXXEnabled,
    toggleXXXMode,
    user,
    isLoading,
    ageVerified,
    setAgeVerified: handleSetAgeVerified,
    incognitoMode,
    toggleIncognitoMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 