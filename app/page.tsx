'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import AgeVerification from '@/components/AgeVerification';
import Header from '@/components/Header';
import FeaturedShuffles from '@/components/FeaturedShuffles';
import MoodSelector from '@/components/MoodSelector';
import TrendingTags from '@/components/TrendingTags';
import CreatorSpotlight from '@/components/CreatorSpotlight';
import Footer from '@/components/Footer';

// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic';

export default function HomePage() {
  const { ageVerified, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!ageVerified) {
    return <AgeVerification />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-5xl font-bold mb-4 bg-neon-gradient bg-clip-text text-transparent">
            ShuffleAfterDark
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover curated adult content with intelligent shuffling. 
            Toggle into ShuffleXXX mode for the full experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shuffle" className="btn-primary text-lg px-8 py-3">
              Start Shuffling
            </Link>
            <Link href="/browse" className="btn-secondary text-lg px-8 py-3">
              Browse Content
            </Link>
          </div>
        </section>

        {/* Featured Shuffles */}
        <FeaturedShuffles />

        {/* Shuffle by Mood */}
        <MoodSelector />

        {/* Trending Tags */}
        <TrendingTags />

        {/* Creator Spotlight */}
        <CreatorSpotlight />
      </main>

      <Footer />
    </div>
  );
} 