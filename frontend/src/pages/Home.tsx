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
import { useBooks } from "../context/BookContext";

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
  const { books } = useBooks();
  const users = JSON.parse(localStorage.getItem("bibliosmart_registered_users") || "[]");

  // Calculate real stats
  const totalBooks = books.length;
  const activeLoans = books.filter((b: any) => !b.available).length;
  const activeUsers = users.length;

  const stats = [
    { label: "Available Titles", value: totalBooks.toLocaleString(), icon: FiBookOpen, color: "text-brand-primary" },
    { label: "Active Loans", value: activeLoans.toLocaleString(), icon: BsRocket, color: "text-brand-accent" },
    { label: "Active Readers", value: activeUsers.toLocaleString(), icon: FiUsers, color: "text-brand-success" }
  ];

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-12 shadow-lg">
        {/* Simple Background Gradient */}
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-black/10 blur-3xl" />

        <div className="relative grid gap-12 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 px-5 py-2 backdrop-blur-sm">
              <BsStarFill className="h-5 w-5 text-white" />
              <span className="text-sm font-semibold text-white tracking-wide">
                NEXT GENERATION PLATFORM
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl font-black text-white md:text-6xl leading-tight">
                Connecting Reading to the{" "}
                <span className="bg-gradient-to-r from-lime-200 via-green-200 to-cyan-200 bg-clip-text text-transparent">
                  Digital Age
                </span>
              </h1>
              <p className="text-lg leading-relaxed text-white/90 md:text-xl font-medium">
                Offer your users a modern library experience: guided discovery,
                seamless borrowing, smart notifications, and powerful analytics for your team.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/catalogue"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-emerald-700 shadow-lg transition-all hover:shadow-xl"
              >
                <FiZap className="h-5 w-5" />
                <span>Explore Library</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                to="/register"
                className="rounded-xl border border-white/40 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl shadow-xl">
              <img
                src="/book-pic.png"
                alt="BiblioSmart - Modern Library Management"
                className="w-full h-auto object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/book-pic.jpg";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-4xl font-bold text-white">
            Powerful <span className="text-emerald-400">Features</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            Everything you need to run a modern, efficient library
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <div
                key={highlight.title}
                className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50 p-6 shadow-lg backdrop-blur-sm transition-all hover:border-emerald-500/50"
              >
                {/* Icon */}
                <div className="mb-5 inline-flex rounded-xl bg-emerald-600 p-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-bold text-white">{highlight.title}</h3>
                <p className="text-sm leading-relaxed text-slate-300">{highlight.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-12 shadow-lg">
        <div>
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-4xl font-bold text-white">
              Why Choose <span className="text-emerald-400">BiblioSmart</span>?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="text-center"
                >
                  <div className="mx-auto mb-4 inline-flex rounded-xl bg-slate-950 border border-slate-700 p-4">
                    <Icon className="h-7 w-7 text-emerald-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{benefit.title}</h3>
                  <p className="text-sm text-slate-300">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50 p-6 shadow-lg backdrop-blur-sm transition-all hover:border-emerald-500/50"
            >
              <div className="mb-5 inline-flex rounded-xl bg-emerald-600 p-4">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{feature.description}</p>
            </div>
          );
        })}
      </section>

      {/* How It Works */}
      <section>
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-4xl font-bold text-white">
            How Does It <span className="text-emerald-400">Work</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            Set up BiblioSmart in three simple steps
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Import Your Catalog",
              description: "Sync your existing database or use our ready-to-use template with Prisma.",
              icon: FiDatabase
            },
            {
              step: "2",
              title: "Customize Experience",
              description: "Enable notifications, adjust branding, and configure your preferences.",
              icon: FiTarget
            },
            {
              step: "3",
              title: "Deploy to Production",
              description: "Launch on mobile and desktop with monitoring, recommendations, and smart alerts.",
              icon: BsRocket
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative"
              >
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50 p-8 shadow-lg backdrop-blur-sm transition-all hover:border-emerald-500/50">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-600">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-300">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 shadow-lg">
        {/* Simple Background */}
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-black/10 blur-3xl" />

        <div className="relative grid gap-12 p-12 lg:grid-cols-2 lg:items-center">
          {/* Left - Logo */}
          <div className="relative flex items-center justify-center">
            <div className="rounded-xl bg-white/10 p-12 backdrop-blur-sm border border-white/20">
              <img src={logo} alt="BiblioSmart Logo" loading="lazy" className="h-48 w-48 lg:h-56 lg:w-56" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white lg:text-5xl">
                Ready to Transform
                <br />
                Your Library?
              </h2>
              <p className="text-lg leading-relaxed text-white/90">
                Join libraries that chose BiblioSmart to modernize their reader experience with cutting-edge technology.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                to="/catalogue"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-emerald-700 shadow-lg transition-all hover:shadow-xl"
              >
                <BsRocket className="h-5 w-5" />
                Get Started Now
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                to="/register"
                className="rounded-xl border border-white/40 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20"
              >
                Create Account
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 lg:justify-start">
              {[
                { icon: FiCheckCircle, text: "Free Trial" },
                { icon: FiAward, text: "No Credit Card" },
                { icon: FiGlobe, text: "24/7 Support" }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-white" />
                    <span className="font-semibold text-white/90 text-sm">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
