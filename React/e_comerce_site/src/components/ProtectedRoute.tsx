import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { state } = useAuth();
  return state ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
