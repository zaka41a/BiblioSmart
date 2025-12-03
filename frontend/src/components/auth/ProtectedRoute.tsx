import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

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
