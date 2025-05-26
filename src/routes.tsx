import { createBrowserRouter } from "react-router-dom";
// import { RotaPrivada } from "./components/RotaPrivada";

import { Dashboard } from "./pages/app/dashboard/dashboard";
import { ConsultarBot } from "./pages/app/bot/consultarBot";
import { Profiles } from "./pages/app/Profiles/profiles";
import { Divulgador } from "./pages/app/divulgador/divulgador";
import { Lojas } from "./pages/app/lojas/lojas";
import { Products } from "./pages/app/products/products";

import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignIn } from "./pages/auth/signIn";
import { SignUp } from "./pages/auth/register";
import { RotaPrivada } from "./contexts/rotaprivada";

export const router = createBrowserRouter([
  {
    path: "/",
    // element: <RotaPrivada />, // ✅ Aqui entra o guard
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/bots", element: <ConsultarBot /> },
          { path: "/profiles", element: <Profiles /> },
          { path: "/bot-telegram", element: <Divulgador /> },
          { path: "/lojas", element: <Lojas /> },
          { path: "/products", element: <Products /> },
        ],
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/auth/signIn", element: <SignIn /> },
      { path: "/auth/register", element: <SignUp /> },
    ],
  },
]);
