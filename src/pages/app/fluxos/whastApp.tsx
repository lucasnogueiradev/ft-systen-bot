import { Helmet } from "react-helmet-async";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { FluxoTableRow } from "./fluxo-whats-row";
import { FilterTableWhats } from "../../../components/filters/filter-table-whats";
import { PaginationTable } from "../../../components/paginations";

export function FluxosWhatsApp() {
  return (
    <>
      <Helmet title="Fluxos" />
      <section className="flex flex-col gap-4">
        <h1 className="text-1xl font-500 tracking-tight text-muted-foreground">
          Fluxos
        </h1>
        <div className="space-y-2.5">
          <header className="flex flex-row items-center justify-between">
            <FilterTableWhats />
            <Button>Criar modelo</Button>
          </header>

          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] py-5 text-foreground">
                    Nome do modelo
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground">
                    Categoria
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground">
                    Idioma
                  </TableHead>
                  <TableHead className="w-[240px] text-foreground">
                    Status
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground">
                    Mensagens entregues
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground">
                    Taxa de leitura de mensagens
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground">
                    Principal motivo do bloqueio
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground">
                    Last edited
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => {
                  return <FluxoTableRow key={i} />;
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
