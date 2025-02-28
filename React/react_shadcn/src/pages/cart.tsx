import Navbar from "@/components/navbar";
import ShoppingCartComponent from "@/components/shopingCart";
const cart = () => {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-5">
        <ShoppingCartComponent />
      </div>
    </div>
  );
};
export default cart;
