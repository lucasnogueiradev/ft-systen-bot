import { RouterProvider } from "react-router-dom";

import "./index.css";
import { router } from "./routes";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { ThemeProvider } from "./contexts/theme/theme.provider";
import { AuthProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="otimize-theme">
      <AuthProvider>
        <HelmetProvider>
          <Toaster richColors />
          <Helmet titleTemplate="%s | Divulgador Pro" />
          <RouterProvider router={router} />
        </HelmetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
