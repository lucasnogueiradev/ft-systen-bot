import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";

export function AppLayout() {
  return (
    <div className="flex h-screen flex-col antialiased">
      {/* Cabeçalho fixo no topo */}
      <Header />

      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar sempre visível */}
          <AppSidebar />

          {/* Conteúdo principal rolável */}
          <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
            <SidebarTrigger className="z-11" />
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
