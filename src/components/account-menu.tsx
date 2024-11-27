import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { FaRegUserCircle } from "react-icons/fa";

import { TbLogout } from "react-icons/tb";

import { FiChevronDown } from "react-icons/fi";

export const AccountMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex select-none items-center gap-2"
          variant="outline"
        >
          Perfil
          <FiChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>Lucas</span>
          <span className="text-xs font-normal text-muted-foreground">
            luke_adm@hotmail.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <FaRegUserCircle className="mr-2 h-4 w-4" />
          <span>Acessar perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="dark:text-rose:400 cursor-pointer font-medium text-rose-500">
          <TbLogout className="mr-2 h-4 w-4 font-medium" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
