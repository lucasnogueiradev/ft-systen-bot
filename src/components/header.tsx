import { ToggleTheme } from "./toggle-theme";
import { AccountMenu } from "./account-menu";
import { AppSidebar } from "./app-sidebar";

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full z-10">
      <section className="flex h-16 items-center gap-6 px-6">
        <article className="ml-auto flex items-center gap-2">
          {/* <AppSidebar /> */}
          <ToggleTheme />
          <AccountMenu />
        </article>
      </section>
    </header>
  );
};
