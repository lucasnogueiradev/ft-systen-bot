import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";

// import React from "react";

export function AppLayout() {
  // const [open, setOpen] = React.useState(true);
  return (
    <div className="flex min-h-screen flex-col antialiased bg-muted">
      <Header />
      {/* Provedor de contexto para o Sidebar */}
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="-top-10 flex -my-10 z-50" />
        <main className="flex flex-1 flex-col max-h-screen gap-4 p-8 pt-6">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
