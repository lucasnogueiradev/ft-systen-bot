import { createBrowserRouter } from "react-router-dom";
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
import { SiteCustomizer } from "./pages/app/site/site";
// import Disparos from "./pages/app/disparos/disparos";
import { Layoutsite } from "./pages/_layouts/site";
import { MySite } from "./pages/app/site";
import GroupManager from "./pages/app/disparos/disparos";

import { MessagesWhatsApp } from "./pages/app/disparos/messages/consultarFluxo";
import { ScheduleMessages } from "./pages/app/disparos/agendamentos/schedule-messages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RotaPrivada />,
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
          { path: "/site", element: <MySite /> },
          { path: "/disparos", element: <GroupManager /> },
          { path: "/disparos/mensagem", element: <MessagesWhatsApp /> },
          { path: "/disparos/meus-agendametos", element: <ScheduleMessages /> },
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
  {
    path: "/:username",
    element: <Layoutsite />,
    children: [{ path: "", element: <SiteCustomizer /> }],
  },
]);
