import { FiShield, FiLock, FiEye, FiDatabase, FiUsers, FiCheckCircle } from "react-icons/fi";

export const PrivacyPolicy = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
            <FiShield className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        </div>
      </div>

      {/* Content */}
      <div className="rounded-xl bg-white p-8 shadow-md border border-slate-200">
        <div className="space-y-8">

          {/* Introduction */}
          <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6">
            <div className="flex items-start gap-3">
              <FiShield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 leading-relaxed">
                At <span className="font-semibold text-slate-900">BiblioSmart</span>, we are deeply committed to protecting your privacy and ensuring the security of your personal information. This comprehensive Privacy Policy explains in detail how we collect, use, disclose, and safeguard your data when you use our platform and services.
              </p>
            </div>
          </div>

          {/* Information Collection */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-purple-100 p-2">
                <FiDatabase className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Information We Collect</h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <div className="rounded-full bg-purple-600 p-1">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Personal Information
                </h3>
                <p className="text-slate-700 mb-3">Information you provide directly to us:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">Full name and contact details (email address, phone number)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">Account credentials (username, encrypted password)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">Profile information and reading preferences</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">Payment information (securely processed by third-party providers)</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <div className="rounded-full bg-blue-600 p-1">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Usage Information
                </h3>
                <p className="text-slate-700 mb-3">Automatically collected data about your interactions:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">Device information (IP address, browser type, operating system)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">Usage patterns and platform interactions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">Books viewed, searched, and purchased</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">Cookies and similar tracking technologies</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-blue-100 p-2">
                <FiEye className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">How We Use Your Information</h2>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-6">
              <p className="text-slate-700 mb-4 font-medium">We use your information for the following purposes:</p>
              <div className="space-y-3">
                {[
                  { title: "Service Delivery", desc: "To provide, maintain, and continuously improve our library management platform and user experience" },
                  { title: "Transactions", desc: "To process book purchases, manage subscriptions, and handle payment transactions securely" },
                  { title: "Communication", desc: "To send important updates, newsletters, and promotional materials (with your explicit consent)" },
                  { title: "Personalization", desc: "To customize your experience with tailored book recommendations and personalized content" },
                  { title: "Analytics", desc: "To analyze usage patterns, understand user behavior, and optimize platform performance" },
                  { title: "Security", desc: "To detect, investigate, and prevent fraudulent activities, security breaches, and technical issues" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors">
                    <FiCheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}:</p>
                      <p className="text-slate-700">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-amber-100 p-2">
                <FiUsers className="h-5 w-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Information Sharing & Disclosure</h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-5">
                <div className="flex items-start gap-3">
                  <FiShield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="font-semibold text-green-900">
                    We do not sell, trade, rent, or otherwise transfer your personal information to third parties for marketing purposes.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 border border-slate-200 p-6">
                <p className="text-slate-700 mb-4 font-medium">We may share your information only in the following limited circumstances:</p>
                <div className="space-y-2">
                  {[
                    "With Your Consent: When you explicitly authorize us to share your information for specific purposes",
                    "Service Providers: With trusted third-party vendors who assist in platform operations (hosting, payment processing, analytics)",
                    "Legal Compliance: When required by applicable law, court orders, legal process, or government regulations",
                    "Business Transfers: In connection with mergers, acquisitions, reorganizations, or sale of company assets",
                    "Protection: To protect the rights, property, safety, or security of BiblioSmart, our users, or the public"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-red-100 p-2">
                <FiLock className="h-5 w-5 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Data Security Measures</h2>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-6">
              <p className="text-slate-700 mb-4">We implement comprehensive industry-standard security measures to protect your personal information:</p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "End-to-end encryption using SSL/TLS protocols",
                  "Secure authentication with bcrypt password hashing",
                  "Regular security audits and vulnerability assessments",
                  "Advanced access controls and activity monitoring",
                  "Secure data centers with physical security measures",
                  "Employee training on data protection best practices"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="rounded-full bg-green-600 p-1 mt-0.5">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-indigo-100 p-2">
                <FiUsers className="h-5 w-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Your Privacy Rights</h2>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-6">
              <p className="text-slate-700 mb-4 font-medium">You have the following rights regarding your personal data:</p>
              <div className="space-y-3">
                {[
                  { title: "Right to Access", desc: "Request a comprehensive copy of all personal information we hold about you" },
                  { title: "Right to Correction", desc: "Request correction or update of any inaccurate or incomplete personal data" },
                  { title: "Right to Deletion", desc: "Request deletion of your personal data (subject to legal and contractual obligations)" },
                  { title: "Right to Portability", desc: "Request transfer of your data to another service provider in a structured format" },
                  { title: "Right to Opt-Out", desc: "Unsubscribe from marketing communications at any time with one-click options" },
                  { title: "Right to Object", desc: "Object to specific processing of your data for certain purposes or activities" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors">
                    <FiCheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}:</p>
                      <p className="text-slate-700 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-cyan-100 p-2">
                <FiDatabase className="h-5 w-5 text-cyan-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Cookies & Tracking Technologies</h2>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-6">
              <p className="text-slate-700 mb-3">
                We use cookies and similar tracking technologies to enhance and personalize your experience on our platform. These technologies help us:
              </p>
              <div className="space-y-2 mb-4">
                {[
                  "Remember your preferences, settings, and login status",
                  "Understand how you interact with our services and features",
                  "Provide personalized content and book recommendations",
                  "Analyze site traffic, performance, and user behavior patterns"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 text-sm italic">
                You can control cookie preferences through your browser settings. Please note that disabling certain cookies may affect some platform functionalities.
              </p>
            </div>
          </section>

          {/* Children */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-pink-100 p-2">
                <FiShield className="h-5 w-5 text-pink-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Children's Privacy Protection</h2>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-6">
              <p className="text-slate-700">
                Our services are not intended for, and we do not knowingly collect personal information from, children under the age of 13. If we discover that we have inadvertently collected information from a child under 13, we will take immediate steps to delete such information from our systems. Parents or guardians who believe we may have collected information from their child should contact us immediately.
              </p>
            </div>
          </section>

          {/* Changes */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-slate-100 p-2">
                <FiEye className="h-5 w-5 text-slate-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Policy Updates & Modifications</h2>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-6">
              <p className="text-slate-700">
                We may periodically update this Privacy Policy to reflect changes in our practices, technologies, legal requirements, or business operations. Material changes will be prominently posted on this page with an updated "Last Updated" date. We encourage you to review this policy regularly to stay informed about how we protect your information.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-green-100 p-2">
                <FiUsers className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Contact Our Privacy Team</h2>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6">
              <p className="text-slate-700 mb-4 font-medium">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices:
              </p>
              <div className="space-y-2">
                <p className="text-slate-700">
                  <span className="font-semibold text-slate-900">Privacy Team Email:</span> <span className="text-green-600 font-semibold">zaksab98@gmail.com</span>
                </p>
                <p className="text-slate-700">
                  <span className="font-semibold text-slate-900">Support Email:</span> <span className="text-green-600 font-semibold">support@bibliosmart.com</span>
                </p>
                <p className="text-slate-700">
                  <span className="font-semibold text-slate-900">Phone:</span> <span className="font-semibold">+49 176 20827199</span>
                </p>
                <p className="text-slate-700">
                  <span className="font-semibold text-slate-900">Response Time:</span> <span className="font-semibold">Within 48 hours</span>
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500 text-center">
              Effective Date: December 11, 2025 | Last Updated: December 11, 2025
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
