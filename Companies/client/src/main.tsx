import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SidebarProvider } from "@/components/ui/sidebar";

import App from "./routes/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SidebarProvider>
      <App></App>
    </SidebarProvider>
  </StrictMode>
);
