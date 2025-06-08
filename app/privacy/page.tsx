'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, Database, Mail, Phone } from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-primary-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-neon-gradient bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-lg">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: January 2024
            </p>
          </div>

          <div className="space-y-8">
            {/* Information We Collect */}
            <section className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="w-6 h-6 text-primary-500" />
                <h2 className="text-2xl font-bold">Information We Collect</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Account Information</h3>
                  <p>When you create an account, we collect your email address, username, and age verification status.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Usage Data</h3>
                  <p>We collect information about how you use our platform, including content viewed, search queries, and interaction patterns to improve our recommendation algorithm.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Device Information</h3>
                  <p>We may collect device identifiers, browser type, operating system, and IP address for security and analytics purposes.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
                  <p>Payment processing is handled by CCBill. We do not store your payment card information on our servers.</p>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="w-6 h-6 text-primary-500" />
                <h2 className="text-2xl font-bold">How We Use Your Information</h2>
              </div>
              
              <div className="space-y-3 text-gray-300">
                <p>• <strong>Service Provision:</strong> To provide and maintain our platform services</p>
                <p>• <strong>Personalization:</strong> To customize content recommendations and user experience</p>
                <p>• <strong>Communication:</strong> To send important updates about your account or our services</p>
                <p>• <strong>Security:</strong> To protect against fraud, abuse, and unauthorized access</p>
                <p>• <strong>Analytics:</strong> To understand usage patterns and improve our platform</p>
                <p>• <strong>Legal Compliance:</strong> To comply with applicable laws and regulations</p>
              </div>
            </section>

            {/* Data Protection */}
            <section className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="w-6 h-6 text-primary-500" />
                <h2 className="text-2xl font-bold">Data Protection & Security</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Encryption</h3>
                  <p>All data transmission is encrypted using industry-standard SSL/TLS protocols. Sensitive data is encrypted at rest.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Access Controls</h3>
                  <p>Access to personal data is restricted to authorized personnel who need it to perform their job functions.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Data Retention</h3>
                  <p>We retain personal data only as long as necessary to provide our services or as required by law.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Incognito Mode</h3>
                  <p>When using Incognito Mode, we do not store browsing history or viewing preferences locally.</p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
              
              <div className="space-y-3 text-gray-300">
                <p>• <strong>Access:</strong> Request access to your personal data</p>
                <p>• <strong>Correction:</strong> Request correction of inaccurate personal data</p>
                <p>• <strong>Deletion:</strong> Request deletion of your personal data</p>
                <p>• <strong>Portability:</strong> Request a copy of your data in a portable format</p>
                <p>• <strong>Opt-out:</strong> Opt out of certain data processing activities</p>
                <p>• <strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</p>
              </div>
              
              <div className="mt-4 p-4 bg-primary-600/10 border border-primary-600/20 rounded-lg">
                <p className="text-sm text-gray-300">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Cookies & Tracking</h2>
              
              <div className="space-y-4 text-gray-300">
                <p>We use cookies and similar technologies to:</p>
                <div className="space-y-2 ml-4">
                  <p>• Remember your preferences and settings</p>
                  <p>• Maintain your login session</p>
                  <p>• Analyze platform usage and performance</p>
                  <p>• Provide personalized content recommendations</p>
                </div>
                
                <p>You can control cookie settings through your browser preferences. Note that disabling cookies may affect platform functionality.</p>
              </div>
            </section>

            {/* Third Parties */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
              
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Payment Processing</h3>
                  <p>CCBill processes all payments. Their privacy policy governs how they handle your payment information.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Content Delivery</h3>
                  <p>We may use content delivery networks (CDNs) to improve platform performance.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                  <p>We use analytics services to understand platform usage and improve user experience.</p>
                </div>
              </div>
            </section>

            {/* Age Verification */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Age Verification & Minors</h2>
              
              <div className="space-y-3 text-gray-300">
                <p>Our platform is intended for adults only (18+ years). We:</p>
                <div className="space-y-2 ml-4">
                  <p>• Require age verification before accessing content</p>
                  <p>• Do not knowingly collect data from minors</p>
                  <p>• Will delete any data if we discover it belongs to a minor</p>
                  <p>• Implement technical measures to prevent minor access</p>
                </div>
              </div>
            </section>

            {/* International Users */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">International Users</h2>
              
              <div className="space-y-3 text-gray-300">
                <p>If you access our platform from outside the United States:</p>
                <div className="space-y-2 ml-4">
                  <p>• Your data may be transferred to and processed in the United States</p>
                  <p>• We comply with applicable international privacy laws</p>
                  <p>• Additional rights may apply based on your jurisdiction</p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              
              <div className="space-y-4 text-gray-300">
                <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm">privacy@afterdark.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="font-semibold">Support</p>
                      <p className="text-sm">Available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
              
              <div className="text-gray-300">
                <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by:</p>
                <div className="space-y-2 ml-4 mt-3">
                  <p>• Posting the updated policy on our platform</p>
                  <p>• Sending an email notification to registered users</p>
                  <p>• Displaying a prominent notice on our homepage</p>
                </div>
                <p className="mt-3">Your continued use of our platform after any changes constitutes acceptance of the updated policy.</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 