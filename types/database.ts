export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
          preferences: UserPreferences;
          shuffle_history: string[];
          subscription_status: SubscriptionTier;
          age_verified: boolean;
          incognito_mode: boolean;
        };
        Insert: {
          id?: string;
          email: string;
          preferences?: UserPreferences;
          shuffle_history?: string[];
          subscription_status?: SubscriptionTier;
          age_verified?: boolean;
          incognito_mode?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          preferences?: UserPreferences;
          shuffle_history?: string[];
          subscription_status?: SubscriptionTier;
          age_verified?: boolean;
          incognito_mode?: boolean;
        };
      };
      scenes_sfw: {
        Row: Scene;
        Insert: Omit<Scene, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Scene, 'id' | 'created_at'>>;
      };
      scenes_nsfw: {
        Row: Scene;
        Insert: Omit<Scene, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Scene, 'id' | 'created_at'>>;
      };
      creators: {
        Row: Creator;
        Insert: Omit<Creator, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Creator, 'id' | 'created_at'>>;
      };
      reports: {
        Row: Report;
        Insert: Omit<Report, 'id' | 'created_at'>;
        Update: Partial<Omit<Report, 'id' | 'created_at'>>;
      };
      subscriptions: {
        Row: Subscription;
        Insert: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Subscription, 'id' | 'created_at'>>;
      };
      tags: {
        Row: Tag;
        Insert: Omit<Tag, 'id'>;
        Update: Partial<Omit<Tag, 'id'>>;
      };
    };
  };
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  creator_id: string;
  duration: number; // in seconds
  rating: number; // 1-5 stars
  tags: string[];
  created_at: string;
  updated_at: string;
  view_count: number;
  like_count: number;
  dislike_count: number;
  is_featured: boolean;
  content_warnings: string[];
}

export interface Creator {
  id: string;
  name: string;
  bio: string;
  avatar_url?: string;
  content_count: number;
  links: CreatorLinks;
  status: 'pending' | 'verified' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface CreatorLinks {
  website?: string;
  twitter?: string;
  instagram?: string;
  onlyfans?: string;
  manyvids?: string;
}

export interface Report {
  id: string;
  scene_id: string;
  user_id: string;
  reason: ReportReason;
  description?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  created_at: string;
}

export type ReportReason = 
  | 'inappropriate_content'
  | 'copyright_violation'
  | 'spam'
  | 'harassment'
  | 'underage_content'
  | 'non_consensual'
  | 'other';

export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  payment_status: 'active' | 'past_due' | 'canceled' | 'unpaid';
  stripe_subscription_id?: string;
  current_period_start: string;
  current_period_end: string;
  renewal_date: string;
  created_at: string;
  updated_at: string;
}

export type SubscriptionTier = 'free' | 'premium' | 'premium_xxx';

export interface Tag {
  id: string;
  name: string;
  type: TagType;
  safe_mode: boolean;
  description?: string;
  color?: string;
}

export type TagType = 'mood' | 'genre' | 'intensity' | 'category' | 'orientation';

export interface UserPreferences {
  favorite_tags: string[];
  blocked_tags: string[];
  preferred_duration: 'short' | 'medium' | 'long' | 'any';
  content_intensity: 'soft' | 'medium' | 'intense' | 'any';
  shuffle_algorithm: 'random' | 'smart' | 'trending';
  auto_play: boolean;
  show_content_warnings: boolean;
} 