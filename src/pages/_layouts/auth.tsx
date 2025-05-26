import { Outlet } from "react-router-dom";
import Loggo from "../../assets/icon.png";
import capa from "../../assets/principal-image.png";

export function AuthLayout() {
  return (
    <section className="h-screen w-full flex">
      <aside
        className="md:flex hidden h-screen w-[65%] flex-col justify-between border-r border-foreground/5 bg-green-800 p-10 text-muted-foreground align-center"
        // style={{
        //   backgroundImage: `url(${capa}) `,
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        //   height: "100vh",
        // }}
      >
        <article className="flex items-center gap-3 text-lg font-medium text-foreground">
          <img src={Loggo} className="w-30 h-10" />
          <h2 className="font-geist text-lg text-foreground text-green-600">
            Divulgador
            <span className="text-foreground font-bold">Pro</span>
          </h2>
        </article>

        <div className="flex flex-col gap-4"></div>
        <footer>
          <img src={capa} className=" h-full object-cover w-[350px]" />
          Painel do parceiro &copy; DivulgadorPro - {new Date().getFullYear()}
        </footer>
      </aside>

      <div className="flex flex-col items-center justify-center bg-muted-foreground/5 md:w-[35%] w-full gap-y-16 h-full  bg-zinc-50">
        <Outlet />
      </div>
    </section>
  );
}
