# AfterDark - Smart Adult Content Shuffle Platform

A premium adult content platform with intelligent shuffling, safe/NSFW toggle, and creator monetization features.

## 🌟 Features

### Core Functionality
- **Smart Shuffle Engine**: AI-powered content recommendation system
- **Safe/NSFW Mode Toggle**: Global content filtering with ShuffleXXX toggle
- **Age Verification**: Secure 18+ age gate protection
- **Creator Dashboard**: Content management for verified creators
- **Premium Subscriptions**: CCBill integration for monetization

### Content Management
- **Multi-tier Content**: Free, Premium, and Premium+XXX tiers
- **Creator Verification**: Verified creator badge system
- **License Tracking**: Content licensing and verification
- **Content Reporting**: DMCA-compliant reporting system
- **Tag-based Filtering**: Advanced content categorization

### User Experience
- **Responsive Design**: Mobile-first, dark theme UI
- **Incognito Mode**: Private browsing with no history tracking
- **Personalized Recommendations**: Based on viewing history and preferences
- **Advanced Search**: Filter by tags, creators, duration, and rating
- **Social Features**: Like, save, and share content

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payment**: CCBill integration
- **Deployment**: Vercel
- **UI Components**: Lucide React icons

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- CCBill merchant account (for payments)
- Vercel account (for deployment)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd ShuffleAfterDark
npm install
```

### 2. Environment Setup

Create `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# CCBill Configuration (Optional)
NEXT_PUBLIC_CCBILL_URL=https://bill.ccbill.com/jpost/signup.cgi
NEXT_PUBLIC_CCBILL_ACCOUNT=your_ccbill_account
NEXT_PUBLIC_CCBILL_SUBACCOUNT=your_ccbill_subaccount

# Optional Services
NEXT_PUBLIC_CDN_URL=your_cdn_url
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the database schema from `supabase/migrations/`
3. Execute the seed data script: `scripts/seed-data.sql`
4. Configure Row Level Security (RLS) policies

### 4. Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

### 5. Production Deployment

Deploy to Vercel:

```bash
npm run build
vercel --prod
```

## 📊 Database Schema

### Core Tables

- **users**: User profiles and subscription data
- **creators**: Content creator information
- **scenes_nsfw**: Adult content metadata
- **user_interactions**: User engagement tracking
- **subscription_history**: Payment and subscription records
- **content_reports**: DMCA and content reporting

### Key Features

- Row Level Security (RLS) enabled
- UUID primary keys
- JSON fields for flexible metadata
- Audit trails with timestamps
- Foreign key relationships

## 🎯 User Roles

### Regular User (`user`)
- Browse and shuffle content
- Save favorites and view history
- Manage account preferences
- Subscribe to premium tiers

### Administrator (`admin`)
- Access creator dashboard
- Manage all content
- Add new scenes and creators
- Handle content reports
- View platform analytics

## 🔐 Security Features

### Age Verification
- Mandatory 18+ age gate
- Persistent verification storage
- Legal compliance measures

### Content Protection
- Safe Mode for SFW-only browsing
- Content warnings and ratings
- NSFW content filtering
- Incognito mode support

### Data Privacy
- GDPR-compliant data handling
- User data export/deletion
- Encrypted data transmission
- Secure payment processing

## 💳 Payment Integration

### CCBill Setup
1. Create CCBill merchant account
2. Configure payment forms for each subscription tier
3. Set up webhook endpoints for subscription management
4. Test payment flows in sandbox mode

### Subscription Tiers
- **Free**: Limited shuffles, SFW content only
- **Premium AfterDark**: Unlimited shuffles, full SFW library, HD quality
- **Premium+XXX**: Everything + full XXX library, 4K quality, downloads

## 🎨 Customization

### Branding
- Update `lib/config.ts` for platform settings
- Modify color scheme in `tailwind.config.js`
- Replace logo and branding assets
- Customize email templates

### Content Categories
- Add new tags in database
- Update filtering logic in browse components
- Modify shuffle algorithm preferences
- Configure content warnings

## 📱 API Endpoints

### Public Routes
- `/` - Home page with featured content
- `/shuffle` - Smart shuffle interface
- `/browse` - Content browsing and search
- `/scene/[id]` - Individual scene pages

### Protected Routes
- `/account` - User account management
- `/creator-dashboard` - Admin content management (admin only)

### Legal Pages
- `/terms` - Terms of Service
- `/privacy` - Privacy Policy
- `/dmca` - DMCA Policy

## 🔧 Configuration

### Feature Flags
Enable/disable features in `lib/config.ts`:

```typescript
features: {
  enableDownloads: true,
  enableComments: false,
  enableRatings: true,
  enableReports: true,
  enableSharing: true,
  enableAnalytics: true,
}
```

### Content Settings
- Maximum shuffle history: 10 items
- Default safe mode: enabled
- File upload limits: 500MB
- Supported formats: MP4, WebM, MOV

## 🚨 Content Moderation

### Automated Systems
- Content scanning for compliance
- Automatic NSFW detection
- Duplicate content prevention
- License verification

### Manual Review
- Creator verification process
- Content quality standards
- Community reporting system
- DMCA takedown procedures

## 📈 Analytics & Monitoring

### User Metrics
- View counts and engagement
- Shuffle algorithm performance
- User retention and conversion
- Content popularity trends

### Business Metrics
- Subscription conversion rates
- Revenue tracking
- Creator performance
- Platform growth metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Component documentation

## 📄 Legal Compliance

### Age Verification
- 18+ age gate implementation
- Legal age verification storage
- Jurisdiction-specific compliance
- Audit trail maintenance

### Content Licensing
- Creator license verification
- DMCA compliance procedures
- Content takedown processes
- Rights management system

### Privacy Compliance
- GDPR data protection
- CCPA compliance
- User consent management
- Data retention policies

## 🆘 Support

### Documentation
- API documentation
- Component library
- Deployment guides
- Troubleshooting guides

### Contact
- Technical Support: `support@afterdark.com`
- DMCA Notices: `dmca@afterdark.com`
- Legal Inquiries: `legal@afterdark.com`
- Privacy Concerns: `privacy@afterdark.com`

## 📝 License

This project is proprietary software. All rights reserved.

## 🔄 Version History

### v1.0.0 (Current)
- Initial platform launch
- Core shuffle functionality
- Creator dashboard
- CCBill payment integration
- Mobile-responsive design

### Planned Features
- Advanced analytics dashboard
- Creator revenue sharing
- Live streaming integration
- Mobile app development
- AI-powered content tagging

---

**⚠️ Important**: This platform is intended for adults 18+ only. Ensure compliance with local laws and regulations regarding adult content distribution. 