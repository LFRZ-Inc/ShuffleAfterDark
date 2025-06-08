'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Mail, AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function DMCAPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-12 h-12 text-primary-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-neon-gradient bg-clip-text text-transparent">
              DMCA Policy
            </h1>
            <p className="text-gray-400 text-lg">
              Digital Millennium Copyright Act compliance and takedown procedures
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: January 2024
            </p>
          </div>

          <div className="space-y-8">
            {/* Overview */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  AfterDark respects the intellectual property rights of others and expects our users to do the same. 
                  In accordance with the Digital Millennium Copyright Act (DMCA), we will respond to valid notices 
                  of alleged copyright infringement.
                </p>
                
                <p>
                  This policy outlines our procedures for handling copyright infringement claims and provides 
                  information on how to submit a DMCA takedown notice or counter-notification.
                </p>
              </div>
            </section>

            {/* Filing a DMCA Notice */}
            <section className="card">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold">Filing a DMCA Takedown Notice</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  If you believe that content on our platform infringes your copyright, you may submit a DMCA 
                  takedown notice. Your notice must include the following information:
                </p>
                
                <div className="bg-dark-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Required Information:</h3>
                  <ul className="space-y-2">
                    <li>• A physical or electronic signature of the copyright owner or authorized agent</li>
                    <li>• Identification of the copyrighted work claimed to have been infringed</li>
                    <li>• Identification of the infringing material and its location on our platform</li>
                    <li>• Your contact information (name, address, phone number, email)</li>
                    <li>• A statement of good faith belief that the use is not authorized</li>
                    <li>• A statement that the information is accurate and you are authorized to act</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                  <p className="text-yellow-400 font-semibold mb-2">Important Notice:</p>
                  <p className="text-sm">
                    Filing a false DMCA notice may result in legal liability. Please ensure you have a good faith 
                    belief that the use of the material is not authorized by the copyright owner.
                  </p>
                </div>
              </div>
            </section>

            {/* How to Submit */}
            <section className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="w-6 h-6 text-primary-500" />
                <h2 className="text-2xl font-bold">How to Submit a Notice</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <p>Send your DMCA takedown notice to our designated agent:</p>
                
                <div className="bg-dark-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">DMCA Agent Contact Information:</h3>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> dmca@afterdark.com</p>
                    <p><strong>Subject Line:</strong> DMCA Takedown Notice</p>
                    <p><strong>Response Time:</strong> 24-48 hours</p>
                  </div>
                </div>
                
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                  <p className="text-blue-400 font-semibold mb-2">Tip:</p>
                  <p className="text-sm">
                    Include direct links to the infringing content and provide as much detail as possible 
                    to help us locate and review the material quickly.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Response Process */}
            <section className="card">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-primary-500" />
                <h2 className="text-2xl font-bold">Our Response Process</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <p>When we receive a valid DMCA notice, we will:</p>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">1</div>
                    <div>
                      <h4 className="font-semibold">Review the Notice</h4>
                      <p className="text-sm text-gray-400">Verify that the notice contains all required information</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">2</div>
                    <div>
                      <h4 className="font-semibold">Remove or Disable Access</h4>
                      <p className="text-sm text-gray-400">Promptly remove or disable access to the allegedly infringing material</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">3</div>
                    <div>
                      <h4 className="font-semibold">Notify the User</h4>
                      <p className="text-sm text-gray-400">Inform the user who posted the content about the takedown</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">4</div>
                    <div>
                      <h4 className="font-semibold">Document the Action</h4>
                      <p className="text-sm text-gray-400">Maintain records of the takedown notice and our response</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Counter-Notification */}
            <section className="card">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h2 className="text-2xl font-bold">Counter-Notification Process</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  If you believe your content was removed in error or misidentification, you may submit a 
                  counter-notification. Your counter-notification must include:
                </p>
                
                <div className="bg-dark-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Required Information:</h3>
                  <ul className="space-y-2">
                    <li>• Your physical or electronic signature</li>
                    <li>• Identification of the removed material and its former location</li>
                    <li>• A statement under penalty of perjury that you have a good faith belief the material was removed in error</li>
                    <li>• Your contact information and consent to jurisdiction</li>
                  </ul>
                </div>
                
                <p>
                  Upon receiving a valid counter-notification, we will forward it to the original complainant. 
                  If they do not file a court action within 10-14 business days, we may restore the content.
                </p>
              </div>
            </section>

            {/* Repeat Infringers */}
            <section className="card">
              <div className="flex items-center space-x-3 mb-4">
                <XCircle className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold">Repeat Infringer Policy</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  We maintain a policy of terminating accounts of users who are repeat copyright infringers. 
                  This includes:
                </p>
                
                <div className="space-y-3">
                  <p>• Users who receive multiple valid DMCA takedown notices</p>
                  <p>• Users who repeatedly upload copyrighted content without authorization</p>
                  <p>• Users who abuse the counter-notification process</p>
                </div>
                
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <p className="text-red-400 font-semibold mb-2">Account Termination:</p>
                  <p className="text-sm">
                    Accounts terminated for copyright infringement may not be restored, and users may be 
                    permanently banned from creating new accounts.
                  </p>
                </div>
              </div>
            </section>

            {/* Safe Harbor */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Safe Harbor Provisions</h2>
              
              <div className="space-y-4 text-gray-300">
                <p>
                  AfterDark operates as a platform that hosts user-generated content. We comply with the 
                  DMCA safe harbor provisions by:
                </p>
                
                <div className="space-y-3">
                  <p>• Designating an agent to receive copyright infringement notices</p>
                  <p>• Implementing a policy for terminating repeat infringers</p>
                  <p>• Not having actual knowledge of infringing activity</p>
                  <p>• Acting expeditiously to remove infringing material when notified</p>
                  <p>• Not receiving financial benefit directly attributable to infringing activity</p>
                </div>
              </div>
            </section>

            {/* Content Creator Guidelines */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Guidelines for Content Creators</h2>
              
              <div className="space-y-4 text-gray-300">
                <p>To avoid copyright infringement issues:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h3 className="text-green-400 font-semibold mb-2">✓ Do:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Upload only original content</li>
                      <li>• Obtain proper licenses</li>
                      <li>• Credit sources appropriately</li>
                      <li>• Use royalty-free materials</li>
                      <li>• Respect fair use guidelines</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <h3 className="text-red-400 font-semibold mb-2">✗ Don't:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Upload copyrighted material without permission</li>
                      <li>• Use copyrighted music without licenses</li>
                      <li>• Copy content from other platforms</li>
                      <li>• Ignore takedown notices</li>
                      <li>• File false counter-notifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              
              <div className="space-y-4 text-gray-300">
                <p>For DMCA-related inquiries, please contact:</p>
                
                <div className="bg-dark-700 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">DMCA Agent</h3>
                      <p className="text-sm">Email: dmca@afterdark.com</p>
                      <p className="text-sm">Response Time: 24-48 hours</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Legal Department</h3>
                      <p className="text-sm">Email: legal@afterdark.com</p>
                      <p className="text-sm">For complex legal matters</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                  <p className="text-blue-400 font-semibold mb-2">Note:</p>
                  <p className="text-sm">
                    This DMCA policy is subject to change. Please check this page regularly for updates. 
                    For general support inquiries, please use our regular support channels.
                  </p>
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