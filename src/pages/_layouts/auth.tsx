import { Outlet } from "react-router-dom";
import Loggo from "../../assets/icon.png";

export function AuthLayout() {
  return (
    <section className="min-h grid min-h-screen grid-cols-2">
      <aside className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <article className="flex items-center gap-3 text-lg font-medium text-foreground">
          <img src={Loggo} className="w-30 h-10" />
        </article>
        <footer>
          Painel do parceiro &copy; Otimize - {new Date().getFullYear()}
        </footer>
      </aside>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </section>
  );
}
