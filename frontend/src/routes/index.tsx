import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Catalogue from "../pages/Catalogue";
import BookDetail from "../pages/BookDetail";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import BookManagement from "../pages/BookManagement";
import UserManagement from "../pages/UserManagement";
import BookReader from "../pages/BookReader";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import { MainLayout } from "../layout/MainLayout";
import { AuthProvider } from "../context/AuthContext";
import { BookProvider } from "../context/BookContext";
import { PurchaseProvider } from "../context/PurchaseContext";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

export const AppRoutes = () => (
  <BrowserRouter>
    <AuthProvider>
      <BookProvider>
        <PurchaseProvider>
          <Routes>
          {/* Public routes without layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes with layout */}
          <Route
            path="/*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalogue" element={<Catalogue />} />
                  <Route path="/livres/:id" element={<BookDetail />} />

                  {/* Protected Book Reader Route */}
                  <Route
                    path="/read/:id"
                    element={
                      <ProtectedRoute requiredRole="user">
                        <BookReader />
                      </ProtectedRoute>
                    }
                  />

                  {/* Protected User Route */}
                  <Route
                    path="/utilisateur"
                    element={
                      <ProtectedRoute requiredRole="user">
                        <UserDashboard />
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

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            }
          />
          </Routes>
        </PurchaseProvider>
      </BookProvider>
    </AuthProvider>
  </BrowserRouter>
);
