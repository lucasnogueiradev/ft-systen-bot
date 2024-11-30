import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";

export function AppLayout() {
  return (
    <div className="flex h-screen flex-col antialiased">
      <Header />
      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
            <SidebarTrigger />
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
