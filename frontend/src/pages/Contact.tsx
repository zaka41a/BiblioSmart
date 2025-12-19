import { useState } from "react";
import { FiMail, FiUser, FiMessageSquare, FiSend, FiPhone, FiMapPin, FiClock, FiCheckCircle } from "react-icons/fi";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setSubmitMessage("Thank you for contacting us! Your message has been received and our team will respond within 24-48 hours.");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitMessage(""), 6000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
            <FiMail className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      {/* Success Message */}
      {submitMessage && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-5">
          <div className="flex items-start gap-3">
            <FiCheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="font-medium text-green-800">{submitMessage}</p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contact Information Cards */}
        <div className="space-y-4">
          {/* Email Card */}
          <div className="rounded-xl bg-white p-6 shadow-md border border-slate-200 hover:border-green-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-green-100 p-3">
                <FiMail className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-2">Email Support</h3>
                <p className="text-sm text-slate-600 mb-1">General Inquiries:</p>
                <p className="text-sm text-green-600 font-semibold mb-2">zaksab98@gmail.com</p>
                <p className="text-sm text-slate-600 mb-1">Support Team:</p>
                <p className="text-sm text-green-600 font-semibold">support@bibliosmart.com</p>
              </div>
            </div>
          </div>

          {/* Phone Card */}
          <div className="rounded-xl bg-white p-6 shadow-md border border-slate-200 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-100 p-3">
                <FiPhone className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-2">Phone Support</h3>
                <p className="text-sm text-blue-600 font-semibold mb-2">+49 176 20827199</p>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <FiClock className="h-4 w-4" />
                  <span>Monday - Friday</span>
                </div>
                <p className="text-sm text-slate-600 ml-6">9:00 AM - 6:00 PM CET</p>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="rounded-xl bg-white p-6 shadow-md border border-slate-200 hover:border-purple-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-purple-100 p-3">
                <FiMapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-2">Headquarters</h3>
                <p className="text-sm text-slate-700 font-medium">BiblioSmart</p>
                <p className="text-sm text-slate-600">Aachen</p>
                <p className="text-sm text-slate-600">Germany</p>
              </div>
            </div>
          </div>

          {/* Response Time Info */}
          <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6">
            <div className="flex items-start gap-3">
              <FiClock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-green-900 mb-2">Response Time</h3>
                <p className="text-sm text-green-800">
                  We aim to respond to all inquiries within <span className="font-semibold">24-48 hours</span> during business days. For urgent matters, please call our phone support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 rounded-xl bg-white p-8 shadow-md border border-slate-200">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a Message</h2>
            <p className="text-slate-600">Fill out the form below and our team will get back to you as soon as possible.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Name Field */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FiUser className="h-4 w-4 text-green-600" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FiMail className="h-4 w-4 text-green-600" />
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FiMessageSquare className="h-4 w-4 text-green-600" />
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                placeholder="How can we help you?"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FiMessageSquare className="h-4 w-4 text-green-600" />
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-none"
                placeholder="Please provide details about your inquiry..."
                required
              />
              <p className="mt-2 text-xs text-slate-500">Please include as much detail as possible to help us assist you better.</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 font-bold text-white shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <FiSend className="h-5 w-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 text-center">
              By submitting this form, you agree to our{" "}
              <a href="/privacy-policy" className="text-green-600 hover:text-green-700 font-semibold">Privacy Policy</a>
              {" "}and{" "}
              <a href="/legal-notice" className="text-green-600 hover:text-green-700 font-semibold">Terms of Service</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
