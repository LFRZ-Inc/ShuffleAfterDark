'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Shield, Calendar, Globe } from 'lucide-react';

export default function AgeVerification() {
  const { setAgeVerified } = useApp();
  const [formData, setFormData] = useState({
    birthDate: '',
    country: '',
    agreed: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAge = (birthDate: string): boolean => {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1 >= 18;
    }
    
    return age >= 18;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required';
    } else if (!validateAge(formData.birthDate)) {
      newErrors.birthDate = 'You must be 18 or older to access this content';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    if (!formData.agreed) {
      newErrors.agreed = 'You must agree to the terms to continue';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setAgeVerified(true);
    }
  };

  return (
    <div className="fixed inset-0 age-verification-overlay flex items-center justify-center p-4 z-50">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <Shield className="w-16 h-16 text-primary-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Age Verification Required</h2>
          <p className="text-gray-300">
            This website contains adult content. You must be 18 or older to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Date of Birth
            </label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="input-field w-full"
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.birthDate && (
              <p className="text-red-400 text-sm mt-1">{errors.birthDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <Globe className="w-4 h-4 inline mr-2" />
              Country
            </label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="input-field w-full"
            >
              <option value="">Select your country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="NL">Netherlands</option>
              <option value="other">Other</option>
            </select>
            {errors.country && (
              <p className="text-red-400 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreed"
              checked={formData.agreed}
              onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
              className="mt-1"
            />
            <label htmlFor="agreed" className="text-sm text-gray-300">
              I confirm that I am 18 years of age or older, and I agree to the{' '}
              <a href="/terms" className="text-primary-400 hover:text-primary-300">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary-400 hover:text-primary-300">
                Privacy Policy
              </a>
              .
            </label>
          </div>
          {errors.agreed && (
            <p className="text-red-400 text-sm">{errors.agreed}</p>
          )}

          <button type="submit" className="btn-primary w-full">
            Enter Site
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            By entering this site, you acknowledge that you are of legal age in your jurisdiction
            to view adult content and that you wish to view such content.
          </p>
        </div>
      </div>
    </div>
  );
} 