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

import { IProduct, ProductsTableRow } from "./products-row";
import { ProductsTableRowSkeleton } from "./products-row-skeleton";
import { useAuth } from "../../../contexts/AuthContext";

export function TableProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { user } = useAuth();
  const userId = user?._id;

  const [isLoading, setIsLoading] = useState(true);
  // Simula o carregamento por 2 segundos
  useEffect(() => {
    setIsLoading(true);
    async function fetchProducts() {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(
          `https://bk-divulgadorpro-git-main-lucasnogueiradevs-projects.vercel.app/product?userId=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    fetchProducts();
    setIsLoading(false);
  }, [userId]);

  return (
    <>
      <Helmet title="Fluxos" />
      <section className="flex flex-col gap-4">
        <h1 className="text-1xl font-500 tracking-tight text-muted-foreground"></h1>
        <div className="space-y-2.5">
          <header className="flex flex-row items-center justify-between">
            <FilterTableWhats />
            {/* <Button>
              <Link to="/categoria">Criar modelo</Link>
            </Button> */}
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
                  {/* <TableHead className="w-[140px] text-foreground">
                    Data de criação
                  </TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <ProductsTableRowSkeleton key={i} />
                    ))
                  : products.map((product) => (
                      <ProductsTableRow
                        key={product.chat_id}
                        product={product}
                      />
                    ))}
              </TableBody>
            </Table>
          </div>

          <PaginationTable pageIndex={0} totalCount={20} perPage={10} />
        </div>
      </section>
    </>
  );
}
