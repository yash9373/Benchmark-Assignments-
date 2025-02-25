import React from "react";
import { useAuth } from "../context/AuthContext";
import CustomNavbar from "../components/Navbar";
import Cart from "../components/cart";
const cartPage = () => {
  const { logOut } = useAuth();
  return (
    <div>
      <CustomNavbar />
      <Cart />
    </div>
  );
};
export default cartPage;
