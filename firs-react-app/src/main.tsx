import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FormData from "./FormData";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormData />
  </StrictMode>
);
