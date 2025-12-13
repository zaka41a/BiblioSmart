import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
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

  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role if required
  if (requiredRole && user?.role !== requiredRole) {
    // If user tries to access admin route, redirect to their dashboard
    if (requiredRole === "admin") {
      return <Navigate to="/utilisateur" replace />;
    }
    // If admin tries to access user route, redirect to admin dashboard
    if (requiredRole === "user") {
      return <Navigate to="/admin" replace />;
    }
  }

  return <>{children}</>;
};
