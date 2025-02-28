import React from "react";
import { useAuth } from "../context/AuthContext";
import CustomNavbar from "../components/Navbar";
import Cart from "../components/cart";
import { PiAddressBook } from "react-icons/pi";
import { MdPadding } from "react-icons/md";
const cartPage = () => {
  const { logOut } = useAuth();
  return (
    <div>
      <CustomNavbar />
      <div className="p-10">
        <Cart />
      </div>
    </div>
  );
};
export default cartPage;
