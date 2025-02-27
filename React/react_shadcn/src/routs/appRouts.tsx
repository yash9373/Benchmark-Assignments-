import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "@/App";
import Home from "@/pages/home";

const queryClient = new QueryClient(); // Create a QueryClient instance

const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default AppRoutes;
