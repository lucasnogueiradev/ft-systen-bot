import Loggo from "../assets/logo-divulgadorpro.png";
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
import { BsWindowStack } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { RiRobot3Fill } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";

export function AppSidebar() {
  const { state } = useSidebar();

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
    {
      title: "Meu site",
      url: "/site",
      icon: BsWindowStack,
    },
    {
      title: "Disparos",
      icon: FaWhatsapp,
      children: [
        { title: "Adicionar grupo", url: "/disparos" },
        { title: "Criar mensagem", url: "/disparos/mensagem" },
        { title: "Fazer disparo", url: "/criar-mensgem" },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="gap-2 p-4 mt-4">
            <article className="flex md:hidden items-center my-4">
              <img src={Loggo} className="w-[170px] pr-4" />
            </article>
          </SidebarGroupLabel>

          <SidebarGroupLabel className="mt-9 font-geist flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium">
            Sistema
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <div
                className={`flex mb-9 text-sm ${state ? "flex-col" : ""} p-2`}
              >
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="pb-2">
                    {item.children ? (
                      <div className="w-full">
                        <SidebarMenuButton className="flex items-center gap-2 font-geist text-green-600">
                          <item.icon className="text-2xl" />
                          <span className="text-foreground font-medium">
                            {item.title}
                          </span>
                        </SidebarMenuButton>
                        <div className="ml-6 mt-2 flex flex-col gap-2">
                          {item.children.map((child) => (
                            <SidebarMenuButton asChild key={child.title}>
                              <a
                                href={child.url}
                                className="text-sm text-foreground hover:text-green-600"
                              >
                                {child.title}
                              </a>
                            </SidebarMenuButton>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className="font-geist flex items-center gap-3"
                        >
                          <item.icon className="text-2xl text-green-600" />
                          <span className="text-foreground font-medium">
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
          {/* <CollapsibleContent> */}
          <SidebarGroupContent />
          {/* </CollapsibleContent> */}
          <SidebarGroupLabel className="mt-9 font-geist flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium">
            Tutorias
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
