-- AfterDark Test Data Script
-- Run this in your Supabase SQL editor to add test content

-- Insert test creators
INSERT INTO creators (name, bio, website_url, contact_email, is_verified, content_count) VALUES 
('Luna Rose', 'Professional adult content creator specializing in artistic and romantic content.', 'https://lunarose.example.com', 'luna@example.com', true, 3),
('Alex Storm', 'Verified creator focusing on couples content and intimate storytelling.', 'https://alexstorm.example.com', 'alex@example.com', true, 2),
('Maya Dreams', 'Independent creator producing high-quality artistic adult content.', 'https://mayadreams.example.com', 'maya@example.com', true, 1),
('Phoenix Fire', 'Award-winning adult performer and content creator.', 'https://phoenixfire.example.com', 'phoenix@example.com', true, 2),
('Sage Waters', 'Artistic nude photographer and videographer.', 'https://sagewaters.example.com', 'sage@example.com', true, 1)
ON CONFLICT (name) DO UPDATE SET
  bio = EXCLUDED.bio,
  website_url = EXCLUDED.website_url,
  contact_email = EXCLUDED.contact_email,
  is_verified = EXCLUDED.is_verified,
  content_count = EXCLUDED.content_count;

-- Insert test scenes
INSERT INTO scenes_nsfw (
  title, description, thumbnail_sfw_url, thumbnail_nsfw_url, video_url, 
  tags, duration, creator_id, is_nsfw, is_premium, is_active, view_count, like_count, rating
) VALUES
(
  'Romantic Evening',
  'A beautiful artistic scene featuring intimate moments between partners in a romantic setting. This content showcases the emotional connection and tender moments shared between two people.',
  'https://picsum.photos/400/300?random=1',
  'https://picsum.photos/400/300?random=11',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  ARRAY['romantic', 'couples', 'intimate', 'artistic'],
  1200,
  (SELECT id FROM creators WHERE name = 'Luna Rose' LIMIT 1),
  true,
  false,
  true,
  1250,
  89,
  4.5
),
(
  'Artistic Expression',
  'A tasteful exploration of human form and emotion through artistic cinematography. This piece focuses on the beauty of the human body as art.',
  'https://picsum.photos/400/300?random=2',
  'https://picsum.photos/400/300?random=12',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  ARRAY['artistic', 'solo', 'aesthetic', 'creative'],
  900,
  (SELECT id FROM creators WHERE name = 'Maya Dreams' LIMIT 1),
  false,
  false,
  true,
  890,
  67,
  4.2
),
(
  'Passionate Moments',
  'An intimate portrayal of passion and connection between two people. This scene captures the raw emotion and intensity of intimate relationships.',
  'https://picsum.photos/400/300?random=3',
  'https://picsum.photos/400/300?random=13',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  ARRAY['passionate', 'couples', 'intense', 'romantic'],
  1800,
  (SELECT id FROM creators WHERE name = 'Alex Storm' LIMIT 1),
  true,
  true,
  true,
  2100,
  156,
  4.7
),
(
  'Sensual Dance',
  'A mesmerizing performance combining dance and sensuality in an artistic presentation. This content showcases movement as a form of expression.',
  'https://picsum.photos/400/300?random=4',
  'https://picsum.photos/400/300?random=14',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  ARRAY['dance', 'sensual', 'performance', 'artistic'],
  720,
  (SELECT id FROM creators WHERE name = 'Phoenix Fire' LIMIT 1),
  false,
  false,
  true,
  567,
  43,
  4.0
),
(
  'Premium Collection',
  'Exclusive premium content featuring high-quality production and intimate storytelling. This is part of our premium tier offering.',
  'https://picsum.photos/400/300?random=5',
  'https://picsum.photos/400/300?random=15',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  ARRAY['premium', 'exclusive', 'intimate', 'storytelling'],
  2400,
  (SELECT id FROM creators WHERE name = 'Sage Waters' LIMIT 1),
  true,
  true,
  true,
  3200,
  234,
  4.8
),
(
  'Gentle Intimacy',
  'A soft and tender exploration of intimacy between partners. Perfect for those who prefer gentler content.',
  'https://picsum.photos/400/300?random=6',
  'https://picsum.photos/400/300?random=16',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  ARRAY['gentle', 'intimate', 'soft', 'romantic'],
  1500,
  (SELECT id FROM creators WHERE name = 'Luna Rose' LIMIT 1),
  true,
  false,
  true,
  980,
  72,
  4.3
),
(
  'Creative Expression',
  'An avant-garde approach to adult content that pushes artistic boundaries. This piece is both provocative and thoughtful.',
  'https://picsum.photos/400/300?random=7',
  'https://picsum.photos/400/300?random=17',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  ARRAY['creative', 'artistic', 'avant-garde', 'experimental'],
  1080,
  (SELECT id FROM creators WHERE name = 'Maya Dreams' LIMIT 1),
  false,
  true,
  true,
  654,
  45,
  4.1
),
(
  'Couples Retreat',
  'A beautiful portrayal of a couple''s intimate getaway. This scene captures the romance and passion of a private retreat.',
  'https://picsum.photos/400/300?random=8',
  'https://picsum.photos/400/300?random=18',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  ARRAY['couples', 'romantic', 'getaway', 'intimate'],
  2100,
  (SELECT id FROM creators WHERE name = 'Alex Storm' LIMIT 1),
  true,
  true,
  true,
  1876,
  134,
  4.6
)
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  thumbnail_sfw_url = EXCLUDED.thumbnail_sfw_url,
  thumbnail_nsfw_url = EXCLUDED.thumbnail_nsfw_url,
  video_url = EXCLUDED.video_url,
  tags = EXCLUDED.tags,
  duration = EXCLUDED.duration,
  creator_id = EXCLUDED.creator_id,
  is_nsfw = EXCLUDED.is_nsfw,
  is_premium = EXCLUDED.is_premium,
  is_active = EXCLUDED.is_active,
  view_count = EXCLUDED.view_count,
  like_count = EXCLUDED.like_count,
  rating = EXCLUDED.rating;

-- Update creator content counts
UPDATE creators SET content_count = (
  SELECT COUNT(*) FROM scenes_nsfw WHERE creator_id = creators.id AND is_active = true
);

-- Add some sample user interactions (optional)
INSERT INTO user_interactions (scene_id, interaction_type, metadata) 
SELECT 
  s.id,
  'view',
  '{"timestamp": "2024-01-15T10:30:00Z"}'::json
FROM scenes_nsfw s 
WHERE s.is_active = true
LIMIT 20
ON CONFLICT DO NOTHING;

-- Verify the data was inserted
SELECT 
  'Creators' as table_name, 
  COUNT(*) as count 
FROM creators
UNION ALL
SELECT 
  'Scenes' as table_name, 
  COUNT(*) as count 
FROM scenes_nsfw
UNION ALL
SELECT 
  'Active Scenes' as table_name, 
  COUNT(*) as count 
FROM scenes_nsfw 
WHERE is_active = true; 