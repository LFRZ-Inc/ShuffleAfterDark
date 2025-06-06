import React from 'react';
import type { 
  UserPreferences, 
  SubscriptionTier, 
  Scene, 
  ReportReason 
} from './database';

export * from './database';

// App-specific types
export interface AppContextType {
  isXXXEnabled: boolean;
  toggleXXXMode: () => void;
  user: User | null;
  isLoading: boolean;
  ageVerified: boolean;
  setAgeVerified: (verified: boolean) => void;
}

export interface User {
  id: string;
  email: string;
  preferences: UserPreferences;
  subscription_status: SubscriptionTier;
  age_verified: boolean;
  incognito_mode: boolean;
}

export interface ShuffleResult {
  scene: Scene;
  reason?: string;
  confidence: number;
}

export interface ShuffleOptions {
  mood?: string[];
  tags?: string[];
  duration?: 'short' | 'medium' | 'long' | 'any';
  intensity?: 'soft' | 'medium' | 'intense' | 'any';
  excludeViewed?: boolean;
  xxxMode?: boolean;
}

export interface ContentFilter {
  safeMode: boolean;
  blockedTags: string[];
  allowedTags: string[];
  minRating: number;
  maxRating: number;
}

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
}

export interface SceneCardProps {
  scene: Scene;
  showNSFW: boolean;
  onClick?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  onSave?: () => void;
  className?: string;
}

export interface AgeVerificationData {
  birthDate: Date;
  country: string;
  agreed: boolean;
}

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  stripePriceId: string;
  tier: SubscriptionTier;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  requiresAuth?: boolean;
  requiresXXX?: boolean;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  ageVerified: boolean;
  termsAccepted: boolean;
}

export interface ReportFormData {
  reason: ReportReason;
  description?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Shuffle algorithm types
export interface ShuffleWeight {
  factor: string;
  weight: number;
  reason: string;
}

export interface ShuffleScore {
  sceneId: string;
  score: number;
  weights: ShuffleWeight[];
} 