import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import SignInPage from "../pages/SignInPage";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import { AdminDashBoard } from "../pages/adminDashBoard";
import CartPage from "../pages/cartPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductIPage from "../pages/productIndividual";
const AppRoutes = () => {
  return (
    <Router>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cartPage" element={<CartPage />} />
            <Route path="/productPage/:id" element={<ProductIPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route
              path="/adminDashBoard"
              element={
                <ProtectedRoute>
                  <AdminDashBoard />
                </ProtectedRoute>
              }
            />
            Protected Route
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashBoard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
};

export default AppRoutes;
