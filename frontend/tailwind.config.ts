import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0EA5E9",      // Logo sky blue
          secondary: "#06B6D4",    // Cyan variant
          accent: "#3B82F6",       // Blue accent
          success: "#10B981",      // Green
          warning: "#F59E0B",      // Amber
          error: "#EF4444",        // Red
          dark: "#1E293B",         // Logo dark blue
          darkest: "#0F172A",      // Darker variant
          muted: "#64748B",        // Muted text
          light: "#F8FAFC",        // Light background
          purple: "#8B5CF6",       // Purple accent
          pink: "#EC4899",         // Pink accent
          indigo: "#6366F1"        // Indigo accent
        },
        surface: {
          white: "#FFFFFF",
          soft: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          hover: "#F1F5F9"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Cal Sans", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(30, 41, 59, 0.04), 0 1px 3px rgba(30, 41, 59, 0.02)',
        'soft-md': '0 4px 16px rgba(30, 41, 59, 0.06), 0 2px 6px rgba(30, 41, 59, 0.03)',
        'soft-lg': '0 8px 24px rgba(30, 41, 59, 0.08), 0 4px 12px rgba(30, 41, 59, 0.04)',
        'soft-xl': '0 16px 48px rgba(30, 41, 59, 0.1), 0 8px 20px rgba(30, 41, 59, 0.05)',
        'glow': '0 0 24px rgba(14, 165, 233, 0.2)',
        'glow-lg': '0 0 48px rgba(14, 165, 233, 0.25)',
        'inner-soft': 'inset 0 2px 4px rgba(30, 41, 59, 0.05)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-soft': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-ocean': 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)',
        'gradient-sky': 'linear-gradient(135deg, #3B82F6 0%, #0EA5E9 100%)',
        'gradient-forest': 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgb(14, 165, 233) 0px, transparent 50%), radial-gradient(at 80% 0%, rgb(59, 130, 246) 0px, transparent 50%), radial-gradient(at 0% 50%, rgb(139, 92, 246) 0px, transparent 50%)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.3s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      backdropBlur: {
        'xs': '2px'
      }
    }
  },
  plugins: []
};

export default config;
