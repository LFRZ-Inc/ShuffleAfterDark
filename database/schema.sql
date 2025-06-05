-- ShuffleAfterDark Database Schema
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE subscription_tier AS ENUM ('free', 'premium', 'premium_xxx');
CREATE TYPE tag_type AS ENUM ('mood', 'genre', 'intensity', 'category', 'orientation');
CREATE TYPE report_reason AS ENUM (
  'inappropriate_content',
  'copyright_violation', 
  'spam',
  'harassment',
  'underage_content',
  'non_consensual',
  'other'
);
CREATE TYPE creator_status AS ENUM ('pending', 'verified', 'suspended');
CREATE TYPE payment_status AS ENUM ('active', 'past_due', 'canceled', 'unpaid');
CREATE TYPE report_status AS ENUM ('pending', 'reviewed', 'resolved', 'dismissed');

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  preferences JSONB DEFAULT '{
    "favorite_tags": [],
    "blocked_tags": [],
    "preferred_duration": "any",
    "content_intensity": "any",
    "shuffle_algorithm": "smart",
    "auto_play": false,
    "show_content_warnings": true
  }'::jsonb,
  shuffle_history TEXT[] DEFAULT '{}',
  subscription_status subscription_tier DEFAULT 'free',
  age_verified BOOLEAN DEFAULT FALSE,
  incognito_mode BOOLEAN DEFAULT FALSE
);

-- Creators table
CREATE TABLE creators (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  content_count INTEGER DEFAULT 0,
  links JSONB DEFAULT '{}'::jsonb,
  status creator_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags table
CREATE TABLE tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  type tag_type NOT NULL,
  safe_mode BOOLEAN DEFAULT TRUE,
  description TEXT,
  color TEXT
);

-- SFW Scenes table
CREATE TABLE scenes_sfw (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  video_url TEXT,
  creator_id UUID REFERENCES creators(id),
  duration INTEGER, -- in seconds
  rating DECIMAL(2,1) DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  dislike_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  content_warnings TEXT[] DEFAULT '{}'
);

-- NSFW Scenes table (same structure as SFW)
CREATE TABLE scenes_nsfw (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  video_url TEXT,
  creator_id UUID REFERENCES creators(id),
  duration INTEGER, -- in seconds
  rating DECIMAL(2,1) DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  dislike_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  content_warnings TEXT[] DEFAULT '{}'
);

-- Reports table
CREATE TABLE reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  scene_id UUID, -- Can reference either SFW or NSFW scenes
  user_id UUID REFERENCES users(id),
  reason report_reason NOT NULL,
  description TEXT,
  status report_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  tier subscription_tier NOT NULL,
  payment_status payment_status DEFAULT 'active',
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  renewal_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User favorites table
CREATE TABLE user_favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  scene_id UUID, -- Can reference either SFW or NSFW scenes
  scene_type TEXT CHECK (scene_type IN ('sfw', 'nsfw')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, scene_id, scene_type)
);

-- User ratings table
CREATE TABLE user_ratings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  scene_id UUID, -- Can reference either SFW or NSFW scenes
  scene_type TEXT CHECK (scene_type IN ('sfw', 'nsfw')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, scene_id, scene_type)
);

-- View history table
CREATE TABLE view_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  scene_id UUID, -- Can reference either SFW or NSFW scenes
  scene_type TEXT CHECK (scene_type IN ('sfw', 'nsfw')),
  watch_duration INTEGER, -- in seconds
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription ON users(subscription_status);
CREATE INDEX idx_scenes_sfw_creator ON scenes_sfw(creator_id);
CREATE INDEX idx_scenes_sfw_featured ON scenes_sfw(is_featured);
CREATE INDEX idx_scenes_sfw_rating ON scenes_sfw(rating DESC);
CREATE INDEX idx_scenes_sfw_created ON scenes_sfw(created_at DESC);
CREATE INDEX idx_scenes_sfw_tags ON scenes_sfw USING GIN(tags);
CREATE INDEX idx_scenes_nsfw_creator ON scenes_nsfw(creator_id);
CREATE INDEX idx_scenes_nsfw_featured ON scenes_nsfw(is_featured);
CREATE INDEX idx_scenes_nsfw_rating ON scenes_nsfw(rating DESC);
CREATE INDEX idx_scenes_nsfw_created ON scenes_nsfw(created_at DESC);
CREATE INDEX idx_scenes_nsfw_tags ON scenes_nsfw USING GIN(tags);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_user ON reports(user_id);
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(payment_status);
CREATE INDEX idx_user_favorites_user ON user_favorites(user_id);
CREATE INDEX idx_user_ratings_user ON user_ratings(user_id);
CREATE INDEX idx_view_history_user ON view_history(user_id);
CREATE INDEX idx_view_history_scene ON view_history(scene_id, scene_type);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_creators_updated_at BEFORE UPDATE ON creators
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scenes_sfw_updated_at BEFORE UPDATE ON scenes_sfw
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scenes_nsfw_updated_at BEFORE UPDATE ON scenes_nsfw
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_ratings_updated_at BEFORE UPDATE ON user_ratings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE view_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can only see/edit their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- User favorites policies
CREATE POLICY "Users can view own favorites" ON user_favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites" ON user_favorites
  FOR ALL USING (auth.uid() = user_id);

