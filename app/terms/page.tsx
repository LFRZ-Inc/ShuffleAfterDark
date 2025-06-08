'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, AlertTriangle, Scale } from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Scale className="w-16 h-16 text-primary-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4 bg-neon-gradient bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-gray-400">
              Last updated: January 1, 2024
            </p>
          </div>

          <div className="card space-y-8">
            <div className="bg-yellow-600/20 border border-yellow-600 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <h3 className="font-semibold text-yellow-400">Important Notice</h3>
              </div>
              <p className="text-sm text-yellow-200">
                This website contains adult content and is intended for adults 18 years or older. 
                By accessing this site, you confirm that you are of legal age in your jurisdiction.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using AfterDark ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Age Verification and Eligibility</h2>
              <div className="space-y-4 text-gray-300">
                <p>You must be at least 18 years old to use this service. By using the Service, you represent and warrant that:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You are at least 18 years of age</li>
                  <li>You have the legal right to view adult content in your jurisdiction</li>
                  <li>You will not allow minors to access your account</li>
                  <li>You understand the adult nature of the content</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Account Registration and Security</h2>
              <div className="space-y-4 text-gray-300">
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
                <p>You are responsible for safeguarding the password and for all activities that occur under your account.</p>
                <p>You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Content and Conduct</h2>
              <div className="space-y-4 text-gray-300">
                <h3 className="text-lg font-semibold">Prohibited Content:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Content involving minors or appearing to involve minors</li>
                  <li>Non-consensual content</li>
                  <li>Content promoting violence or illegal activities</li>
                  <li>Copyrighted material without proper authorization</li>
                  <li>Spam, harassment, or abusive content</li>
                </ul>
                
                <h3 className="text-lg font-semibold">User Conduct:</h3>
                <p>You agree not to use the Service to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on the rights of others</li>
                  <li>Distribute malware or harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Subscription and Payment Terms</h2>
              <div className="space-y-4 text-gray-300">
                <p>Subscription fees are billed in advance on a monthly or annual basis and are non-refundable except as required by law.</p>
                <p>We reserve the right to change our subscription plans and pricing at any time with reasonable notice.</p>
                <p>You may cancel your subscription at any time through your account settings.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Privacy and Data Protection</h2>
              <div className="space-y-4 text-gray-300">
                <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service.</p>
                <p>We implement appropriate security measures to protect your personal information.</p>
                <p>We may use anonymized data for analytics and service improvement purposes.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <div className="space-y-4 text-gray-300">
                <p>The Service and its original content, features, and functionality are and will remain the exclusive property of AfterDark and its licensors.</p>
                <p>Content creators retain rights to their original content while granting us necessary licenses to operate the Service.</p>
                <p>You may not reproduce, distribute, or create derivative works without explicit permission.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Content Moderation and Removal</h2>
              <div className="space-y-4 text-gray-300">
                <p>We reserve the right to review, moderate, and remove content that violates these terms.</p>
                <p>We may suspend or terminate accounts that repeatedly violate our policies.</p>
                <p>Content removal decisions are made at our sole discretion.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Disclaimers and Limitation of Liability</h2>
              <div className="space-y-4 text-gray-300">
                <p>The Service is provided "as is" without warranties of any kind, either express or implied.</p>
                <p>We do not warrant that the Service will be uninterrupted, secure, or error-free.</p>
                <p>In no event shall AfterDark be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Termination</h2>
              <div className="space-y-4 text-gray-300">
                <p>We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms.</p>
                <p>Upon termination, your right to use the Service will cease immediately.</p>
                <p>You may terminate your account at any time by contacting us or using account deletion features.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
              <div className="space-y-4 text-gray-300">
                <p>These Terms shall be interpreted and governed by the laws of [Jurisdiction], without regard to its conflict of law provisions.</p>
                <p>Any disputes arising from these Terms will be resolved through binding arbitration.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
              <div className="space-y-4 text-gray-300">
                <p>We reserve the right to modify or replace these Terms at any time.</p>
                <p>If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
                <p>Your continued use of the Service after changes constitutes acceptance of the new Terms.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
              <div className="space-y-4 text-gray-300">
                <p>If you have any questions about these Terms, please contact us at:</p>
                <div className="bg-dark-700 p-4 rounded-lg">
                  <p>Email: legal@afterdark.com</p>
                  <p>Address: [Company Address]</p>
                  <p>Phone: [Contact Number]</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 