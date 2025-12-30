import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Note: Token is NOT stored here for security reasons
  // It should be in httpOnly cookies managed by the backend
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("bibliosmart_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("bibliosmart_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(API_ENDPOINTS.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Login failed" }));
        console.error("Login error:", error);
        return false;
      }

      const data = await response.json();

      if (data.success && data.data) {
        // Backend returns: { success: true, data: { user, token } }
        // Token is handled by httpOnly cookies - we don't store it in localStorage
        const { user: userData } = data.data;

        const loggedInUser: User = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role.toLowerCase() as UserRole,
        };

        setUser(loggedInUser);
        // Only store non-sensitive user info (no token!)
        localStorage.setItem("bibliosmart_user", JSON.stringify(loggedInUser));

        // Navigate based on role
        if (loggedInUser.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/utilisateur");
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error("Login request failed:", error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole = "user"): Promise<boolean> => {
    try {
      const response = await fetch(API_ENDPOINTS.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password, role: role.toUpperCase() }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Registration failed" }));
        console.error("Registration error:", error);
        return false;
      }

      const data = await response.json();

      if (data.success) {
        return true;
      }

      return false;
    } catch (error) {
      console.error("Registration request failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Try to logout from backend
      await fetch(API_ENDPOINTS.logout, {
        method: "POST",
        credentials: "include",
      }).catch(() => {
        // Ignore errors, we're logging out anyway
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    setUser(null);
    localStorage.removeItem("bibliosmart_user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
