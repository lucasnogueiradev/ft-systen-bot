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
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-x-8 gb-2">
            <CardTitle className="text-base font-semibold text-muted-foreground">
              Quantidade de Bots
            </CardTitle>
            <GoDependabot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <span className="text-2xl font-semibold tracking-tight text-emerald-500">
              0
            </span>
            <p className="text-xs text-muted-foreground">
              Quantidade de bos ativo
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-x-8 gb-2">
            <CardTitle className="text-base font-semibold text-muted-foreground">
              Atendimentos Hoje
            </CardTitle>
            <RiCustomerService2Line className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <span className="text-2xl font-semibold tracking-tight text-emerald-500">
              0
            </span>
            <p className="text-xs text-muted-foreground">
              Quantidade de atendimentos hoje
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-x-8 gb-2">
            <CardTitle className="text-base font-semibold text-muted-foreground">
              Atendimentos Total
            </CardTitle>
            <RiCustomerService2Line className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <span className="text-2xl font-semibold tracking-tight text-emerald-500">
              0
            </span>
            <p className="text-xs text-muted-foreground">
              Quantidade de atendimentos total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-x-8 gb-2">
            <CardTitle className="text-base font-semibold text-muted-foreground">
              Mensagens enviadas
            </CardTitle>
            <FaRegComments className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <span className="text-2xl font-semibold tracking-tight text-emerald-500">
              0
            </span>
            <p className="text-xs text-muted-foreground">
              Quantidade de mensagens enviadas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-x-8 gb-2">
            <CardTitle className="text-base font-semibold text-muted-foreground">
              Mensagens recebidas hoje
            </CardTitle>
            <FaRegComments className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <span className="text-2xl font-semibold tracking-tight text-emerald-500">
              0
            </span>
            <p className="text-xs text-muted-foreground">
              Quantidade de mensagens recebidas hoje
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-x-8 gb-2">
            <CardTitle className="text-base font-semibold text-muted-foreground">
              Novos contatos hoje
            </CardTitle>
            <RiContactsLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <span className="text-2xl font-semibold tracking-tight text-emerald-500">
              0
            </span>
            <p className="text-xs text-muted-foreground">
              Quantidade de novos contatos hoje
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-9 gap-4">
        <ContactsChart />
        <MessagesChart />
      </div>
    </section>
  );
};
