import { useState } from "react";

import "./App.css";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/sign-in")}> Log In</button>
    </>
  );
}

export default App;
