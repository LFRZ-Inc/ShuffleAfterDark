'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Menu, X, User, Settings, LogOut, Shield, Eye, EyeOff } from 'lucide-react';

export default function Header() {
  const { isXXXEnabled, safeMode, toggleXXXMode, user, ageVerified, incognitoMode, toggleIncognitoMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shuffle', href: '/shuffle' },
    { name: 'Browse', href: '/browse' },
    { name: 'Creators', href: '/creator' },
  ];

  return (
    <header className="bg-dark-900/95 backdrop-blur-sm border-b border-dark-700 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-neon-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold">
              After<span className="text-primary-400">Dark</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Safe Mode / Full Experience Toggle */}
            {ageVerified && (
              <div className="flex items-center space-x-3">
                <span className={`text-sm ${safeMode ? 'text-green-400' : 'text-gray-400'}`}>
                  Safe Mode
                </span>
                <button
                  onClick={toggleXXXMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isXXXEnabled ? 'bg-primary-600' : 'bg-gray-600'
                  }`}
                  title={safeMode ? 'Enable Full Experience (18+)' : 'Enable Safe Mode'}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isXXXEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm ${!safeMode ? 'text-primary-400' : 'text-gray-400'}`}>
                  Full Experience (18+)
                </span>
              </div>
            )}

            {/* Incognito Mode */}
            <button
              onClick={toggleIncognitoMode}
              className={`p-2 rounded-lg transition-colors ${
                incognitoMode ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-400 hover:text-white'
              }`}
              title={incognitoMode ? 'Incognito Mode On' : 'Incognito Mode Off'}
            >
              {incognitoMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>

            {/* User Menu */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:block">{user.email}</span>
                </button>
              ) : (
                <Link
                  href="/login"
                  className="btn-primary"
                >
                  Sign In
                </Link>
              )}

              {/* User Dropdown */}
              {userMenuOpen && user && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-lg py-1">
                  <Link
                    href="/account"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-dark-700"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Link>
                  <button
                    onClick={() => {/* Handle logout */}}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-dark-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-dark-700 py-4">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 