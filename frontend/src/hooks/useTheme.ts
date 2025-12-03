import { useEffect } from "react";
import { create } from "zustand";

type ThemeMode = "light" | "dark";

interface ThemeStore {
  theme: ThemeMode;
  initialized: boolean;
  setTheme: (mode: ThemeMode) => void;
}

const STORAGE_KEY = "bibliosmart-theme";

const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light",
  initialized: false,
  setTheme: (mode) => {
    set({ theme: mode });
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, mode);
      document.documentElement.classList.toggle("dark", mode === "dark");
    }
  }
}));

export const useTheme = () => {
  const { theme, initialized, setTheme } = useThemeStore();

  useEffect(() => {
    if (initialized) return;
    const stored = (typeof window !== "undefined"
      ? window.localStorage.getItem(STORAGE_KEY)
      : "") as ThemeMode | null;
    const systemPrefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = stored ?? (systemPrefersDark ? "dark" : "light");
    setTheme(next);
    useThemeStore.setState({ initialized: true });
  }, [initialized, setTheme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return { theme, toggleTheme };
};
