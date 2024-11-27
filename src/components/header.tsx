import Loggo from "../assets/icon.png";
import { Separator } from "./ui/separator";
import { LuLayoutDashboard } from "react-icons/lu";
import { NavLink } from "./nav-link";
import { ToggleTheme } from "./toggle-theme";
import { AccountMenu } from "./account-menu";

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full border-b z-10">
      <section className="flex h-16 items-center gap-6 px-6">
        <article className="ml-auto flex items-center gap-2">
          <ToggleTheme />
          <AccountMenu />
        </article>
      </section>
    </header>
  );
};
