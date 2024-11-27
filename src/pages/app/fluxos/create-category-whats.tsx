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
import { IoMdAdd } from "react-icons/io";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { MdCampaign } from "react-icons/md";

import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { FaBell } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";

import { BsFillBookmarksFill } from "react-icons/bs";

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

export function CreateCategory() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(
      `Categoria selecionada ${(<code className="text-white">{JSON.stringify(data, null, 2)}</code>)}`,
    );
  }

  return (
    <>
      <Helmet title="Fluxos" />
      <section className="flex w-3/4 flex-col gap-4">
        <h1 className="text-1xl font-500 tracking-tight text-muted-foreground">
          Fluxos / categoria
        </h1>
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 gap-10">
            <Card className="flex min-h-24 flex-col">
              <CardHeader>
                <CardTitle className="flex flex-col text-sm">
                  Configure seu modelo
                  <span className="text-xs font-normal text-muted-foreground">
                    Escolha a categoria que melhor descreve seu modelo de
                    mensagem. Em seguida, selecione o tipo de mensagem que
                    deseja enviar.{" "}
                    <a href="">Saiba mais sobre as categorias.</a>
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-row items-center gap-2">
                  <div className="flex w-full flex-col">
                    <Tabs defaultValue="account" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger
                          value="marketing"
                          className="flex items-center"
                        >
                          <MdCampaign className="mr-1 h-5 w-6" />
                          Marketing
                        </TabsTrigger>
                        <TabsTrigger
                          value="utilidade"
                          className="flex items-center"
                        >
                          <FaBell className="mr-1 h-3 w-4" />
                          Utilidade
                        </TabsTrigger>
                        <TabsTrigger
                          value="autenticacao"
                          className="flex items-center"
                        >
                          <FaKey className="mr-1 h-3 w-4" />
                          Autenticação
                        </TabsTrigger>
                        <TabsTrigger
                          value="services"
                          className="flex items-center"
                        >
                          <BsFillBookmarksFill className="mr-1 h-3 w-4" />
                          Serviço
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="marketing">
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-2/3 space-y-6"
                          >
                            <FormField
                              control={form.control}
                              name="type"
                              render={({ field }) => (
                                <FormItem className="space-y-3 p-8">
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex flex-col space-y-1"
                                    >
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="all" />
                                        </FormControl>
                                        <FormLabel className="flex cursor-pointer flex-col gap-1 pb-3 font-normal">
                                          Personalizada
                                          <span className="text-muted-foreground">
                                            Envie mensagem sobre um conta ou
                                            pedido existente
                                          </span>
                                        </FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="mentions" />
                                        </FormControl>
                                        <FormLabel className="flex cursor-pointer flex-col gap-1 pb-3 font-normal">
                                          Flows
                                          <span className="text-muted-foreground">
                                            Envie um formulário oara coletar
                                            feedback, enviar lembretes ou
                                            gerenciar pedidos.
                                          </span>
                                        </FormLabel>
                                      </FormItem>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit">Avançar</Button>
                          </form>
                        </Form>
                      </TabsContent>
                      <TabsContent value="utilidade">
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-2/3 space-y-6"
                          >
                            <FormField
                              control={form.control}
                              name="type"
                              render={({ field }) => (
                                <FormItem className="space-y-3 p-8">
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex flex-col space-y-1"
                                    >
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="all" />
                                        </FormControl>
                                        <FormLabel className="flex cursor-pointer flex-col gap-1 pb-3 font-normal">
                                          Personalizada
                                          <span className="text-muted-foreground">
                                            Envie mensagem sobre um conta ou
                                            pedido existente
                                          </span>
                                        </FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="mentions" />
                                        </FormControl>
                                        <FormLabel className="flex cursor-pointer flex-col gap-1 pb-3 font-normal">
                                          Flows
                                          <span className="text-muted-foreground">
                                            Envie um formulário oara coletar
                                            feedback, enviar lembretes ou
                                            gerenciar pedidos.
                                          </span>
                                        </FormLabel>
                                      </FormItem>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit">Avançar</Button>
                          </form>
                        </Form>
                      </TabsContent>
                      <TabsContent value="autenticacao">
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-2/3 space-y-6"
                          >
                            <FormField
                              control={form.control}
                              name="type"
                              render={({ field }) => (
                                <FormItem className="space-y-3 p-8">
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex flex-col space-y-1"
                                    >
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="all" />
                                        </FormControl>
                                        <FormLabel className="flex cursor-pointer flex-col gap-1 pb-3 font-normal">
                                          Personalizada
                                          <span className="text-muted-foreground">
                                            Envie mensagem sobre um conta ou
                                            pedido existente
                                          </span>
                                        </FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="mentions" />
                                        </FormControl>
                                        <FormLabel className="flex cursor-pointer flex-col gap-1 pb-3 font-normal">
                                          Flows
                                          <span className="text-muted-foreground">
                                            Envie um formulário oara coletar
                                            feedback, enviar lembretes ou
                                            gerenciar pedidos.
                                          </span>
                                        </FormLabel>
                                      </FormItem>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit">Avançar</Button>
                          </form>
                        </Form>
                      </TabsContent>
                      <TabsContent value="services">
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-2/3 space-y-6"
                          >
                            <FormField
                              control={form.control}
                              name="type"
                              render={({ field }) => (
                                <FormItem className="space-y-3 p-8">
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex flex-col space-y-1"
                                    >
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="all" />
                                        </FormControl>
                                        <FormLabel className="flex cursor-pointer flex-col gap-1 pb-3 font-normal">
                                          Personalizada
                                          <span className="text-muted-foreground">
                                            Envie mensagem sobre um conta ou
                                            pedido existente
                                          </span>
                                        </FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="mentions" />
                                        </FormControl>
                                        <FormLabel className="flex cursor-pointer flex-col gap-1 pb-3 font-normal">
                                          Flows
                                          <span className="text-muted-foreground">
                                            Envie um formulário oara coletar
                                            feedback, enviar lembretes ou
                                            gerenciar pedidos.
                                          </span>
                                        </FormLabel>
                                      </FormItem>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit">Avançar</Button>
                          </form>
                        </Form>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
