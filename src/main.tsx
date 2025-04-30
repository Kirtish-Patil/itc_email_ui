import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "./theme/themeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </CookiesProvider>
  </StrictMode>
);
