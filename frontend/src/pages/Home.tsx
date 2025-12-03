import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiSearch,
  FiZap,
  FiShield,
  FiBell,
  FiUsers,
  FiStar,
  FiTarget,
  FiHeart,
  FiAward,
  FiGlobe,
  FiTrendingUp,
  FiDatabase,
  FiClock,
  FiCheckCircle
} from "react-icons/fi";
import {
  BsRocket,
  BsGraphUp,
  BsLightning,
  BsStarFill,
  BsBarChart
} from "react-icons/bs";
import logo from "../assets/logo.png";

const highlights = [
  {
    title: "Smart Catalog",
    description: "Advanced search, dynamic filters, and personalized recommendations powered by AI.",
    icon: FiSearch,
    gradient: "from-sky-400 via-cyan-400 to-blue-500",
    iconBg: "bg-gradient-ocean"
  },
  {
    title: "Seamless Borrowing",
    description: "Reserve, extend, or return your books in just a few clicks on any device.",
    icon: FiBookOpen,
    gradient: "from-blue-500 via-purple-500 to-indigo-500",
    iconBg: "bg-gradient-sky"
  },
  {
    title: "Advanced Analytics",
    description: "Real-time dashboards with insights and predictive trends for your library.",
    icon: BsBarChart,
    gradient: "from-emerald-400 via-teal-400 to-cyan-500",
    iconBg: "bg-gradient-forest"
  },
  {
    title: "Smart Notifications",
    description: "Intelligent alerts for returns, reservations, and personalized recommendations.",
    icon: FiBell,
    gradient: "from-amber-400 via-pink-400 to-purple-500",
    iconBg: "bg-gradient-sunset"
  }
];

const stats = [
  { label: "Available Titles", value: "12,500", icon: FiBookOpen, color: "text-brand-primary" },
  { label: "Active Loans", value: "1,240", icon: BsRocket, color: "text-brand-accent" },
  { label: "Active Readers", value: "5,680", icon: FiUsers, color: "text-brand-success" }
];

const features = [
  {
    title: "A Complete Platform",
    description: "BiblioSmart centralizes catalog management, user journeys, and operational tracking in one unified platform.",
    icon: FiDatabase,
    gradient: "from-brand-primary to-brand-secondary"
  },
  {
    title: "Maximum Security",
    description: "JWT authentication, end-to-end encryption, and full GDPR compliance guaranteed for your peace of mind.",
    icon: FiShield,
    gradient: "from-brand-success to-brand-primary"
  },
  {
    title: "Optimal Performance",
    description: "Lightning-fast interface built with React 18, optimized for speed and scalability.",
    icon: BsLightning,
    gradient: "from-brand-accent to-brand-purple"
  },
  {
    title: "User Experience",
    description: "Modern, intuitive design accessible on all devices with a focus on usability and aesthetics.",
    icon: BsStarFill,
    gradient: "from-brand-pink to-brand-warning"
  }
];

const benefits = [
  {
    icon: FiTarget,
    title: "Precision Matching",
    description: "AI-powered recommendations",
    color: "text-brand-primary"
  },
  {
    icon: FiClock,
    title: "Save Time",
    description: "Automated workflows",
    color: "text-brand-accent"
  },
  {
    icon: BsGraphUp,
    title: "Grow Faster",
    description: "Data-driven insights",
    color: "text-brand-success"
  },
  {
    icon: FiHeart,
    title: "User Delight",
    description: "Exceptional experience",
    color: "text-brand-pink"
  }
];

