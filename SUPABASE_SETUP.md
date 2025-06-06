# Supabase Setup for ShuffleAfterDark

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://eefdbuxenkzmeqsbejmu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlZmRidXhlbmt6bWVxc2Jlam11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxOTA2OTYsImV4cCI6MjA2NDc2NjY5Nn0.stEX_1pOjoh4C9egvWbts8FTPx-woJznY7xkKxz9OM4
```

## Database Schema

The following tables have been created in your Supabase project:

### Core Tables

1. **users** - User profiles and authentication
2. **creators** - Content creator information
3. **scenes_nsfw** - Adult content scenes with metadata
4. **user_interactions** - User likes, views, favorites
5. **subscription_history** - Payment and subscription tracking
6. **content_reports** - Content moderation reports

### Sample Data

The database has been seeded with:
- 5 verified creators
- 5 sample scenes with affiliate links
- Proper licensing and content warnings

## Admin Access

To become an admin user:

1. Sign up for an account through the app
2. Update your user role in Supabase dashboard:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```
3. Access the Creator Dashboard at `/creator-dashboard`

## Features Implemented

✅ **Content Management**
- Scene upload with SFW/NSFW thumbnails
- Creator attribution and licensing
- Content warnings and age ratings
- Active/inactive status toggle

✅ **User Management**
- Role-based access (user/creator/admin)
- Subscription tiers (free/premium/premium_xxx)
- User preferences and settings

✅ **Content Filtering**
- XXX mode toggle for NSFW content
- Safe mode for SFW-only viewing
- Premium content restrictions

✅ **Admin Dashboard**
- Scene management interface
- Creator verification system
- Content moderation tools

## Next Steps

1. Set up CCBill/Segpay payment integration
2. Configure email notifications
3. Add content recommendation algorithms
4. Implement advanced analytics

## Security Notes

- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data
- Admins have elevated permissions for content management
- Age verification is enforced throughout the platform 