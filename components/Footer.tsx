'use client';

import Link from 'next/link';
import { Shield, Heart, Users } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-700 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-neon-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold">
                Shuffle<span className="text-primary-400">AfterDark</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Smart adult content shuffler with ethical sourcing and premium features.
            </p>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Legal</h3>
            <div className="space-y-2">
              <Link href="/terms" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/disclaimer" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Content Disclaimer
              </Link>
              <Link href="/dmca" className="block text-gray-400 hover:text-white text-sm transition-colors">
                DMCA Policy
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Help Center
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Contact Us
              </Link>
              <Link href="/report" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Report Content
              </Link>
              <Link href="/feedback" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Feedback
              </Link>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Community</h3>
            <div className="space-y-2">
              <Link href="/creators" className="block text-gray-400 hover:text-white text-sm transition-colors">
                For Creators
              </Link>
              <Link href="/guidelines" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Community Guidelines
              </Link>
              <Link href="/safety" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Safety Center
              </Link>
            </div>
          </div>
        </div>

        {/* Age Verification Notice */}
        <div className="border-t border-dark-700 pt-8 mt-8">
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Shield className="w-4 h-4" />
              <span>18+ Only</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Heart className="w-4 h-4" />
              <span>Ethical Content</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Users className="w-4 h-4" />
              <span>Creator Friendly</span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs text-gray-500">
              This website contains adult content and is intended for adults 18 years or older.
              By accessing this site, you confirm that you are of legal age in your jurisdiction.
            </p>
            <p className="text-xs text-gray-500">
              © 2024 ShuffleAfterDark. All rights reserved. Content is provided by verified creators and licensed partners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 