'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import AgeVerification from '@/components/AgeVerification';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shuffle, Play, Heart, Star } from 'lucide-react';

// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic';

export default function HomePage() {
  const { ageVerified, isLoading, safeMode } = useApp();

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

  const featuredCategories = [
    { name: 'Romantic Nights', icon: Heart, description: 'Intimate and passionate content' },
    { name: 'Couples Play', icon: Play, description: 'Real couples sharing moments' },
    { name: 'Softcore', icon: Star, description: 'Artistic and sensual content' },
    { name: 'Artistic Films', icon: Star, description: 'High-quality cinematic content' },
    { name: 'Trending Now', icon: Shuffle, description: 'Most popular this week' },
  ];

  const trendingTags = [
    '#Romantic', '#LGBTQ', '#ArtHouse', '#BDSM', '#Couples', '#Solo', 
    '#Intimate', '#Passionate', '#Sensual', '#Artistic'
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with Big Shuffle Button */}
        <section className="text-center py-12 mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-neon-gradient bg-clip-text text-transparent">
            AfterDark
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {safeMode 
              ? "Discover curated content in Safe Mode. Toggle ShuffleXXX for the full experience."
              : "Experience the full AfterDark collection with intelligent shuffling."
            }
          </p>
          
          {/* Big Shuffle Button */}
          <Link 
            href="/shuffle" 
            className="inline-flex items-center justify-center bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold text-2xl px-12 py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-8"
          >
            <Shuffle className="w-8 h-8 mr-3" />
            SHUFFLE NOW
          </Link>
        </section>

        {/* Today's Featured Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Today's Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={index}
                  href={`/browse?category=${encodeURIComponent(category.name.toLowerCase())}`}
                  className="card hover:scale-105 transition-all duration-300 text-center group"
                >
                  <div className="flex flex-col items-center p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-400">{category.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Trending Tags */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Trending Tags</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {trendingTags.map((tag, index) => (
              <Link
                key={index}
                href={`/browse?tag=${encodeURIComponent(tag.slice(1))}`}
                className="px-4 py-2 bg-dark-700 hover:bg-primary-600 rounded-full text-sm transition-colors duration-200 hover:scale-105 transform"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/browse" className="btn-secondary text-lg px-8 py-3">
              Browse All Content
            </Link>
            <Link href="/account" className="btn-outline text-lg px-8 py-3">
              Manage Account
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 