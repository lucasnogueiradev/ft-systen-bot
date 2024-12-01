import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
// import React from "react";

export function AppLayout() {
  const [defaultOpen, setDefaultOpen] = useState<boolean>(false);

  useEffect(() => {
    // Acessando o valor do cookie
    const sidebarState = Cookies.get("sidebar:state");
    const defaultOpenValue = sidebarState === "true";
    setDefaultOpen(defaultOpenValue);
  }, []);
  console.log("true", defaultOpen);

  // const [open, setOpen] = React.useState(true);
  return (
    <div className="flex min-h-screen flex-col antialiased bg-muted">
      <Header />
      {/* Provedor de contexto para o Sidebar */}
      <SidebarProvider defaultOpen className="group/collapsible">
        <AppSidebar />

        <main className="flex flex-1 flex-col max-h-screen gap-4 p-8 pt-6">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
