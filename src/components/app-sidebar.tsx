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
} from "./ui/sidebar";

import { TbLayoutDashboardFilled } from "react-icons/tb";
import { RiRobot2Fill } from "react-icons/ri";
import { HiMiniUsers } from "react-icons/hi2";
import { FaMoneyBill } from "react-icons/fa";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: TbLayoutDashboardFilled,
  },
  {
    title: "Bots",
    url: "/bots",
    icon: RiRobot2Fill,
  },
  {
    title: "Contatos",
    url: "#",
    icon: HiMiniUsers,
  },
  {
    title: "Assinaturas",
    url: "#",
    icon: FaMoneyBill,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="z-10 flex">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="p-6 flex gap-2">
            <img src={Loggo} className="w-8 cursor-pointer" />
            <h2>Otimize chatbot</h2>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="p-6 flex gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
