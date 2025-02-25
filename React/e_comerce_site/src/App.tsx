import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import SignInPage from "./pages/SignInPage";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <div>
      <h1>hi</h1>
      <SignInPage />
    </div>
  );
}
export default App;
