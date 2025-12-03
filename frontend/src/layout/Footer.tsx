import { HeartIcon } from "@heroicons/react/24/solid";
import { EnvelopeIcon, ShieldCheckIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const footerLinks = [
  { label: "Contact", href: "mailto:zaksab98@gmail.com", icon: EnvelopeIcon },
  { label: "Legal Notice", href: "/legal", icon: DocumentTextIcon },
  { label: "Privacy Policy", href: "/privacy", icon: ShieldCheckIcon }
];

export const Footer = () => {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-brand-dark">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Left Section - Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 lg:col-span-2"
          >
            <div className="flex items-center gap-3">
              <img src={logo} alt="BiblioSmart Logo" className="h-16 w-16" />
              <div>
                <div className="inline-flex items-center gap-2">
                  <span className="text-2xl font-bold text-brand-primary">BiblioSmart</span>
                </div>
                <p className="text-sm text-slate-400">Smart Library Platform</p>
              </div>
            </div>
            <p className="flex items-center gap-2 text-lg font-medium text-slate-200">
              Built with <HeartIcon className="h-5 w-5 animate-pulse text-red-500" /> for book lovers
            </p>
            <p className="max-w-xl text-base leading-relaxed text-slate-300">
              A modern platform connecting reading to the digital age. Discover, borrow, and share your favorite books with an intuitive interface powered by cutting-edge technology.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-200">
                  Created by <span className="text-brand-primary">zaka41a</span>
                </p>
                <p className="text-xs text-slate-500">
                  © {new Date().getFullYear()} BiblioSmart. All rights reserved.
                </p>
              </div>
              <div className="h-12 w-px bg-slate-700" />
              <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 border border-green-500/20">
                <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500 shadow-glow" />
                <span className="text-sm font-semibold text-green-400">All Systems Operational</span>
              </div>
            </div>
          </motion.div>

          {/* Right Section - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Quick Links
            </h3>
            <div className="space-y-3">
              {footerLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 border border-white/10 transition-all hover:bg-white/10 hover:border-brand-primary/50"
                  >
                    <Icon className="h-5 w-5 text-slate-400 transition-colors group-hover:text-brand-primary" />
                    <span className="font-medium text-slate-300 transition-colors group-hover:text-brand-primary">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 border-t border-white/10 pt-8"
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-400">
              Made with passion in Aachen, Germany 🇩🇪
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <a href="/accessibility" className="transition-colors hover:text-brand-primary">
                Accessibility
              </a>
              <span>•</span>
              <a href="/sitemap" className="transition-colors hover:text-brand-primary">
                Sitemap
              </a>
              <span>•</span>
              <a href="/api-docs" className="transition-colors hover:text-brand-primary">
                API Docs
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
