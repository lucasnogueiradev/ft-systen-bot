import Loggo from "../assets/icon.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

// Menu items.import { FcConferenceCall } from "react-icons/fc";
import { FcContacts } from "react-icons/fc";
import { FcDoughnutChart } from "react-icons/fc";
import { FcGenealogy } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: FcDoughnutChart,
  },
  {
    title: "Assinaturas",
    url: "#",
    icon: FcCurrencyExchange,
  },
  {
    title: "Contatos",
    url: "#",
    icon: FcContacts,
  },
  {
    title: "Bots",
    url: "/bots",
    icon: FcGenealogy,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  console.log(state);
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="gap-4 p-4 mt-4">
            <img src={Loggo} className="w-9 " />
            <h2 className="font-geist text-sm text-muted-foreground text-green-600">
              Chatbot
            </h2>
          </SidebarGroupLabel>

          <SidebarGroupLabel className="mt-9 duration-200 font-geist flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium">
            Sistema
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <div
                className={`flex mb-9 text-sm  ${
                  state ? "flex flex-col" : ""
                } p-2 `}
              >
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="pb-6">
                    <SidebarMenuButton asChild>
                      <a href={item.url} className=" font-geist">
                        <span>
                          <item.icon className="text-3xl flex  size-6" />
                        </span>
                        <span className="font-medium flex w-full items-center px-2 py-1 text-muted-foreground underline-offset-2 gap-x-4">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel className="mt-9 duration-200 font-geist flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium">
            Tutorias
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
