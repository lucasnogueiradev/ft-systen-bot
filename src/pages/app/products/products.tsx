import { Helmet } from "react-helmet-async";

import { TableProducts } from "./table-products";

export function Products() {
  return (
    <>
      <Helmet title="Produtos" />
      <section className="flex flex-col gap-4 overflow-hidden">
        <div>
          <h1 className="text-2xl font-500 tracking-tight text-foreground font-semibold flex-row items-center gap-2 flex">
            <span>Produtos</span>
          </h1>
        </div>

        <div className="rounded-md bg-card p-6">
          <div className="rounded-md bg-card bg-black overflow-hidden">
            <TableProducts />
          </div>
        </div>
      </section>
    </>
  );
}