export const Home = () => {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative grid gap-16 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 px-6 py-3 backdrop-blur-sm ring-1 ring-emerald-500/20"
            >
              <BsStarFill className="h-5 w-5 text-emerald-500" />
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-sm font-bold text-transparent">
                Next Generation Platform
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-6xl font-bold leading-[1.1] text-slate-900 md:text-7xl lg:text-8xl">
                Connecting Reading to the{" "}
                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  Digital Age
                </span>
              </h1>
              <p className="text-xl leading-relaxed text-slate-600 md:text-2xl">
                Offer your users a modern library experience: guided discovery, seamless borrowing,
                smart notifications, and powerful analytics for your team.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/catalogue"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-10 py-5 font-bold text-white shadow-soft-xl transition-all hover:scale-105 hover:shadow-glow-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FiZap className="h-6 w-6" />
                  Explore Library
                  <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                to="/demonstration"
                className="group rounded-full border-2 border-slate-300 bg-white/70 px-10 py-5 font-bold text-slate-700 backdrop-blur-sm transition-all hover:border-brand-primary hover:bg-white hover:text-brand-primary hover:shadow-soft-lg"
              >
                Request Demo
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-brand-primary to-brand-accent"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-600">
                  5,680+ active readers
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="h-5 w-5 fill-brand-warning text-brand-warning" />
                ))}
                <span className="ml-2 text-sm font-semibold text-slate-600">5.0 Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative"
          >
            <div className="card-glass overflow-hidden p-8">
              {/* Header */}
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl bg-gradient-ocean p-4">
                  <BsBarChart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    BiblioSmart in Numbers
                  </h2>
                  <p className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-brand-success" />
                    Real-time data
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-5">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="group relative overflow-hidden rounded-2xl bg-white/80 p-6 backdrop-blur-sm transition-all hover:bg-white hover:shadow-soft-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-4xl font-bold text-slate-900">{stat.value}</p>
                          <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-slate-100 to-white p-4 transition-transform group-hover:scale-110">
                          <Icon className={`h-7 w-7 ${stat.color}`} />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-slate-900">
            Powerful <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            Everything you need to run a modern, efficient library
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-soft-lg transition-all hover:scale-105 hover:shadow-soft-xl"
              >
                {/* Icon */}
                <div className={`mb-6 inline-flex rounded-2xl ${highlight.iconBg} p-5 shadow-soft-md`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-slate-900">{highlight.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{highlight.description}</p>

                {/* Gradient Border */}
                <div className={`absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r ${highlight.gradient} transition-all duration-500 group-hover:w-full`} />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-50 to-white p-16 shadow-soft-xl">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-brand-purple/5 blur-3xl" />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-5xl font-bold text-slate-900">
              Why Choose <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">BiblioSmart</span>?
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-4 inline-flex rounded-2xl bg-white p-5 shadow-soft-md">
                    <Icon className={`h-8 w-8 ${benefit.color}`} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{benefit.title}</h3>
                  <p className="text-sm text-slate-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-soft-lg transition-all hover:shadow-soft-xl"
            >
              <div className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${feature.gradient} p-5`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
            </motion.div>
          );
        })}
      </section>

      {/* How It Works */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-slate-900">
            How Does It <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Work</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            Set up BiblioSmart in three simple steps
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Import Your Catalog",
              description: "Sync your existing database or use our ready-to-use template with Prisma.",
              icon: FiDatabase,
              color: "from-brand-primary to-brand-secondary"
            },
            {
              step: "2",
              title: "Customize Experience",
              description: "Enable notifications, adjust branding, and configure your preferences.",
              icon: FiTarget,
              color: "from-brand-accent to-brand-purple"
            },
            {
              step: "3",
              title: "Deploy to Production",
              description: "Launch on mobile and desktop with monitoring, recommendations, and smart alerts.",
              icon: BsRocket,
              color: "from-brand-success to-brand-primary"
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group relative"
              >
                <div className="overflow-hidden rounded-3xl bg-white p-10 shadow-soft-lg transition-all hover:shadow-soft-xl">
                  <div className={`mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-soft-lg`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>

                {/* Connection Line */}
                {index < 2 && (
                  <div className={`absolute right-0 top-1/2 hidden h-1 w-10 -translate-y-1/2 translate-x-full bg-gradient-to-r ${item.color} md:block`} />
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 shadow-soft-xl"
      >
        {/* Decorative Background with organic shapes */}
        <div className="absolute inset-0">
          {/* Large organic blob 1 */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full bg-white/10 blur-3xl"
            style={{
              borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%"
            }}
          />

          {/* Large organic blob 2 */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -90, 0],
              x: [0, -30, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-64 -left-64 h-[700px] w-[700px] rounded-full bg-white/15 blur-3xl"
            style={{
              borderRadius: "41% 59% 48% 52% / 68% 32% 68% 32%"
            }}
          />

          {/* Medium blob */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-2xl"
            style={{
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%"
            }}
          />

          {/* Small floating circles */}
          <motion.div
            animate={{ y: [0, -40, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-48 top-32 h-32 w-32 rounded-full bg-white/20 blur-xl"
          />
          <motion.div
            animate={{ y: [0, 40, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-48 left-48 h-48 w-48 rounded-full bg-white/15 blur-2xl"
          />

          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-teal-600/30 via-transparent to-emerald-500/20" />

          {/* Subtle pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMCAwIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        </div>

        <div className="relative grid gap-16 p-16 lg:grid-cols-2 lg:items-center lg:p-24">
          {/* Left - Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-white/30 blur-3xl"
              />
              <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="rounded-[3rem] bg-white/10 p-16 backdrop-blur-sm ring-2 ring-white/20 shadow-soft-xl">
                  <img src={logo} alt="BiblioSmart Logo" className="h-56 w-56 lg:h-72 lg:w-72" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10 text-center lg:text-left"
          >
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-white lg:text-7xl">
                Ready to Transform
                <br />
                Your Library?
              </h2>
              <p className="text-2xl leading-relaxed text-white/90">
                Join libraries that chose BiblioSmart to modernize their reader experience with cutting-edge technology.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 lg:justify-start">
              <Link
                to="/catalogue"
                className="group relative overflow-hidden rounded-full bg-white px-10 py-5 font-bold text-brand-primary shadow-soft-xl transition-all hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <BsRocket className="h-6 w-6" />
                  Get Started Now
                  <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                to="/demonstration"
                className="group rounded-full border-2 border-white/40 bg-white/10 px-10 py-5 font-bold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20"
              >
                Schedule a Demo
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-6 lg:justify-start">
              {[
                { icon: FiCheckCircle, text: "Free Trial" },
                { icon: FiAward, text: "No Credit Card" },
                { icon: FiGlobe, text: "24/7 Support" }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <Icon className="h-6 w-6 text-white" />
                    <span className="font-semibold text-white/90">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
