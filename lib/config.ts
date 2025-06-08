// AfterDark Platform Configuration

export const config = {
  // Payment Configuration (CCBill)
  payment: {
    ccbillBaseUrl: process.env.NEXT_PUBLIC_CCBILL_URL || 'https://bill.ccbill.com/jpost/signup.cgi',
    ccbillAccount: process.env.NEXT_PUBLIC_CCBILL_ACCOUNT || 'YOUR_ACCOUNT',
    ccbillSubAccount: process.env.NEXT_PUBLIC_CCBILL_SUBACCOUNT || 'YOUR_SUBACCOUNT',
    
    // Subscription plan configurations
    plans: {
      premium: {
        formName: 'premium_afterdark',
        price: 9.99,
        currency: 'USD',
        period: 'monthly'
      },
      premium_xxx: {
        formName: 'premium_xxx',
        price: 19.99,
        currency: 'USD',
        period: 'monthly'
      }
    }
  },

  // Platform Settings
  platform: {
    name: 'AfterDark',
    tagline: 'Smart Adult Content Shuffle',
    supportEmail: 'support@afterdark.com',
    dmcaEmail: 'dmca@afterdark.com',
    legalEmail: 'legal@afterdark.com',
    privacyEmail: 'privacy@afterdark.com',
    
    // Age verification
    minimumAge: 18,
    
    // Content settings
    maxShuffleHistory: 10,
    defaultSafeMode: true,
    
    // Upload limits (for future implementation)
    maxFileSize: 500 * 1024 * 1024, // 500MB
    allowedVideoFormats: ['mp4', 'webm', 'mov'],
    allowedImageFormats: ['jpg', 'jpeg', 'png', 'webp'],
  },

  // Feature Flags
  features: {
    enableDownloads: true,
    enableComments: false, // Not implemented yet
    enableRatings: true,
    enableReports: true,
    enableSharing: true,
    enableAnalytics: true,
  },

  // External Services
  services: {
    // CDN configuration (for future implementation)
    cdnUrl: process.env.NEXT_PUBLIC_CDN_URL || '',
    
    // Analytics (for future implementation)
    analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || '',
    
    // Content moderation (for future implementation)
    moderationApiKey: process.env.MODERATION_API_KEY || '',
  },

  // Social Media Links (for footer)
  social: {
    twitter: 'https://twitter.com/afterdark',
    instagram: 'https://instagram.com/afterdark',
    discord: 'https://discord.gg/afterdark',
  },

  // Legal URLs
  legal: {
    terms: '/terms',
    privacy: '/privacy',
    dmca: '/dmca',
    disclaimer: '/disclaimer',
    guidelines: '/guidelines',
  }
};

// Helper function to generate CCBill payment URL
export function generateCCBillUrl(planType: 'premium' | 'premium_xxx', customParams?: Record<string, string>) {
  const plan = config.payment.plans[planType];
  const baseUrl = config.payment.ccbillBaseUrl;
  
  const params = new URLSearchParams({
    clientAccnum: config.payment.ccbillAccount,
    clientSubacc: config.payment.ccbillSubAccount,
    formName: plan.formName,
    ...customParams
  });

  return `${baseUrl}?${params.toString()}`;
}

// Helper function to check if feature is enabled
export function isFeatureEnabled(feature: keyof typeof config.features): boolean {
  return config.features[feature];
}

// Helper function to get platform info
export function getPlatformInfo() {
  return {
    name: config.platform.name,
    tagline: config.platform.tagline,
    supportEmail: config.platform.supportEmail,
    minimumAge: config.platform.minimumAge,
  };
}

export default config; 