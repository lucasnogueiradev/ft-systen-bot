import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

import { FormData } from "../../../types/index";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  username: z
    .string()
    .min(1, "O campo não pode estar vazio.")
    .refine((val) => !/\s/.test(val), {
      message: "O nome não pode conter espaços.",
    }),
});

type FormValues = z.infer<typeof FormSchema>;
export interface CreateFluxoProps {
  onDataChange: (data: any) => void;
  onCancelar?: () => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  currentStep: number;
  username?: string;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const CreateProfile = ({
  currentStep,
  setCurrentStep,
  setFormData,
  onDataChange,
  onCancelar,
}: CreateFluxoProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    if (setFormData) {
      setFormData((prevData: FormData) => ({
        ...prevData,
        fluxo: {
          name: data.username,
        },
      }));
    }

    onDataChange({ username: data.username });

    handleBack();

    toast(
      <span>
        Loja atualizada como:{" "}
        <span style={{ color: "green", fontWeight: "500" }}>
          {data.username}
        </span>
      </span>
    );
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(currentStep - 1);
      return;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="">
          <Card className="border-0 border-green-500 bg-blue-400/10 md:w-[400px]">
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
                  {...register("username")}
                  className="w-full bg-blue-400/10 text-blue-500"
                  disabled={isSubmitting}
                  error={errors.username?.message}
                />
              </span>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
            <div className="flex min-h-24 flex-col">
              <div className="flex items-center justify-end gap-8 my-6 pr-6">
                {onCancelar && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancelar}
                    className="text-blue-500 bg-transparent"
                  >
                    Voltar
                  </Button>
                )}

                <Button
                  type="submit"
                  className="bg-green-500 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </>
  );
};
