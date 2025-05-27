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
import { useState, useEffect } from "react";

import { IProduct, ProductsTableRow } from "./products-row";
import { ProductsTableRowSkeleton } from "./products-row-skeleton";
import { useAuth } from "../../../contexts/AuthContext";

export function TableProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0); // Página atual
  const [totalCount, setTotalCount] = useState(0); // Total de produtos no banco
  const perPage = 10;

  const { user } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(
          `https://bk-divulgadorpro-git-main-lucasnogueiradevs-projects.vercel.app/product?userId=${userId}&page=${
            pageIndex + 1
          }&limit=${perPage}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Erro ao buscar produtos");
        const data = await res.json();

        setProducts(data.products || data); // <- se sua API ainda não retorna `products`
        setTotalCount(data.total || data.length); // <- ajustar conforme sua API
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (userId) fetchProducts();
  }, [userId, pageIndex]);

  return (
    <>
      <Helmet title="Fluxos" />
      <section className="flex flex-col gap-4">
        <div className="space-y-2.5">
          <header className="flex flex-row items-center justify-between">
            <FilterTableWhats />
          </header>
          <div className="rounded-md border bg-card overflow-y-auto h-[60vh]">
            <Table className="w-full table-fixed">
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: perPage }).map((_, i) => (
                      <ProductsTableRowSkeleton key={i} />
                    ))
                  : products.map((product) => (
                      <ProductsTableRow key={product?._id} product={product} />
                    ))}
              </TableBody>
            </Table>
          </div>

          <PaginationTable
            pageIndex={pageIndex}
            totalCount={totalCount}
            perPage={perPage}
            onPageChange={(page: number) => setPageIndex(page)}
          />
        </div>
      </section>
    </>
  );
}
