import { FiFileText, FiInfo, FiShield, FiAlertCircle, FiGlobe } from "react-icons/fi";

export const LegalNotice = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
            <FiFileText className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Legal Notice</h1>
        </div>
      </div>

      {/* Content */}
      <div className="rounded-xl bg-white p-8 shadow-md border border-slate-200">
        <div className="space-y-8">

          {/* Publisher Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-green-100 p-2">
                <FiInfo className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Publisher Information</h2>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1">Company Name</p>
                    <p className="text-slate-900 font-semibold">BiblioSmart</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1">Legal Form</p>
                    <p className="text-slate-900 font-semibold">Software as a Service Platform</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1">Registration Number</p>
                    <p className="text-slate-900 font-semibold">123456789</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1">Headquarters</p>
                    <p className="text-slate-900 font-semibold">Aachen</p>
                    <p className="text-slate-900 font-semibold">Germany</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1">Contact Email</p>
                    <p className="text-green-600 font-semibold">zaksab98@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hosting */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-blue-100 p-2">
                <FiGlobe className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Hosting Infrastructure</h2>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-6">
              <p className="text-slate-700 leading-relaxed">
                This website is hosted on enterprise-grade cloud infrastructure provided by leading service providers. Our hosting solution ensures <span className="font-semibold text-slate-900">99.9% uptime</span>, <span className="font-semibold text-slate-900">global CDN distribution</span>, <span className="font-semibold text-slate-900">automatic scaling</span>, and <span className="font-semibold text-slate-900">comprehensive security measures</span> across multiple geographic locations worldwide.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-purple-100 p-2">
                <FiShield className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Intellectual Property Rights</h2>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-6">
                <p className="text-slate-700 leading-relaxed mb-3">
                  All content, materials, and intellectual property on this website, including but not limited to:
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Text, graphics, logos, icons, images, and photographs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Software, source code, and digital downloads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Trademarks, service marks, and trade names</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Database compilation and design elements</span>
                  </li>
                </ul>
                <p className="text-slate-700 mt-4">
                  is the exclusive property of <span className="font-semibold text-slate-900">BiblioSmart</span> and is protected by international copyright, trademark, and intellectual property laws.
                </p>
              </div>
              <div className="rounded-lg bg-red-50 border border-red-200 p-5">
                <div className="flex items-start gap-3">
                  <FiAlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800 font-medium">
                    <span className="font-bold">Important:</span> Unauthorized use, reproduction, modification, distribution, or publication of any content from this website without prior written permission is strictly prohibited and may result in civil and criminal penalties.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Terms of Use */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-indigo-100 p-2">
                <FiFileText className="h-5 w-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Terms of Use</h2>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-6">
              <p className="text-slate-700 mb-4 font-medium">By accessing and using this website, you agree to the following terms:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-green-600 p-1 mt-0.5">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-700 flex-1">Compliance with all applicable local, state, national, and international laws and regulations</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-green-600 p-1 mt-0.5">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-700 flex-1">Maintaining confidentiality and security of your account credentials and login information</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-green-600 p-1 mt-0.5">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-700 flex-1">Prohibition of using the platform for any unlawful, harmful, or fraudulent purposes</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-green-600 p-1 mt-0.5">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-700 flex-1">Acceptance that we reserve the right to modify, suspend, or terminate services at our discretion</p>
                </div>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-amber-100 p-2">
                <FiAlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Limitation of Liability</h2>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-6">
              <p className="text-slate-700 leading-relaxed">
                While BiblioSmart strives to provide accurate, complete, and up-to-date information on this website, we make <span className="font-semibold text-slate-900">no warranties or representations</span> regarding the accuracy, completeness, or reliability of any content. We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your access to or use of this website, including but not limited to technical issues, service interruptions, data loss, or any damages resulting from decisions made based on website content.
              </p>
            </div>
          </section>

          {/* Applicable Law */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-slate-100 p-2">
                <FiShield className="h-5 w-5 text-slate-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Governing Law & Jurisdiction</h2>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-6">
              <p className="text-slate-700 leading-relaxed">
                These terms and all related matters shall be governed by and construed in accordance with the laws of <span className="font-semibold text-slate-900">Germany</span>, without regard to its conflict of law provisions. Any disputes, claims, or controversies arising from or relating to this website or these terms shall be subject to the <span className="font-semibold text-slate-900">exclusive jurisdiction</span> of the courts located in Aachen, Germany.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-green-100 p-2">
                <FiInfo className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Legal Contact Information</h2>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6">
              <p className="text-slate-700 mb-4">For legal inquiries, questions, or concerns regarding this notice:</p>
              <div className="space-y-2">
                <p className="text-slate-700">
                  <span className="font-semibold text-slate-900">Email:</span> <span className="text-green-600 font-semibold">zaksab98@gmail.com</span>
                </p>
                <p className="text-slate-700">
                  <span className="font-semibold text-slate-900">Phone:</span> <span className="font-semibold">+49 176 20827199</span>
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500 text-center">
              Last Updated: December 11, 2025
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LegalNotice;
