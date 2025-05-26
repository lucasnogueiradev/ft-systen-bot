import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { GoDependabot } from "react-icons/go";
import { RiContactsLine, RiCustomerService2Line } from "react-icons/ri";
import { FaRegComments } from "react-icons/fa";
import { ContactsChart } from "./contacts-chart";
import { MessagesChart } from "./messages-chart";

export const Dashboard = () => {
  return (
    <section className="flex flex-col gap-4">
      <Helmet title="Dashboard" />
      <h1 className="text-1xl font-500 tracking-tight text-muted-foreground">
        Dashboard
      </h1>
      <div className="overflow-y-auto h-screen ">
        <div className="flex gap-3 flex-col md:flex-row md:justify-between mb-3 ">
          <Card className="md:flex md:flex-col md:w-[100%]">
            <CardHeader className="flex-row items-center justify-between space-x-8 gb-2">
              <CardTitle className="text-base font-semibold text-muted-foreground">
                Quantidade de promoções geradas
              </CardTitle>
              <GoDependabot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
              <span className="text-2xl font-semibold tracking-tight text-emerald-500">
                0
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
                0
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
                0
              </span>
              <p className="text-xs text-muted-foreground">
                Quantidade de lojas configuradas
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <ContactsChart />
          <MessagesChart />
        </div>
      </div>
    </section>
  );
};
