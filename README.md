# ShuffleAfterDark - Smart Adult Content Shuffler

A sophisticated adult content platform with intelligent shuffling, built with Next.js, TypeScript, and Supabase.

## 🌟 Features

### Core Features
- **Smart Shuffle Algorithm**: Intelligent content recommendation based on user preferences
- **Safe Mode / XXX Mode Toggle**: Seamless switching between SFW and NSFW content
- **Age Verification**: Robust 18+ verification system
- **Incognito Mode**: Privacy-focused browsing with no tracking
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### Content Management
- **Curated Content**: Ethically sourced from verified creators
- **Advanced Filtering**: Search by mood, tags, duration, rating
- **Creator Spotlight**: Featured content creators and studios
- **Content Warnings**: Clear labeling and user preferences

### User Experience
- **Dark Theme**: Elegant dark UI with neon accents
- **Smooth Animations**: Framer Motion powered interactions
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: Graceful error boundaries and fallbacks

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payments**: Stripe integration for subscriptions
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context + Cookies/LocalStorage

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shuffle-after-dark.git
   cd shuffle-after-dark
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   
   # App Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_random_secret
   ```

4. **Set up Supabase database**
   
   Run the SQL migrations in your Supabase dashboard:
   ```sql
   -- Create tables for users, scenes, creators, etc.
   -- See database/schema.sql for complete schema
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
shuffle-after-dark/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── shuffle/           # Shuffle page
│   ├── browse/            # Browse content page
│   └── ...
├── components/            # Reusable UI components
│   ├── AgeVerification.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── context/               # React Context providers
│   └── AppContext.tsx     # Global app state
├── lib/                   # Utilities and configurations
│   └── supabase.ts        # Supabase client
├── types/                 # TypeScript type definitions
│   ├── database.ts        # Database types
│   └── index.ts           # App types
└── ...
```

## 🔐 Security & Privacy

### Age Verification
- Mandatory 18+ verification with date validation
- Country-based compliance checking
- Persistent verification with privacy options

### Content Safety
- Clear NSFW/SFW content separation
- Content warnings and user preferences
- Report system for inappropriate content

### Privacy Features
- Incognito mode for anonymous browsing
- No tracking in private mode
- GDPR compliant data handling
- Secure session management

## 🎨 Design System

### Colors
- **Primary**: Pink/Red gradient (#ff0080 to #ec4899)
- **Dark**: Slate color palette (#0f172a to #64748b)
- **Neon**: Accent colors for highlights

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Consistent sizing and weights

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient primary, solid secondary
- **Forms**: Dark theme with focus states

## 🔄 Shuffle Algorithm

The smart shuffle system considers:
- User preferences and viewing history
- Content ratings and popularity
- Mood and tag preferences
- Time-based patterns
- Exclusion of recently viewed content

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Large tap targets and gestures
- **Performance**: Optimized images and lazy loading

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Full support with serverless functions
- **Railway**: Database and app hosting
- **DigitalOcean**: App Platform deployment

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

## 📈 Performance

- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Aggressive caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Legal Notice

This application is intended for adults 18 years or older. By using this software, you acknowledge that you are of legal age in your jurisdiction to view adult content.

## 🆘 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join GitHub Discussions for questions

## 🔮 Roadmap

- [ ] Creator dashboard and upload system
- [ ] Advanced analytics and insights
- [ ] Mobile app (React Native)
- [ ] AI-powered content recommendations
- [ ] Live streaming integration
- [ ] Community features and social aspects
- [ ] Multi-language support
- [ ] Advanced payment options

---

**Built with ❤️ for the adult content creator community** 