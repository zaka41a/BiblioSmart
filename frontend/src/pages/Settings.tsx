import { useState } from "react";
import {
  FiSettings,
  FiMail,
  FiSave,
  FiCheckCircle,
  FiAlertCircle,
  FiCreditCard,
  FiGlobe
} from "react-icons/fi";

export const Settings = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'payment' | 'general'>('email');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Email settings
  const [emailSettings, setEmailSettings] = useState(() => {
    const saved = localStorage.getItem('bibliosmart_email_settings');
    return saved ? JSON.parse(saved) : {
      serviceId: '',
      templateId: '',
      publicKey: '',
      fromName: 'BiblioSmart',
      fromEmail: 'noreply@bibliosmart.com'
    };
  });

  // Stripe settings
  const [stripeSettings, setStripeSettings] = useState(() => {
    const saved = localStorage.getItem('bibliosmart_stripe_settings');
    return saved ? JSON.parse(saved) : {
      publicKey: '',
      secretKey: '',
      webhookSecret: '',
      currency: 'USD',
      enabled: false
    };
  });

  // General settings
  const [generalSettings, setGeneralSettings] = useState(() => {
    const saved = localStorage.getItem('bibliosmart_general_settings');
    return saved ? JSON.parse(saved) : {
      siteName: 'BiblioSmart',
      siteUrl: window.location.origin,
      allowRegistration: true,
      requireEmailVerification: false
    };
  });

  const handleSaveEmail = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('bibliosmart_email_settings', JSON.stringify(emailSettings));
      setSaveMessage('Email settings saved successfully!');
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  const handleSaveStripe = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('bibliosmart_stripe_settings', JSON.stringify(stripeSettings));
      setSaveMessage('Payment settings saved successfully!');
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  const handleSaveGeneral = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('bibliosmart_general_settings', JSON.stringify(generalSettings));
      setSaveMessage('General settings saved successfully!');
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'email', label: 'Email', icon: FiMail },
    { id: 'payment', label: 'Payment', icon: FiCreditCard },
    { id: 'general', label: 'General', icon: FiGlobe }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                <FiSettings className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Platform Settings</h1>
            </div>
            <p className="text-purple-100">
              Configure email, payment, and general settings
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {saveMessage && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 flex items-center gap-3">
          <FiCheckCircle className="h-5 w-5 text-green-600" />
          <p className="font-medium text-green-800">{saveMessage}</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[240px,1fr]">
        {/* Tabs Sidebar */}
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 rounded-lg p-3 text-left font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="rounded-xl bg-white p-6 shadow-md border border-slate-200">
          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Email Configuration</h2>
                <p className="text-slate-600">
                  Configure EmailJS to send password reset emails and notifications.
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                <div className="flex gap-3">
                  <FiAlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1 text-sm">Get EmailJS Credentials</p>
                    <p className="text-sm text-blue-700 mb-2">
                      Sign up at <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">emailjs.com</a> to get your credentials.
                    </p>
                    <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                      <li>Create an account and email service</li>
                      <li>Create an email template for password reset</li>
                      <li>Copy your Service ID, Template ID, and Public Key</li>
                      <li>Paste them below</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Service ID
                  </label>
                  <input
                    type="text"
                    value={emailSettings.serviceId}
                    onChange={(e) => setEmailSettings({...emailSettings, serviceId: e.target.value})}
                    placeholder="service_xxxxxxx"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Template ID
                  </label>
                  <input
                    type="text"
                    value={emailSettings.templateId}
                    onChange={(e) => setEmailSettings({...emailSettings, templateId: e.target.value})}
                    placeholder="template_xxxxxxx"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Public Key
                  </label>
                  <input
                    type="text"
                    value={emailSettings.publicKey}
                    onChange={(e) => setEmailSettings({...emailSettings, publicKey: e.target.value})}
                    placeholder="xxxxxxxxxxxxxxxxxxxx"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      From Name
                    </label>
                    <input
                      type="text"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      From Email
                    </label>
                    <input
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveEmail}
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FiSave className="h-4 w-4" />
                    Save Email Settings
                  </>
                )}
              </button>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Configuration</h2>
                <p className="text-slate-600">
                  Configure Stripe to accept payments for paid books.
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                <div className="flex gap-3">
                  <FiAlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900 mb-1 text-sm">Get Stripe API Keys</p>
                    <p className="text-sm text-amber-700 mb-2">
                      Sign up at <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">stripe.com</a> to get your API keys.
                    </p>
                    <ol className="text-xs text-amber-700 space-y-1 list-decimal list-inside">
                      <li>Create a Stripe account</li>
                      <li>Go to Developers → API keys</li>
                      <li>Copy your Publishable key and Secret key</li>
                      <li>For production, use live keys. For testing, use test keys.</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg bg-purple-50 border border-purple-200 p-3">
                  <input
                    type="checkbox"
                    id="stripeEnabled"
                    checked={stripeSettings.enabled}
                    onChange={(e) => setStripeSettings({...stripeSettings, enabled: e.target.checked})}
                    className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-2 focus:ring-purple-500/20"
                  />
                  <label htmlFor="stripeEnabled" className="text-sm font-medium text-slate-700">
                    Enable Stripe Payments
                  </label>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Publishable Key
                  </label>
                  <input
                    type="text"
                    value={stripeSettings.publicKey}
                    onChange={(e) => setStripeSettings({...stripeSettings, publicKey: e.target.value})}
                    placeholder="pk_test_xxxxxxxxxxxxxxxxxxxx"
                    disabled={!stripeSettings.enabled}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:bg-slate-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Secret Key
                  </label>
                  <input
                    type="password"
                    value={stripeSettings.secretKey}
                    onChange={(e) => setStripeSettings({...stripeSettings, secretKey: e.target.value})}
                    placeholder="sk_test_xxxxxxxxxxxxxxxxxxxx"
                    disabled={!stripeSettings.enabled}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:bg-slate-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Webhook Secret (Optional)
                  </label>
                  <input
                    type="password"
                    value={stripeSettings.webhookSecret}
                    onChange={(e) => setStripeSettings({...stripeSettings, webhookSecret: e.target.value})}
                    placeholder="whsec_xxxxxxxxxxxxxxxxxxxx"
                    disabled={!stripeSettings.enabled}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:bg-slate-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Currency
                  </label>
                  <select
                    value={stripeSettings.currency}
                    onChange={(e) => setStripeSettings({...stripeSettings, currency: e.target.value})}
                    disabled={!stripeSettings.enabled}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:bg-slate-100 disabled:cursor-not-allowed"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSaveStripe}
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FiSave className="h-4 w-4" />
                    Save Payment Settings
                  </>
                )}
              </button>
            </div>
          )}

          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">General Settings</h2>
                <p className="text-slate-600">
                  Configure general platform settings and preferences.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Site URL
                  </label>
                  <input
                    type="url"
                    value={generalSettings.siteUrl}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteUrl: e.target.value})}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                <div className="space-y-3 rounded-lg bg-slate-50 border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="allowRegistration"
                      checked={generalSettings.allowRegistration}
                      onChange={(e) => setGeneralSettings({...generalSettings, allowRegistration: e.target.checked})}
                      className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-2 focus:ring-purple-500/20"
                    />
                    <label htmlFor="allowRegistration" className="text-sm font-medium text-slate-700">
                      Allow User Registration
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="requireEmailVerification"
                      checked={generalSettings.requireEmailVerification}
                      onChange={(e) => setGeneralSettings({...generalSettings, requireEmailVerification: e.target.checked})}
                      className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-2 focus:ring-purple-500/20"
                    />
                    <label htmlFor="requireEmailVerification" className="text-sm font-medium text-slate-700">
                      Require Email Verification
                    </label>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveGeneral}
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FiSave className="h-4 w-4" />
                    Save General Settings
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
