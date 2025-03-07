import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Route from "./routs/routs";
import { AuthProvider } from "./context/authContext";
createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  </AuthProvider>
);
