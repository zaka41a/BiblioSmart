import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { initializeAdminAccount } from "../utils/initAdmin";

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, role?: UserRole) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from localStorage on mount and initialize admin
  useEffect(() => {
    // Initialize default admin account
    initializeAdminAccount();

    const storedUser = localStorage.getItem("bibliosmart_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("bibliosmart_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    // Check registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("bibliosmart_registered_users") || "[]");
    const foundUser = registeredUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const loggedInUser: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      };
      setUser(loggedInUser);
      localStorage.setItem("bibliosmart_user", JSON.stringify(loggedInUser));

      // Navigate based on role
      if (foundUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/utilisateur");
      }
      return true;
    }

    return false;
  };

  const register = (name: string, email: string, password: string, role: UserRole = "user"): boolean => {
    // Get existing registered users
    const registeredUsers = JSON.parse(localStorage.getItem("bibliosmart_registered_users") || "[]");

    // Check if email already exists
    const emailExists = registeredUsers.some((u: any) => u.email === email);
    if (emailExists) {
      return false;
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password, // In a real app, this should be hashed
      role: role
    };

    // Save to localStorage
    registeredUsers.push(newUser);
    localStorage.setItem("bibliosmart_registered_users", JSON.stringify(registeredUsers));

    return true;
  };

  const logout = () => {
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
