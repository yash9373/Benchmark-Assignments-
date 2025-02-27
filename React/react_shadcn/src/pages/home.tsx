import React from "react";
import Navbar from "@/components/navbar";
import ProductCard from "../components/products";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="">
          <ProductCard />
        </div>
      </div>
    </div>
  );
};
export default Home;
