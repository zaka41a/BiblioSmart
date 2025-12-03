import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Catalogue from "../pages/Catalogue";
import BookDetail from "../pages/BookDetail";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import NotFound from "../pages/NotFound";
import { MainLayout } from "../layout/MainLayout";

export const AppRoutes = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/livres/:id" element={<BookDetail />} />
        <Route path="/utilisateur" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);
