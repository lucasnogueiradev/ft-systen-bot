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
import { useNavigate } from "react-router-dom";

import { TbLogout } from "react-icons/tb";

import { FiChevronDown } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

export const AccountMenu = () => {
  const { user } = useAuth();
  console.log("user", user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/auth/signIn");
  };

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
          <span>Plano: {user?.plano}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {user?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <FaRegUserCircle className="mr-2 h-4 w-4" />
          <span>Acessar perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="dark:text-rose:400 cursor-pointer font-medium text-rose-500"
          onClick={handleLogout}
        >
          <TbLogout className="mr-2 h-4 w-4 font-medium" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
