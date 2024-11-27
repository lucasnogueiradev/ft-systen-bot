import { Button } from "./ui/button";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

export interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
}

export const PaginationTable = ({
  pageIndex,
  totalCount,
  perPage,
}: PaginationProps) => {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <section className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} items
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Páginas {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-8 w-8 p-0">
            <FiChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <FiChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <FiChevronRight className="h-4 w-4" />
            <span className="sr-only">Proxima página</span>
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <FiChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
