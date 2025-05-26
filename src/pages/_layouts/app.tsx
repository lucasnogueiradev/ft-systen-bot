import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";

// import React from "react";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased bg-muted">
      <Header />

      <SidebarProvider>
        {/* Sidebar com largura fixa no desktop, escondido no mobile */}
        <AppSidebar />

        {/* Botão para abrir sidebar só aparece no mobile */}
        <SidebarTrigger className="fixed top-4 left-4 z-50 md:hidden" />

        {/* Main ocupa toda tela no mobile, e fica com margem esquerda no desktop para dar espaço ao sidebar */}
        <main className="flex flex-col h-full gap-4 p-4 md:pl-72 w-full overflow-hidden">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
