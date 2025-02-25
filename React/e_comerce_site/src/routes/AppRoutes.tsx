import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import SignInPage from "../pages/SignInPage";
import ProtectedRoute from "../components/ProtectedRoute";
import { AdminDashBoard } from "../pages/adminDashBoard";
import CartPage from "../pages/cartPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductIPage from "../pages/productIndividual";
import Products from "../pages/loadProducts"; // ✅ Import the Products page

const AppRoutes = () => {
  return (
    <Router>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<SignInPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/cartPage" element={<CartPage />} />
            <Route path="/productPage/:id" element={<ProductIPage />} />
            <Route path="/products" element={<AdminDashBoard />} />{" "}
            <Route
              path="/adminDashBoard"
              element={
                <ProtectedRoute>
                  <AdminDashBoard />
                </ProtectedRoute>
              }
            />
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
