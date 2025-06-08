-- AfterDark Sample Data Seeding Script
-- This script populates the database with sample creators and scenes for testing

-- Insert sample creators
INSERT INTO public.creators (id, name, bio, is_verified, content_count, created_at) VALUES
('creator-1', 'Luna Rose', 'Award-winning adult performer specializing in romantic and artistic content. Verified creator with 5+ years experience.', true, 15, NOW()),
('creator-2', 'Alex Storm', 'Couples content creator focusing on authentic intimacy and connection. LGBTQ+ advocate and sex-positive educator.', true, 12, NOW()),
('creator-3', 'Sophia Dreams', 'Independent artist creating sensual and artistic adult content. Specializes in softcore and aesthetic visuals.', false, 8, NOW()),
('creator-4', 'Marcus & Maya', 'Real couple sharing their intimate moments. Passionate about showing authentic love and connection.', true, 20, NOW()),
('creator-5', 'Raven Black', 'Premium content creator specializing in intense and explicit material. Professional performer and director.', true, 25, NOW());

-- Insert sample scenes
INSERT INTO public.scenes_nsfw (
  id, title, description, video_url, thumbnail_sfw_url, thumbnail_nsfw_url, 
  duration, tags, creator_id, license_url, license_verified, content_warnings, 
  age_rating, is_nsfw, is_premium, is_active, view_count, like_count, 
  dislike_count, rating, published_at, created_at
) VALUES

-- Scene 1: Romantic SFW content
(
  'scene-1',
  'Sunset Romance',
  'A beautiful romantic scene featuring intimate moments between lovers during golden hour. Artistic cinematography with soft lighting and emotional connection.',
  'https://example.com/videos/sunset-romance',
  'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=450&fit=crop',
  1200,
  ARRAY['romantic', 'couples', 'artistic', 'softcore', 'intimate'],
  'creator-1',
  'https://example.com/licenses/scene-1',
  true,
  ARRAY['mild nudity', 'sexual content'],
  '18+',
  false,
  false,
  true,
  15420,
  892,
  23,
  4.7,
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days'
),

-- Scene 2: Couples content (NSFW)
(
  'scene-2',
  'Real Love Connection',
  'Authentic intimate moments between a real couple. Features genuine passion and emotional connection with beautiful cinematography.',
  'https://example.com/videos/real-love',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=450&fit=crop',
  1800,
  ARRAY['couples', 'authentic', 'passionate', 'intimate', 'real'],
  'creator-4',
  'https://example.com/licenses/scene-2',
  true,
  ARRAY['explicit sexual content', 'nudity'],
  '18+',
  true,
  false,
  true,
  28750,
  1456,
  67,
  4.8,
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days'
),

-- Scene 3: Artistic content
(
  'scene-3',
  'Artistic Sensuality',
  'A visually stunning piece combining art and sensuality. Features creative lighting, shadows, and artistic nude photography in motion.',
  'https://example.com/videos/artistic-sensuality',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=450&fit=crop',
  900,
  ARRAY['artistic', 'sensual', 'creative', 'aesthetic', 'photography'],
  'creator-3',
  'https://example.com/licenses/scene-3',
  false,
  ARRAY['artistic nudity', 'sensual content'],
  '18+',
  false,
  false,
  true,
  9340,
  567,
  12,
  4.5,
  NOW() - INTERVAL '7 days',
  NOW() - INTERVAL '7 days'
),

-- Scene 4: Premium explicit content
(
  'scene-4',
  'Intense Passion Premium',
  'High-quality premium content featuring intense and passionate encounters. Professional production with 4K quality and multiple camera angles.',
  'https://example.com/videos/intense-passion',
  'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=450&fit=crop',
  2400,
  ARRAY['explicit', 'intense', 'premium', 'professional', '4k'],
  'creator-5',
  'https://example.com/licenses/scene-4',
  true,
  ARRAY['explicit sexual content', 'intense scenes', 'adult themes'],
  '18+',
  true,
  true,
  true,
  45230,
  2134,
  89,
  4.9,
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
),

