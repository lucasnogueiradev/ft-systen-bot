import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

import { CreateFluxoProps, FormData } from "../../../types/index";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TiInfoLarge } from "react-icons/ti";

import { BreadcrumbBot } from "../../../components/breadcrumb/breadcrumb";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";

const FormSchema = z.object({
  name: z.string().min(1, "O campo não pode estar vazio."),
});

type FormValues = z.infer<typeof FormSchema>;

export const CreateFluxo = ({
  currentStep,
  setCurrentStep,
  setFormData,
}: CreateFluxoProps) => {
  const handleStepData = (data: FormValues) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      fluxo: {
        name: data?.name,
      },
    }));

    toast(
      <span>
        Fluxo criado como:{" "}
        <span style={{ color: "green", fontWeight: "500" }}>{data.name}</span>
      </span>
    );
  };

  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    handleStepData(data);
    console.log("data", data);
    setCurrentStep(currentStep + 1);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="grid grid-cols-1 gap-10">
          <div className="flex min-h-24 flex-col">
            <CardHeader>
              <CardTitle className="flex flex-col text-sm">
                Nome
                <span className="text-sm font-normal text-muted-foreground">
                  Dê um nome para seu fluxo
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-row items-center gap-2">
                <div className="flex w-full flex-col">
                  <Label className="pb-2 pl-1"></Label>

                  <Input
                    placeholder="Insira um nome para seu fluxo"
                    {...register("name")}
                    className="w-full"
                  />
                </div>
              </div>
              <Alert className="mt-6 flex flex-col w-full bg-blue-100">
                {/* <Terminal className="h-4 w-4" /> */}
                <TiInfoLarge className="text-primary text-blue-100" />

                <AlertTitle className="text-muted-foreground">Info!</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  Ao criar um bot de atendimento será necessario, configurar na
                  proxima etapa.
                </AlertDescription>
              </Alert>
              <div className="flex items-center justify-end gap-4 my-6 mx-2">
                <Button type="button" variant="outline">
                  Voltar
                </Button>

                <Button type="submit" className="bg-green-600">
                  Avançar
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </form>
    </>
  );
};
