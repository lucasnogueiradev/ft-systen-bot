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

export function CreateFluxo() {
  return (
    <>
      <Helmet title="Fluxos" />
      <section className="flex w-3/4 flex-col gap-4">
        <h1 className="text-1xl font-500 tracking-tight text-muted-foreground">
          Fluxos / categoria / modelo
        </h1>
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 gap-10">
            <Card className="flex min-h-24 flex-col">
              <CardHeader>
                <CardTitle className="flex flex-col text-sm">
                  Nome e idioma do modelo
                  <span className="text-xs font-normal text-muted-foreground">
                    Dê um nome ao seu modelo
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-row items-center gap-2">
                  <div className="flex w-full flex-col">
                    <Label className="pb-2 pl-1">
                      Dê um nome ao seu modelo
                    </Label>
                    <Input
                      placeholder="Insira um nome para o modelo"
                      className="w-full"
                    />
                  </div>
                  <div className="pt-6">
                    <Select defaultValue="english">
                      <SelectTrigger className="w-[180px] px-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="portugues">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex min-h-24 flex-col">
              <CardHeader>
                <CardTitle className="flex flex-col text-sm">
                  Conteúdo
                  <span className="text-xs font-normal text-muted-foreground">
                    Preencha as seções de cabeçalho, corpo e rodapé do seu
                    modelo.
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex w-full flex-col">
                    <Label className="pb-2 pl-1">Cabeçalho</Label>
                    <Select defaultValue="english">
                      <SelectTrigger className="w-full px-3">
                        <SelectValue placeholder="Selecione seu idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="portugues">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex w-full flex-col gap-y-4 pt-6">
                    <Textarea
                      placeholder="Inserir texto"
                      className="h-32 w-full"
                    />
                    <div>
                      <Label className="pb-2 pl-1">Rodapé - Opicional</Label>
                      <Input placeholder="Inserir texto" className="w-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex min-h-24 flex-col">
              <CardHeader>
                <CardTitle className="flex flex-col text-sm">
                  Botões - Opcional
                  <span className="text-xs font-normal text-muted-foreground">
                    Crie botões que permitam que os clientes respodam à sua
                    mensagem ou realizem uma ação. É possível adicionar até 10
                    botões. Se você adicionar mais de 3 botõs, eles aparecerão
                    em uma lista.
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-row items-center gap-2">
                  <div className="flex w-full flex-row gap-2">
                    <Select>
                      <SelectTrigger className="w-[180px] px-3">
                        <IoMdAdd className="mr-1" />
                        <SelectValue placeholder="Adicionar botão" />
                      </SelectTrigger>
                      <SelectContent>
                        <div>
                          <div className="px-3 py-1 text-sm font-bold text-foreground">
                            Botões de resposta rápida
                          </div>
                          <SelectItem
                            value="cancelar"
                            className="cursor-pointer"
                          >
                            Cancelar marketing
                          </SelectItem>
                          <SelectItem
                            value="personalizado"
                            className="cursor-pointer"
                          >
                            Personalizado
                          </SelectItem>
                        </div>

                        <div>
                          <div className="px-3 py-1 text-sm font-bold text-foreground">
                            Botões de chamada para ação
                          </div>
                          <SelectItem
                            value="acessar"
                            className="cursor-pointer"
                          >
                            Acessar o site
                          </SelectItem>
                          <SelectItem value="ligar" className="cursor-pointer">
                            Ligar
                          </SelectItem>
                          <SelectItem
                            value="concluir"
                            className="cursor-pointer"
                          >
                            Concluir flow
                          </SelectItem>
                          <SelectItem value="copiar" className="cursor-pointer">
                            Copiar código da oferta
                          </SelectItem>
                        </div>
                      </SelectContent>
                    </Select>
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
