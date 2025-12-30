import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiUser,
  FiUserPlus,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiAlertCircle,
  FiCheck
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useFormValidation, commonRules } from "../hooks/useFormValidation";

interface RegisterFormValues extends Record<string, string> {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
  } = useFormValidation<RegisterFormValues>(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    {
      name: [
        { required: true, message: "Name is required" },
        { minLength: 2, message: "Name must be at least 2 characters" },
      ],
      email: [
        { required: true, message: "Email is required" },
        { pattern: commonRules.email.pattern, message: commonRules.email.message },
      ],
      password: [
        { required: true, message: "Password is required" },
        { minLength: commonRules.password.minLength, message: commonRules.password.message },
        {
          custom: (value: string): boolean => /[A-Z]/.test(value),
          message: "Password must contain at least one uppercase letter",
        },
        {
          custom: (value: string): boolean => /[0-9]/.test(value),
          message: "Password must contain at least one number",
        },
      ],
      confirmPassword: [
        { required: true, message: "Please confirm your password" },
        {
          custom: (value: string): boolean => value === values.password,
          message: "Passwords do not match",
        },
      ],
    }
  );

  // Password strength indicator
  const passwordStrength = useMemo(() => {
    const password = values.password;
    if (!password) return { level: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { level: strength, label: "Weak", color: "bg-red-500" };
    if (strength <= 3) return { level: strength, label: "Medium", color: "bg-amber-500" };
    return { level: strength, label: "Strong", color: "bg-emerald-500" };
  }, [values.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    // Validate all fields
    if (!validateAll()) {
      return;
    }

    setIsLoading(true);

    try {
      const success = await registerUser(values.name, values.email, values.password);

      if (success) {
        navigate("/login");
      } else {
        setServerError("Email already exists or registration failed. Please try again.");
      }
    } catch {
      setServerError("An error occurred during registration. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute -left-64 -bottom-64 h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-600">Join us and start your reading journey</p>
        </div>

        {/* Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-white p-8 shadow-soft-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  placeholder="John Doe"
                  className={`w-full rounded-2xl border-2 bg-white pl-12 pr-4 py-3.5 text-slate-700 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-4 ${
                    touched.name && errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10"
                  }`}
                  aria-invalid={touched.name && errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
              </div>
              {touched.name && errors.name && (
                <p id="name-error" className="flex items-center gap-1.5 text-sm text-red-600">
                  <FiAlertCircle className="h-4 w-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder="your.email@example.com"
                  className={`w-full rounded-2xl border-2 bg-white pl-12 pr-4 py-3.5 text-slate-700 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-4 ${
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

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder="At least 6 characters, 1 uppercase, 1 number"
                  className={`w-full rounded-2xl border-2 bg-white pl-12 pr-12 py-3.5 text-slate-700 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-4 ${
                    touched.password && errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10"
                  }`}
                  aria-invalid={touched.password && errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "password-error" : "password-strength"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {values.password && (
                <div id="password-strength" className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.level / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {[
                      { test: values.password.length >= 6, label: "At least 6 characters" },
                      { test: /[A-Z]/.test(values.password), label: "One uppercase letter" },
                      { test: /[0-9]/.test(values.password), label: "One number" },
                    ].map((requirement, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        {requirement.test ? (
                          <FiCheck className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <div className="h-3 w-3 rounded-full border-2 border-slate-300" />
                        )}
                        <span className={requirement.test ? "text-emerald-600" : "text-slate-500"}>
                          {requirement.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {touched.password && errors.password && (
                <p id="password-error" className="flex items-center gap-1.5 text-sm text-red-600">
                  <FiAlertCircle className="h-4 w-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700">
                Confirm Password
              </label>
              <div className="relative">
                <FiCheckCircle className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  onBlur={() => handleBlur("confirmPassword")}
                  placeholder="Confirm your password"
                  className={`w-full rounded-2xl border-2 bg-white pl-12 pr-12 py-3.5 text-slate-700 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-4 ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                      : values.confirmPassword && values.confirmPassword === values.password
                        ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/10"
                        : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10"
                  }`}
                  aria-invalid={touched.confirmPassword && errors.confirmPassword ? "true" : "false"}
                  aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p id="confirmPassword-error" className="flex items-center gap-1.5 text-sm text-red-600">
                  <FiAlertCircle className="h-4 w-4" />
                  {errors.confirmPassword}
                </p>
              )}
              {values.confirmPassword && values.confirmPassword === values.password && !errors.confirmPassword && (
                <p className="flex items-center gap-1.5 text-sm text-emerald-600">
                  <FiCheckCircle className="h-4 w-4" />
                  Passwords match
                </p>
              )}
            </div>

            {/* Server Error Message */}
            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-2xl bg-red-50 border-2 border-red-200 p-4"
                role="alert"
              >
                <FiAlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 font-medium">{serverError}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              type="submit"
              disabled={isLoading}
              className="group w-full rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-4 font-bold text-white shadow-soft-lg transition-all hover:shadow-glow disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <FiUserPlus className="h-5 w-5 transition-transform group-hover:scale-110" />
                    Create Account
                  </>
                )}
              </span>
            </motion.button>

            {/* Login Link */}
            <div className="text-center text-sm">
              <span className="text-slate-600">Already have an account? </span>
              <Link
                to="/login"
                className="font-semibold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700"
              >
                Sign In
              </Link>
            </div>
          </form>
        </motion.div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
