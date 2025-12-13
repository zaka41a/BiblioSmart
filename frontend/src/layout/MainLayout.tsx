import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-slate-900">
      {/* Ambient Background with Emerald Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Animated Orbs - Emerald Theme */}
        <div className="absolute top-0 right-0 h-[700px] w-[700px] rounded-full bg-emerald-500/5 blur-3xl animate-pulse"
             style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-teal-500/4 blur-3xl animate-pulse"
             style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-cyan-500/4 blur-3xl animate-pulse"
             style={{ animationDuration: '5s', animationDelay: '2s' }} />

        {/* Decorative Dots Grid */}
        <div className="absolute inset-0 opacity-[0.02]"
             style={{
               backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }}
        />
      </div>

      <Header />
      <main className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
