import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiArrowLeft, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Button } from "../components/ui/Button";
import emailjs from "@emailjs/browser";
import { api } from "../api/client";
import { useFormValidation, commonRules } from "../hooks/useFormValidation";

export const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [serverError, setServerError] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
  } = useFormValidation(
    {
      email: "",
    },
    {
      email: [
        { required: true, message: "Email is required" },
        { pattern: commonRules.email.pattern, message: commonRules.email.message },
      ],
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!validateAll()) {
      return;
    }

    setIsLoading(true);
    setServerError("");
    setIsDemoMode(false);
    setResetLink("");
    setServerMessage("");

    try {
      const response = await api.post("/auth/forgot-password", { email: values.email });
      const { message, emailData } = response.data;

      if (message) {
        setServerMessage(message);
      }

      if (!emailData) {
        setIsSuccess(true);
        setIsDemoMode(false);
        return;
      }

      const rawSettings = localStorage.getItem("bibliosmart_email_settings");
      const emailSettings = rawSettings ? JSON.parse(rawSettings) : {};
      const { service_id, template_id, user_id, template_params } = emailData;
      const finalServiceId = service_id || emailSettings.serviceId;
      const finalTemplateId = template_id || emailSettings.templateId;
      const finalUserId = user_id || emailSettings.publicKey;
      const fallbackResetUrl = `${window.location.origin}/reset-password?token=TOKEN`;
      const finalTemplateParams: Record<string, string> = {
        ...(template_params || {}),
        to_email: template_params?.to_email || values.email,
        to_name: template_params?.to_name || emailSettings.fromName || values.email,
        user_email: template_params?.user_email || values.email,
        from_name: emailSettings.fromName || template_params?.from_name || "BiblioSmart",
        from_email: emailSettings.fromEmail || template_params?.from_email || "noreply@bibliosmart.com",
        reply_to: template_params?.reply_to || emailSettings.fromEmail || "support@bibliosmart.com",
        subject:
          template_params?.subject || "Reset Your Password",
        message:
          template_params?.message ||
          "You requested a password reset. Click the link below (valid for 1 hour).",
        reset_url: template_params?.reset_url ?? "",
        reset_link: template_params?.reset_link ?? ""
      };

      if (!finalTemplateParams.reset_url && template_params?.reset_link) {
        finalTemplateParams.reset_url = template_params.reset_link;
      }

      if (!finalTemplateParams.reset_link && template_params?.reset_url) {
        finalTemplateParams.reset_link = template_params.reset_url;
      }

      if (!finalTemplateParams.reset_url) {
        finalTemplateParams.reset_url = `${window.location.origin}/reset-password?token=${template_params?.token ?? ""}`;
      }

      if (!finalTemplateParams.reset_link) {
        finalTemplateParams.reset_link = finalTemplateParams.reset_url || fallbackResetUrl;
      }

      if (!finalTemplateParams.reset_url) {
        finalTemplateParams.reset_url = finalTemplateParams.reset_link || fallbackResetUrl;
      }

      setResetLink(finalTemplateParams.reset_url || finalTemplateParams.reset_link || fallbackResetUrl);

      const hasEmailJsConfig = finalServiceId && finalTemplateId && finalUserId;

      if (hasEmailJsConfig) {
        try {
          await emailjs.send(finalServiceId, finalTemplateId, finalTemplateParams, finalUserId);
          setIsSuccess(true);
          setIsDemoMode(false);
        } catch (emailError) {
          console.error("Error sending email via EmailJS:", emailError);
          setIsSuccess(true);
          setIsDemoMode(true);
        }
      } else {
        console.warn("Missing EmailJS configuration. Falling back to demo mode.");
        setIsSuccess(true);
        setIsDemoMode(true);
      }
    } catch (error: unknown) {
      console.error("Error requesting password reset:", error);
      const err = error as { response?: { data?: { message?: string } } };
      const message =
        err?.response?.data?.message || "Failed to send reset email. Please try again or contact support.";
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-white px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="rounded-3xl bg-white p-10 shadow-soft-xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500">
              <FiCheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-3 text-2xl font-bold text-slate-900">
              {isDemoMode ? "Reset Link Generated" : "Check Your Email"}
            </h1>
            <p className="mb-8 text-slate-600">
              {serverMessage
                ? serverMessage
                : isDemoMode
                  ? <>We've generated a reset link for <strong>{values.email}</strong>.</>
                  : <>We've sent a reset link to <strong>{values.email}</strong>.</>
              }
            </p>
            {!isDemoMode && (
              <p className="mb-6 text-sm text-slate-500">
                The link will expire in 1 hour. Check your spam folder if you don't see it.
              </p>
            )}

            {/* Demo note - only show if EmailJS is not configured */}
            {isDemoMode && (
              <div className="mb-6 rounded-2xl bg-amber-50 border-2 border-amber-200 p-4">
                <p className="text-sm text-amber-800 font-semibold mb-2">📧 Demo Mode</p>
                <p className="text-xs text-amber-700 mb-2">
                  Automatic email sending is not configured. Copy this link to reset your password:
                </p>
                <div className="mt-2 p-2 bg-white rounded-lg border border-amber-200">
                  <code className="text-xs text-slate-700 break-all">
                    {resetLink || `${window.location.origin}/reset-password?token=YOUR_TOKEN`}
                  </code>
                </div>
              </div>
            )}

            <Link to="/login">
              <Button variant="primary" className="w-full">
                Back to Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back to Login */}
        <Link
          to="/login"
          className="mb-6 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-emerald-600"
        >
          <FiArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Login</span>
        </Link>

        <div className="rounded-3xl bg-white p-10 shadow-soft-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500">
              <FiMail className="h-7 w-7 text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-slate-900">Forgot Password?</h1>
            <p className="text-slate-600">
              Enter your email address to receive a reset link.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-2xl bg-red-50 border-2 border-red-200 p-4"
                role="alert"
              >
                <FiAlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-red-800">{serverError}</p>
              </motion.div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <FiMail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder="your.email@example.com"
                  className={`w-full rounded-2xl border-2 py-3.5 pl-12 pr-4 text-slate-700 transition-all focus:outline-none focus:ring-4 placeholder:text-slate-400 ${
                    touched.email && errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10"
                  }`}
                  aria-invalid={touched.email && errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {touched.email && errors.email && (
                <p id="email-error" className="flex items-center gap-1.5 text-sm text-red-600">
                  <FiAlertCircle className="h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Remember your password?{" "}
              <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
