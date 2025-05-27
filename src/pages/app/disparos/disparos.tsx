import { Helmet } from "react-helmet-async";

// import { AppLoader } from "../../../components/ui/loading";

export default function Disparos() {
  return (
    <>
      <Helmet title="Disparos de promoções" />
      <section className="flex flex-col md:gap-4 w-full">
        <div>
          <h1 className="md:text-2xl text-lg my-4 font-500 tracking-tight text-foreground font-semibold flex-row items-center gap-2 flex">
            <span>Disparos de promoções (Em desenvolvimento)</span>
          </h1>
        </div>
        {/* {loading && <AppLoader fullscreen={loading} />} */}
        <div className="rounded-md bg-primary-foreground h-[83vh] overflow-y-auto overflow-x-hidden flex items-center justify-center">
          <div className="rounded-md p-6 md:h-[80vh] h-full m-auto">
            {/* teste */}
          </div>
        </div>
      </section>
    </>
  );
}
