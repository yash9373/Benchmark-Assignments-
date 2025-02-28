import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-red shadow-md">
      <h1 className="text-xl font-bold">Logo</h1>
      <div className="space-x-4">
        <Button variant="ghost" onClick={() => navigate("/home")}>
          Home
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            navigate("/cart");
          }}
        >
          Cart
        </Button>
        <Button variant="ghost">Contact</Button>
      </div>
    </nav>
  );
};

export default Navbar;
