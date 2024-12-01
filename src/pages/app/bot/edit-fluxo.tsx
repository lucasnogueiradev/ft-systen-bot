import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { TableRow, TableCell } from "../../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { z } from "zod";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
import { TiInfoLarge } from "react-icons/ti";
import { Separator } from "../../../components/ui/separator";

const ModelSchema = z.object({
  name: z.string().min(1, "O campo não pode estar vazio."),
});

type FormValues = z.infer<typeof ModelSchema>;
export const EditFluxo = () => {
  const { register, handleSubmit, formState, control, setValue } =
    useForm<FormValues>({
      //  resolver: zodResolver(ModelSchema),
      mode: "onChange",
    });
  return (
    <>
      <Card className="grid grid-cols-1 gap-10">
        <div className="flex min-h-24 flex-col">
          <CardHeader className="mb-2">
            <CardTitle className="flex flex-col text-xl font-geist">
              Configuração do bot
              <span className="text-sm font-normal text-muted-foreground font-geist">
                Configure seu bot de atendimento e crie um fluxo
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-row items-center gap-4 font-geist">
              <div className="flex w-full flex-col">
                <Label className="pb-2 pl-1">Name</Label>

                <Input
                  placeholder="Insira um nome para o modelo"
                  // {...register("name")}
                  value="teste"
                  className="w-full"
                />
              </div>
              <div className="flex w-full flex-col">
                <Label className="pb-2 pl-1">Token</Label>

                <Input
                  placeholder="Insira um nome para o modelo"
                  // {...register("name")}
                  value="1938092eb1730945ac1"
                  disabled
                  className="w-full"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-row items-center gap-4">
              <div className="flex w-full flex-col">
                <Label className="pb-2 pl-1">Data de vencimento</Label>

                <Input
                  placeholder="Insira um nome para o modelo"
                  // {...register("name")}
                  value="01/12/2024 (Vence em 59 minutos)"
                  disabled
                  className="w-full"
                />
              </div>
              <div className="flex w-full flex-col">
                <Label className="pb-2 pl-1">Status</Label>

                <p className="text-muted-foreground items-center flex">
                  <span className="inline-block w-4 h-4 rounded-full mr-2 bg-green-500"></span>
                  Em dias
                </p>
              </div>
            </div>

            {/* <div className="flex items-center justify-end gap-4 my-6 mx-2">
              <Button
                type="button"
                variant="outline"
                className="bg-red-500 text-white"
              >
                Deletar
              </Button>
              <Button
                type="button"
                variant="outline"
                className="bg-yellow-600 text-white"
              >
                Desativar
              </Button>

              <Button type="submit" className="bg-green-600">
                Salvar
              </Button>
            </div> */}
            <Alert className="mt-6 flex flex-col w-full bg-blue-100 font-geist">
              {/* <Terminal className="h-4 w-4" /> */}
              <TiInfoLarge className="text-primary text-blue-100" />

              <AlertTitle className="text-muted-foreground">Info!</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                Copie seu token e cole na sua API, pois será necessário para os
                envios.
              </AlertDescription>
            </Alert>
          </CardContent>
        </div>
        {/* <Separator className="w-full items-center flex justify-center m-auto" /> */}
        <CardHeader className="-mb-2">
          <CardTitle className="flex flex-col text-xl font-geist">
            Configuracao da Plataforma de conexão ao whatsApp
            <span className="text-sm font-normal text-muted-foreground font-geist">
              Configure seu bot de atendimento e crie um fluxo
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full flex-col font-geist">
            <Label className="pb-2 pl-1">Plataforma</Label>
            <Controller
              control={control}
              name="name"
              render={({ field: { ref, ...field } }) => (
                <Select
                  {...field}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="w-full px-3">
                    <SelectValue placeholder="Selecione uma das opções disponiveis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whats">WhatsApp Oficial</SelectItem>
                    <SelectItem value="chat">ChatPro</SelectItem>
                    <SelectItem value="evo">EvolutionApi</SelectItem>
                    <SelectItem value="csn">CDN</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Alert className="mt-6 flex flex-col w-full bg-blue-100">
              {/* <Terminal className="h-4 w-4" /> */}
              <TiInfoLarge className="text-primary text-blue-100" />

              <AlertTitle className="text-muted-foreground">Info!</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                É necessário escolher uma das plataformas disponíveis para
                utilizar a API.
              </AlertDescription>
            </Alert>
          </div>
          <div className="flex items-center justify-end gap-4 my-6 mx-2">
            <Button
              type="button"
              variant="outline"
              className="bg-red-500 text-white"
            >
              Deletar
            </Button>
            <Button
              type="button"
              variant="outline"
              className="bg-yellow-600 text-white"
            >
              Desativar
            </Button>

            <Button type="submit" className="bg-green-600">
              Salvar
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
