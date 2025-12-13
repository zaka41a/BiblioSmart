import { BrowserRouter, Route, Routes } from "react-router-dom";
import Catalogue from "../pages/Catalogue";
import BookDetail from "../pages/BookDetail";
import UserDashboard from "../pages/UserDashboard";
import ProfileSettings from "../pages/ProfileSettings";
import AdminDashboard from "../pages/AdminDashboard";
import BookManagement from "../pages/BookManagement";
import UserManagement from "../pages/UserManagement";
import BookReader from "../pages/BookReader";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import LegalNotice from "../pages/LegalNotice";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import { MainLayout } from "../layout/MainLayout";
import { AuthProvider } from "../context/AuthContext";
import { BookProvider } from "../context/BookContext";
import { PurchaseProvider } from "../context/PurchaseContext";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { HomeRedirect } from "../components/auth/HomeRedirect";

export const AppRoutes = () => (
  <BrowserRouter>
    <AuthProvider>
      <BookProvider>
        <PurchaseProvider>
          <Routes>
            {/* Public routes without layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Routes with layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomeRedirect />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/livres/:id" element={<BookDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal-notice" element={<LegalNotice />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              {/* Protected Book Reader Route */}
              <Route
                path="/read/:id"
                element={
                  <ProtectedRoute requiredRole="user">
                    <BookReader />
                  </ProtectedRoute>
                }
              />

              {/* Protected User Routes */}
              <Route
                path="/utilisateur"
                element={
                  <ProtectedRoute requiredRole="user">
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile-settings"
                element={
                  <ProtectedRoute requiredRole="user">
                    <ProfileSettings />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/books"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <BookManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Settings />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </PurchaseProvider>
      </BookProvider>
    </AuthProvider>
  </BrowserRouter>
);
