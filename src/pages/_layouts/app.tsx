import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import {
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { BreadcrumbBot } from "../../components/breadcrumb/breadcrumb";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased bg-muted">
      <Header />
      {/* Provedor de contexto para o Sidebar */}
      <SidebarProvider className="">
        {/* Cabeçalho */}

        {/* Layout Principal */}

        {/* Sidebar */}
        <AppSidebar />

        {/* Conteúdo Principal */}
        <main className="flex flex-1 flex-col max-h-screen gap-4 p-8 pt-6">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
