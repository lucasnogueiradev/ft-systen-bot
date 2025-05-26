import { Helmet } from "react-helmet-async";

import { BreadcrumbBot } from "../../../components/breadcrumb/breadcrumb";
import { useState } from "react";

import { FormData } from "../../../types/index";
import { TableProducts } from "./table-products";

export function Products() {
  const [formData, setFormData] = useState<FormData>({
    fluxo: {
      name: "",
    },
  });

  console.log("formData", formData);

  return (
    <>
      <Helmet title="Produtos" />
      <section className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-500 tracking-tight text-foreground font-semibold flex-row items-center gap-2 flex">
            <span>Produtos</span>
          </h1>
        </div>

        <div className="rounded-md bg-card p-6">
          <div className="rounded-md bg-card bg-black">
            <TableProducts />
          </div>
        </div>
      </section>
    </>
  );
}
