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

const FormSchema = z.object({
  name: z.string().min(1, "O campo não pode estar vazio."),
});

type FormValues = z.infer<typeof FormSchema>;

export const CreateProfile = ({
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

  const handleNext = () => {
    if (currentStep === 2) {
      setCurrentStep(currentStep - 1);
      return;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex-row justify-between">
              <CardTitle className="text-base font-semibold text-muted-foreground bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center">
                <p className="text-slate-800 text-2xl">M</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 pt-6">
              <span className="text-1xl font-semibold tracking-tight text-white">
                <Label className="pb-3 pl-1 flex text-muted-foreground">
                  Nome da Loja 🛍️
                </Label>

                <Input
                  placeholder="Insira o novo nome do sua loja"
                  {...register("name")}
                  className="w-full bg-blue-400/10 text-blue-500"
                />
              </span>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
            <div className="flex min-h-24 flex-col">
              <div className="flex items-center justify-end gap-8 my-6 pr-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleNext}
                  className="flex items-center text-blue-500 bg-transparent"
                >
                  Voltar
                </Button>

                <Button type="submit" className="bg-green-500 text-white">
                  Salvar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </>
  );
};