-- User ratings policies
CREATE POLICY "Users can view own ratings" ON user_ratings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own ratings" ON user_ratings
  FOR ALL USING (auth.uid() = user_id);

-- View history policies
CREATE POLICY "Users can view own history" ON view_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own history" ON view_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reports policies
CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create reports" ON reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Public read access for content (with proper filtering in app)
CREATE POLICY "Public can view SFW scenes" ON scenes_sfw
  FOR SELECT USING (true);

CREATE POLICY "Public can view NSFW scenes" ON scenes_nsfw
  FOR SELECT USING (true);

CREATE POLICY "Public can view creators" ON creators
  FOR SELECT USING (true);

CREATE POLICY "Public can view tags" ON tags
  FOR SELECT USING (true);

-- Insert sample data
INSERT INTO tags (name, type, safe_mode, description, color) VALUES
  ('romantic', 'mood', true, 'Romantic and intimate content', '#ec4899'),
  ('artistic', 'mood', true, 'Artistic and creative expression', '#8b5cf6'),
  ('couples', 'category', true, 'Content featuring couples', '#06b6d4'),
  ('solo', 'category', true, 'Individual performances', '#10b981'),
  ('lgbtq', 'orientation', true, 'LGBTQ+ inclusive content', '#f59e0b'),
  ('explicit', 'intensity', false, 'Explicit adult content', '#ef4444'),
  ('hardcore', 'intensity', false, 'Hardcore adult content', '#dc2626'),
  ('fetish', 'category', false, 'Fetish and kink content', '#7c2d12');

INSERT INTO creators (name, bio, status) VALUES
  ('Artistic Expressions', 'Creating beautiful and intimate content for couples', 'verified'),
  ('Creative Studios', 'Professional romantic and sensual content', 'verified'),
  ('Real Couples', 'Authentic couples sharing intimate moments', 'verified'),
  ('Premium Creator', 'High-quality explicit adult content', 'verified');

-- Sample SFW content
INSERT INTO scenes_sfw (title, description, creator_id, duration, rating, tags, is_featured) VALUES
  ('Romantic Sunset', 'A beautiful and intimate scene perfect for couples', 
   (SELECT id FROM creators WHERE name = 'Artistic Expressions'), 754, 4.8, 
   ARRAY['romantic', 'couples', 'intimate'], true),
  ('Artistic Expression', 'Creative and sensual artistic content', 
   (SELECT id FROM creators WHERE name = 'Creative Studios'), 525, 4.6, 
   ARRAY['artistic', 'creative', 'sensual'], true),
  ('Couples Intimacy', 'Real couples sharing intimate moments', 
   (SELECT id FROM creators WHERE name = 'Real Couples'), 1092, 4.7, 
   ARRAY['couples', 'real', 'intimate'], false);

-- Sample NSFW content (only if XXX mode is enabled)
INSERT INTO scenes_nsfw (title, description, creator_id, duration, rating, tags, is_featured) VALUES
  ('XXX Premium Scene', 'Explicit premium adult content', 
   (SELECT id FROM creators WHERE name = 'Premium Creator'), 920, 4.9, 
   ARRAY['explicit', 'premium', 'hardcore'], true);

-- Create functions for shuffle algorithm
CREATE OR REPLACE FUNCTION get_shuffle_recommendations(
  user_uuid UUID,
  xxx_enabled BOOLEAN DEFAULT FALSE,
  limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
  scene_id UUID,
  title TEXT,
  description TEXT,
  thumbnail_url TEXT,
  duration INTEGER,
  rating DECIMAL,
  tags TEXT[],
  creator_name TEXT,
  is_nsfw BOOLEAN,
  score DECIMAL
) AS $$
BEGIN
  -- This is a simplified shuffle algorithm
  -- In production, this would be much more sophisticated
  
  IF xxx_enabled THEN
    RETURN QUERY
    SELECT 
      s.id,
      s.title,
      s.description,
      s.thumbnail_url,
      s.duration,
      s.rating,
      s.tags,
      c.name,
      true as is_nsfw,
      (s.rating * 0.4 + (s.view_count::decimal / 1000) * 0.3 + random() * 0.3) as score
    FROM scenes_nsfw s
    JOIN creators c ON s.creator_id = c.id
    WHERE s.id NOT IN (
      SELECT scene_id FROM view_history 
      WHERE user_id = user_uuid 
      AND scene_type = 'nsfw' 
      AND created_at > NOW() - INTERVAL '7 days'
    )
    ORDER BY score DESC
    LIMIT limit_count;
  ELSE
    RETURN QUERY
    SELECT 
      s.id,
      s.title,
      s.description,
      s.thumbnail_url,
      s.duration,
      s.rating,
      s.tags,
      c.name,
      false as is_nsfw,
      (s.rating * 0.4 + (s.view_count::decimal / 1000) * 0.3 + random() * 0.3) as score
    FROM scenes_sfw s
    JOIN creators c ON s.creator_id = c.id
    WHERE s.id NOT IN (
      SELECT scene_id FROM view_history 
      WHERE user_id = user_uuid 
      AND scene_type = 'sfw' 
      AND created_at > NOW() - INTERVAL '7 days'
    )
    ORDER BY score DESC
    LIMIT limit_count;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 