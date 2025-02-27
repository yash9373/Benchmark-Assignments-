import { Navigate, useNavigate } from "react-router";
import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { Button } from "./components/ui/button";
function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <main>
        <Button
          onClick={() => {
            navigate("/home");
          }}
        >
          Get started
        </Button>
      </main>
    </div>
  );
}

export default App;
