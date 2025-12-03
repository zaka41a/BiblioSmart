import { PropsWithChildren } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative min-h-screen">
      {/* Ambient Background with Logo Color */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Animated Orbs - Logo Blue Only */}
        <div className="absolute top-0 right-0 h-[700px] w-[700px] rounded-full bg-brand-primary/8 blur-3xl animate-pulse"
             style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-primary/6 blur-3xl animate-pulse"
             style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-brand-primary/7 blur-3xl animate-pulse"
             style={{ animationDuration: '5s', animationDelay: '2s' }} />

        {/* Decorative Dots Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
             style={{
               backgroundImage: `radial-gradient(circle, #0EA5E9 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }}
        />
      </div>

      <Header />
      <main className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-20">{children}</main>
      <Footer />
    </div>
  );
};