-- Scene 5: LGBTQ+ content
(
  'scene-5',
  'Love is Love',
  'Beautiful representation of LGBTQ+ love and intimacy. Celebrates diversity and authentic connection between partners of all orientations.',
  'https://example.com/videos/love-is-love',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=450&fit=crop',
  1500,
  ARRAY['lgbtq', 'diversity', 'authentic', 'love', 'inclusive'],
  'creator-2',
  'https://example.com/licenses/scene-5',
  true,
  ARRAY['sexual content', 'nudity'],
  '18+',
  true,
  false,
  true,
  18920,
  1023,
  34,
  4.6,
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days'
),

-- Scene 6: Solo artistic content
(
  'scene-6',
  'Solo Elegance',
  'Elegant solo performance focusing on self-love and body positivity. Artistic approach with beautiful lighting and empowering message.',
  'https://example.com/videos/solo-elegance',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=450&fit=crop',
  1080,
  ARRAY['solo', 'artistic', 'empowering', 'elegant', 'self-love'],
  'creator-1',
  'https://example.com/licenses/scene-6',
  true,
  ARRAY['nudity', 'sexual content'],
  '18+',
  false,
  false,
  true,
  12450,
  734,
  18,
  4.4,
  NOW() - INTERVAL '4 days',
  NOW() - INTERVAL '4 days'
),

-- Scene 7: Educational content
(
  'scene-7',
  'Intimacy Guide',
  'Educational content about intimacy and connection. Features real couples demonstrating healthy sexual communication and techniques.',
  'https://example.com/videos/intimacy-guide',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=450&fit=crop',
  2100,
  ARRAY['educational', 'couples', 'communication', 'techniques', 'healthy'],
  'creator-2',
  'https://example.com/licenses/scene-7',
  true,
  ARRAY['educational sexual content', 'nudity'],
  '18+',
  true,
  false,
  true,
  22180,
  1345,
  45,
  4.7,
  NOW() - INTERVAL '6 days',
  NOW() - INTERVAL '6 days'
),

-- Scene 8: Premium couples content
(
  'scene-8',
  'Premium Intimacy',
  'Exclusive premium content featuring real couples in intimate moments. High production value with multiple camera angles and professional editing.',
  'https://example.com/videos/premium-intimacy',
  'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=450&fit=crop',
  1950,
  ARRAY['premium', 'couples', 'intimate', 'professional', 'exclusive'],
  'creator-4',
  'https://example.com/licenses/scene-8',
  true,
  ARRAY['explicit sexual content', 'nudity'],
  '18+',
  true,
  true,
  true,
  38750,
  1987,
  76,
  4.8,
  NOW() - INTERVAL '8 hours',
  NOW() - INTERVAL '8 hours'
);

-- Update creator content counts
UPDATE public.creators SET content_count = (
  SELECT COUNT(*) FROM public.scenes_nsfw WHERE creator_id = creators.id AND is_active = true
);

-- Insert some sample user interactions (for testing)
-- Note: These would normally be created by actual user interactions
INSERT INTO public.user_interactions (scene_id, interaction_type, created_at) VALUES
('scene-1', 'view', NOW() - INTERVAL '1 hour'),
('scene-1', 'like', NOW() - INTERVAL '45 minutes'),
('scene-2', 'view', NOW() - INTERVAL '2 hours'),
('scene-2', 'favorite', NOW() - INTERVAL '1.5 hours'),
('scene-3', 'view', NOW() - INTERVAL '30 minutes'),
('scene-4', 'view', NOW() - INTERVAL '3 hours'),
('scene-4', 'like', NOW() - INTERVAL '2.5 hours'),
('scene-5', 'view', NOW() - INTERVAL '4 hours'),
('scene-6', 'view', NOW() - INTERVAL '20 minutes'),
('scene-7', 'view', NOW() - INTERVAL '1 day'),
('scene-8', 'view', NOW() - INTERVAL '6 hours'),
('scene-8', 'favorite', NOW() - INTERVAL '5 hours');

-- Create a sample admin user (you'll need to sign up normally first, then update the role)
-- This is just a placeholder - actual user creation happens through Supabase Auth
-- UPDATE public.users SET role = 'admin' WHERE email = 'admin@afterdark.com';

COMMIT; 