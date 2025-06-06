// Base types that are used by other interfaces
export type SubscriptionTier = 'free' | 'premium' | 'premium_xxx';

export type TagType = 'mood' | 'genre' | 'intensity' | 'category' | 'orientation';

export type ReportReason = 
  | 'inappropriate_content'
  | 'copyright_violation'
  | 'spam'
  | 'harassment'
  | 'underage_content'
  | 'non_consensual'
  | 'other';

export interface UserPreferences {
  favoriteGenres: string[];
  blockedTags: string[];
  preferredDuration: 'short' | 'medium' | 'long' | 'any';
  contentIntensity: 'soft' | 'medium' | 'intense' | 'any';
  shuffleAlgorithm: 'random' | 'smart' | 'trending';
  autoPlay: boolean;
  showContentWarnings: boolean;
  privateHistory: boolean;
}

export interface CreatorLinks {
  website?: string;
  twitter?: string;
  instagram?: string;
  onlyfans?: string;
  manyvids?: string;
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

export interface Report {
  id: string;
  scene_id: string;
  user_id: string;
  reason: ReportReason;
  description?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  created_at: string;
}

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

export interface Tag {
  id: string;
  name: string;
  type: TagType;
  safe_mode: boolean;
  description?: string;
  color?: string;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      content_reports: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          description: string | null
          id: string
          report_type: string
          reporter_id: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          scene_id: string | null
          status: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          report_type: string
          reporter_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scene_id?: string | null
          status?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          report_type?: string
          reporter_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scene_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_reports_scene_id_fkey"
            columns: ["scene_id"]
            isOneToOne: false
            referencedRelation: "scenes_nsfw"
            referencedColumns: ["id"]
          },
        ]
      }
      creators: {
        Row: {
          avatar_url: string | null
          bio: string | null
          contact_email: string | null
          content_count: number | null
          created_at: string | null
          id: string
          is_verified: boolean | null
          license_status: string | null
          name: string
          total_earnings: number | null
          total_views: number | null
          updated_at: string | null
          verification_documents: Json | null
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          contact_email?: string | null
          content_count?: number | null
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          license_status?: string | null
          name: string
          total_earnings?: number | null
          total_views?: number | null
          updated_at?: string | null
          verification_documents?: Json | null
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          contact_email?: string | null
          content_count?: number | null
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          license_status?: string | null
          name?: string
          total_earnings?: number | null
          total_views?: number | null
          updated_at?: string | null
          verification_documents?: Json | null
          website_url?: string | null
        }
        Relationships: []
      }
      scenes_nsfw: {
        Row: {
          age_rating: string | null
          content_warnings: string[] | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          dislike_count: number | null
          duration: number
          id: string
          is_active: boolean | null
          is_nsfw: boolean | null
          is_premium: boolean | null
          license_url: string | null
          license_verified: boolean | null
          like_count: number | null
          published_at: string | null
          rating: number | null
          tags: string[] | null
          thumbnail_nsfw_url: string | null
          thumbnail_sfw_url: string | null
          title: string
          updated_at: string | null
          video_url: string
          view_count: number | null
        }
        Insert: {
          age_rating?: string | null
          content_warnings?: string[] | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          dislike_count?: number | null
          duration: number
          id?: string
          is_active?: boolean | null
          is_nsfw?: boolean | null
          is_premium?: boolean | null
          license_url?: string | null
          license_verified?: boolean | null
          like_count?: number | null
          published_at?: string | null
          rating?: number | null
          tags?: string[] | null
          thumbnail_nsfw_url?: string | null
          thumbnail_sfw_url?: string | null
          title: string
          updated_at?: string | null
          video_url: string
          view_count?: number | null
        }
        Update: {
          age_rating?: string | null
          content_warnings?: string[] | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          dislike_count?: number | null
          duration?: number
          id?: string
          is_active?: boolean | null
          is_nsfw?: boolean | null
          is_premium?: boolean | null
          license_url?: string | null
          license_verified?: boolean | null
          like_count?: number | null
          published_at?: string | null
          rating?: number | null
          tags?: string[] | null
          thumbnail_nsfw_url?: string | null
          thumbnail_sfw_url?: string | null
          title?: string
          updated_at?: string | null
          video_url?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "scenes_nsfw_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_history: {
        Row: {
          amount: number | null
          created_at: string | null
          currency: string | null
          ended_at: string | null
          id: string
          payment_provider: string | null
          payment_reference: string | null
          started_at: string | null
          subscription_status: string
          subscription_tier: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          ended_at?: string | null
          id?: string
          payment_provider?: string | null
          payment_reference?: string | null
          started_at?: string | null
          subscription_status: string
          subscription_tier: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          ended_at?: string | null
          id?: string
          payment_provider?: string | null
          payment_reference?: string | null
          started_at?: string | null
          subscription_status?: string
          subscription_tier?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_interactions: {
        Row: {
          created_at: string | null
          id: string
          interaction_type: string
          metadata: Json | null
          scene_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interaction_type: string
          metadata?: Json | null
          scene_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interaction_type?: string
          metadata?: Json | null
          scene_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_interactions_scene_id_fkey"
            columns: ["scene_id"]
            isOneToOne: false
            referencedRelation: "scenes_nsfw"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          age_verified: boolean | null
          avatar_url: string | null
          created_at: string | null
          email: string
          id: string
          preferences: Json | null
          role: string | null
          subscription_expires_at: string | null
          subscription_status: string | null
          subscription_tier: string | null
          updated_at: string | null
          username: string
        }
        Insert: {
          age_verified?: boolean | null
          avatar_url?: string | null
          created_at?: string | null
          email: string
          id?: string
          preferences?: Json | null
          role?: string | null
          subscription_expires_at?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
          username: string
        }
        Update: {
          age_verified?: boolean | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          id?: string
          preferences?: Json | null
          role?: string | null
          subscription_expires_at?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

// Scene data interface
export interface SceneData {
  id: string;
  title: string;
  description: string | null;
  thumbnail_sfw_url: string | null;
  thumbnail_nsfw_url: string | null;
  video_url: string;
  tags: string[] | null;
  duration: number;
  creator_id: string | null;
  license_url: string | null;
  license_verified: boolean | null;
  content_warnings: string[] | null;
  age_rating: string | null;
  is_nsfw: boolean | null;
  is_premium: boolean | null;
  is_active: boolean | null;
  view_count: number | null;
  like_count: number | null;
  dislike_count: number | null;
  rating: number | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  creator?: CreatorData | null;
}

// Creator data interface
export interface CreatorData {
  id: string;
  name: string;
  bio: string | null;
  website_url: string | null;
  contact_email: string | null;
  avatar_url: string | null;
  license_status: string | null;
  is_verified: boolean | null;
  content_count: number | null;
  total_views: number | null;
  total_earnings: number | null;
  verification_documents: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

// User data interface
export interface UserData {
  id: string;
  email: string;
  username: string;
  avatar_url: string | null;
  role: string | null;
  subscription_tier: string | null;
  subscription_status: string | null;
  subscription_expires_at: string | null;
  age_verified: boolean | null;
  preferences: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

// Subscription tiers
export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PREMIUM: 'premium',
  PREMIUM_XXX: 'premium_xxx',
} as const;

// User roles
export const USER_ROLES = {
  USER: 'user',
  CREATOR: 'creator',
  ADMIN: 'admin',
} as const;

// Content report types
export const REPORT_TYPES = {
  INAPPROPRIATE_CONTENT: 'inappropriate_content',
  COPYRIGHT_VIOLATION: 'copyright_violation',
  SPAM: 'spam',
  HARASSMENT: 'harassment',
  UNDERAGE_CONTENT: 'underage_content',
  NON_CONSENSUAL: 'non_consensual',
  OTHER: 'other',
} as const; 