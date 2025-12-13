import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Home from "../../pages/Home";

/**
 * Redirects authenticated users to their dashboard
 * Shows Home page only to unauthenticated visitors
 */
export const HomeRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-500" />
          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect authenticated users to their dashboard
  if (isAuthenticated && user) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/utilisateur" replace />;
    }
  }

  // Show Home page to unauthenticated visitors
  return <Home />;
};
