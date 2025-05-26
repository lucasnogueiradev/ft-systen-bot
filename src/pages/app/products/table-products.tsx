import { Helmet } from "react-helmet-async";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import { FilterTableWhats } from "../../../components/filters/filter-table-whats";
import { PaginationTable } from "../../../components/paginations";
import { useState } from "react";

import { useEffect } from "react";

import { ProductsTableRow } from "./products-row";
import { ProductsTableRowSkeleton } from "./products-row-skeleton";

export function TableProducts() {
  const [isLoading, setIsLoading] = useState(true);
  // Simula o carregamento por 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Após 2 segundos, termina o loading
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet title="Fluxos" />
      <section className="flex flex-col gap-4">
        <h1 className="text-1xl font-500 tracking-tight text-muted-foreground"></h1>
        <div className="space-y-2.5">
          <header className="flex flex-row items-center justify-between pl-4">
            <FilterTableWhats />
            {/* <Button>
              <Link to="/categoria">Criar modelo</Link>
            </Button> */}
          </header>
          <div className="rounded-md border bg-card flex flex-col">
            <Table className="overflow-y-auto h-screen flex flex-col">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px] text-foreground">
                    Loja
                  </TableHead>
                  <TableHead className="w-[200px] py-5 text-foreground">
                    Produto
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground">
                    Preço
                  </TableHead>
                  <TableHead className="w-[240px] text-foreground">
                    Link do afiliado
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground">
                    data de criação
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {Array.from({ length: 19 }).map((_, i) => {
                  return isLoading ? (
                    <ProductsTableRowSkeleton key={i} />
                  ) : (
                    <ProductsTableRow key={i} />
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <PaginationTable pageIndex={0} totalCount={20} perPage={10} />
        </div>
      </section>
    </>
  );
}
