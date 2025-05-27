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
  onPageChange: (page: number) => void;
}

export const PaginationTable = ({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / perPage) || 1;

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex >= totalPages - 1;

  return (
    <section className="flex items-center justify-between mt-4">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} itens
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {totalPages}
        </div>
        <div className="flex items-center gap-2">
          {/* Primeira Página */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={isFirstPage}
            onClick={() => onPageChange(0)}
          >
            <FiChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>

          {/* Página Anterior */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={isFirstPage}
            onClick={() => onPageChange(pageIndex - 1)}
          >
            <FiChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          {/* Próxima Página */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={isLastPage}
            onClick={() => onPageChange(pageIndex + 1)}
          >
            <FiChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>

          {/* Última Página */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={isLastPage}
            onClick={() => onPageChange(totalPages - 1)}
          >
            <FiChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
