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

import { HiUsers } from "react-icons/hi2";

import { IoStorefront } from "react-icons/io5";

import { MdSpaceDashboard } from "react-icons/md";
import { RiRobot3Fill } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa6";

const items = [
  {
    title: "Relatórios",
    url: "/",
    icon: MdSpaceDashboard,
  },
  {
    title: "Meus Perfis",
    url: "/profiles",
    icon: HiUsers,
  },
  {
    title: "Divulgador",
    url: "/bot-telegram",
    icon: RiRobot3Fill,
  },
  {
    title: "Configurar lojas",
    url: "/lojas",
    icon: IoStorefront,
  },
  {
    title: "Produtos",
    url: "/products",
    icon: FaCartPlus,
  },
  // {
  //   title: "Bots",
  //   url: "/bots",
  //   icon: FcGenealogy,
  // },
];

export function AppSidebar() {
  const { state } = useSidebar();
  console.log(state);
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="gap-2 p-4 mt-4">
            <img src={Loggo} className="w-6" />
            <h2 className="font-geist text-base text-foreground text-green-600">
              Divulgador
              <span className="text-foreground font-bold">Pro</span>
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
                          <item.icon className="text-3xl flex  size-5 text-green-600" />
                        </span>
                        <span className="font-medium flex w-full items-center px-2 py-1 text-foreground underline-offset-2 gap-x-4">
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
