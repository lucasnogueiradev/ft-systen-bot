import { Helmet } from "react-helmet-async";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
// import { AppLoader } from "../../../../components/ui/loading";

// import { PaginationTable } from "../../../../components/paginations";
// import { useState } from "react";

// import { IProduct, ProductsTableRow } from "./products-row";
// import { ProductsTableRowSkeleton } from "./products-row-skeleton";
// import { useAuth } from "../../../../contexts/AuthContext";
// import { IMessage } from "./messages-row";

export function TableMenssagens() {
  // const { setProductsContext } = useAuth();
  // const [messages, setMessages] = useState<IMessage[]>([]);

  // const [pageIndex, setPageIndex] = useState(0);
  // const [totalCount, setTotalCount] = useState(0);
  // const [loading, setLoading] = useState(false);

  // const perPage = 10;

  // const { user } = useAuth();
  // const userId = user?._id;

  // useEffect(() => {
  //   async function fetchProducts() {
  //     setLoading(true);
  //     const token = localStorage.getItem("token");
  //     try {
  //       const res = await fetch(
  //         `https://bk-divulgadorpro-git-main-lucasnogueiradevs-projects.vercel.app/product?userId=${userId}&page=${
  //           pageIndex + 1
  //         }&limit=${perPage}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if (!res.ok) throw new Error("Erro ao buscar produtos");
  //       const data = await res.json();
  //       const produtos = data.products || data;
  //       if (Array.isArray(produtos)) {
  //         setMessages(produtos);
  //         setProductsContext(produtos);
  //         console.log("produtos da req", produtos);
  //         setTotalCount(data.total || produtos.length);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (userId) fetchProducts();
  // }, [userId, pageIndex]);

  return (
    <>
      <Helmet title="Fluxos" />
      <section className="flex flex-col gap-4">
        {/* {loading && <AppLoader fullscreen={loading} />} */}
        <div className="space-y-2.5">
          {/* <header className="flex flex-row items-center justify-between">
            <FilterTableWhats />
          </header> */}
          <div className="rounded-md border bg-card overflow-y-auto h-[60vh]">
            <Table className="w-full table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px] text-foreground">
                    Name
                  </TableHead>
                  <TableHead className="w-[200px] py-5 text-foreground">
                    Mensagem
                  </TableHead>
                  <TableHead className="w-[140px] text-foreground">
                    Data
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {loading
                  ? Array.from({ length: perPage }).map((_, i) => (
                      <ProductsTableRowSkeleton key={i} />
                    ))
                  : products.map((product) => (
                      <ProductsTableRow key={product?._id} product={product} />
                    ))} */}
              </TableBody>
            </Table>
          </div>
          {/* <PaginationTable
            pageIndex={pageIndex}
            totalCount={totalCount}
            perPage={perPage}
            onPageChange={(page: number) => setPageIndex(page)}
          /> */}
        </div>
      </section>
    </>
  );
}
