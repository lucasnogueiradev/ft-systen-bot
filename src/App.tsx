import { RouterProvider } from "react-router-dom";

import "./index.css";
import { router } from "./routes";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { ThemeProvider } from "./contexts/theme/theme.provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="otimize-theme">
      <HelmetProvider>
        <Toaster richColors />
        <Helmet titleTemplate="%s | Otimize Sistema" />
        <RouterProvider router={router} />;
      </HelmetProvider>
    </ThemeProvider>
  );
}
