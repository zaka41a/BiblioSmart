import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiFacebook,
  FiHeart,
  FiBookOpen
} from "react-icons/fi";
import logo from "../assets/logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "Contact", path: "/contact" }
    ],
    resources: [
      { label: "Catalog", path: "/catalogue" }
    ],
    legal: [
      { label: "Legal Notice", path: "/legal-notice" },
      { label: "Privacy Policy", path: "/privacy-policy" }
    ]
  };

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/zaka41a", label: "GitHub" },
    { icon: FiLinkedin, href: "https://linkedin.com/in/zakaria-sabiri", label: "LinkedIn" },
    { icon: FiTwitter, href: "https://twitter.com/zaka41a", label: "Twitter" },
    { icon: FiFacebook, href: "https://facebook.com", label: "Facebook" }
  ];

  return (
    <footer className="relative border-t border-slate-800 bg-slate-950 overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-slate-950 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="group inline-flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="BiblioSmart Logo"
                className="h-12 w-12 rounded-xl"
                loading="lazy"
              />
              <div>
                <span className="text-emerald-400 text-2xl font-black">
                  BiblioSmart
                </span>
                <p className="text-sm font-bold text-slate-500">Smart Library Platform</p>
              </div>
            </Link>

            <p className="mt-4 text-base leading-relaxed text-slate-400 max-w-md">
              Your gateway to unlimited knowledge. Discover, read, and manage your digital library
              with our innovative platform designed for modern readers.
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <a
                href="mailto:zaksab98@gmail.com"
                className="group flex items-center gap-3 text-sm text-slate-400 transition-all hover:text-emerald-400 hover:translate-x-1"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700 transition-all group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30">
                  <FiMail className="h-4 w-4" />
                </div>
                <span className="font-medium">zaksab98@gmail.com</span>
              </a>

              <a
                href="tel:+4917620827199"
                className="group flex items-center gap-3 text-sm text-slate-400 transition-all hover:text-emerald-400 hover:translate-x-1"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700 transition-all group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30">
                  <FiPhone className="h-4 w-4" />
                </div>
                <span className="font-medium">+49 176 20827199</span>
              </a>

              <div className="group flex items-center gap-3 text-sm text-slate-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700">
                  <FiMapPin className="h-4 w-4" />
                </div>
                <span className="font-medium">Aachen, Germany</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="text-center">
            <h3 className="mb-8 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-wider text-white">
              <div className="h-1 w-1 rounded-full bg-emerald-400" />
              Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-all hover:text-emerald-400"
                  >
                    <FiBookOpen className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 text-emerald-400" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="text-center">
            <h3 className="mb-8 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-wider text-white">
              <div className="h-1 w-1 rounded-full bg-teal-400" />
              Resources
            </h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-all hover:text-emerald-400"
                  >
                    <FiBookOpen className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 text-teal-400" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-center">
            <h3 className="mb-8 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-wider text-white">
              <div className="h-1 w-1 rounded-full bg-cyan-400" />
              Legal
            </h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-all hover:text-emerald-400"
                  >
                    <FiBookOpen className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 text-cyan-400" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-emerald-500/20 via-50% to-transparent" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Copyright */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-400">
            <span className="font-medium">© {currentYear} BiblioSmart.</span>
            <span className="hidden md:inline">•</span>
            <span>Created by</span>
            <a
              href="https://github.com/zaka41a"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 hover:underline decoration-emerald-400/30 underline-offset-4"
            >
              Zaka41a
            </a>
            <span className="flex items-center gap-1.5">
              with
              <FiHeart className="h-4 w-4 text-red-500 animate-pulse" />
              in
            </span>
            <span className="font-semibold text-slate-300">Aachen, Germany</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 transition-all hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5 transition-transform group-hover:rotate-6" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
