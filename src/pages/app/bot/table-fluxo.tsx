import { Helmet } from "react-helmet-async";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { FluxoTableRow } from "./fluxo-bot-row";
import { FilterTableWhats } from "../../../components/filters/filter-table-whats";
import { PaginationTable } from "../../../components/paginations";
import { Link } from "react-router-dom";
import { BreadcrumbBot } from "../../../components/breadcrumb/breadcrumb";
import { useState } from "react";
import { FluxoTableRowSkeleton } from "./fluxo-bot-row-skeleton";
import { useEffect } from "react";

export function TableBot() {
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
          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] py-5 text-foreground">
                    Nome do fluxo
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground">
                    Categoria
                  </TableHead>
                  <TableHead className="w-[240px] text-foreground">
                    Inicio fluxo
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground">
                    Status
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground">
                    Mensagens enviadas
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground">
                    Plataforma
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground">
                    Data de Vencimento
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground ">
                    Editar
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 7 }).map((_, i) => {
                  return isLoading ? (
                    <FluxoTableRowSkeleton key={i} />
                  ) : (
                    <FluxoTableRow key={i} />
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
