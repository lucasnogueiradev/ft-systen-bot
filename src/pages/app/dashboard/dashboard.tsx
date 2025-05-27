import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { GoDependabot } from "react-icons/go";
import { RiContactsLine, RiCustomerService2Line } from "react-icons/ri";

import { ContactsChart } from "./contacts-chart";
import { MessagesChart } from "./messages-chart";
import { IProduct } from "../products/products-row";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { AppLoader } from "../../../components/ui/loading";

export const Dashboard = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const userId = user?._id;
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://bk-divulgadorpro-git-main-lucasnogueiradevs-projects.vercel.app/product?userId=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [userId]);

  return (
    <section className="flex flex-col gap-4">
      <Helmet title="Relatórios" />
      <h1 className="text-1xl font-500 tracking-tight text-muted-foreground">
        Dashboard
      </h1>
      {loading && <AppLoader fullscreen={loading} />}
      <div className="overflow-y-auto h-[85vh]">
        <div className="flex gap-3 flex-col md:flex-row md:justify-between mt-3">
          <Card className="md:flex md:flex-col md:w-[100%]">
            <CardHeader className="flex-row items-center justify-between space-x-8 gb-2">
              <CardTitle className="text-base font-semibold text-muted-foreground">
                Quantidade de promoções geradas
              </CardTitle>
              <GoDependabot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
              <span className="text-2xl font-semibold tracking-tight text-emerald-500">
                {loading ? "Carregando..." : products.length}
              </span>
              <p className="text-xs text-muted-foreground">
                Quantidade de promoções geradas no telegram
              </p>
            </CardContent>
          </Card>
          <Card className="md:flex md:flex-col md:w-[100%]">
            <CardHeader className="flex-row items-center justify-between space-x-8 gb-2">
              <CardTitle className="text-base font-semibold text-muted-foreground">
                Quatidades de lojas liberadas
              </CardTitle>
              <RiCustomerService2Line className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
              <span className="text-2xl font-semibold tracking-tight text-emerald-500">
                1
              </span>
              <p className="text-xs text-muted-foreground">
                Quatidades de lojas liberadas no seu plano
              </p>
            </CardContent>
          </Card>
          <Card className="md:flex md:flex-col md:w-[100%]">
            <CardHeader className="flex-row items-center justify-between space-x-8 gb-2">
              <CardTitle className="text-base font-semibold text-muted-foreground">
                Quantidade de lojas ativas
              </CardTitle>
              <RiContactsLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
              <span className="text-2xl font-semibold tracking-tight text-emerald-500">
                1
              </span>
              <p className="text-xs text-muted-foreground">
                Quantidade de lojas configuradas
              </p>
            </CardContent>
          </Card>
          <ContactsChart />
          <MessagesChart />
        </div>
      </div>
    </section>
  );
};
