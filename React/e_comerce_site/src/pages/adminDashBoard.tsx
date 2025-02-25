import React from "react";
import { useAuth } from "../context/AuthContext";
import CustomNavbar from "../components/Navbar";
import Products from "./loadProducts";
import { ProductProvider } from "../context/productContext";
export const AdminDashBoard = () => {
  const { logOut } = useAuth();
  return (
    <div>
      <ProductProvider>
        <CustomNavbar />
        <Products />
      </ProductProvider>
    </div>
  );
};
