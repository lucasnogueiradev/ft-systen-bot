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
  name: z.string().min(1, "O campo não pode estar vazio."),
});

type FormValues = z.infer<typeof FormSchema>;

interface CreateLojasProps {
  onDataChange: (data: FormValues) => void;
  onCancelar?: () => void;
  logoUrl: string;
  setFormData?: React.Dispatch<React.SetStateAction<FormData>>;
  currentStep?: number;
  setCurrentStep?: (step: number) => void;
  name?: string;
  nameAffiliate?: string;
  loading?: boolean;
}

export const CreateLojas = ({
  onDataChange,
  onCancelar,
  logoUrl,
  setFormData,
  currentStep,
  setCurrentStep,
  name,
  nameAffiliate,
  loading,
}: CreateLojasProps) => {
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    if (setFormData) {
      setFormData((prevData: FormData) => ({
        ...prevData,
        fluxo: {
          name: data?.name,
        },
      }));
    }

    onDataChange(data);
    handleBack();

    toast(
      <span>
        Loja atualizada como:{" "}
        <span style={{ color: "green", fontWeight: "500" }}>{data.name}</span>
      </span>
    );
  };

  const handleBack = () => {
    if (currentStep && setCurrentStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="grid grid-cols-1 gap-4 mt-0">
        <Card className="border-[1px] border-green-500 bg-blue-400/10">
          <CardHeader className="flex-row justify-between">
            <CardTitle className="text-base font-semibold text-muted-foreground bg-green-400 w-[80px] h-[80px] rounded-full flex items-center justify-center">
              <img
                src={logoUrl}
                alt="Logo da loja"
                className="rounded-full p-[2px] w-full h-full object-cover"
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-3">
            {name === "Amazon" && (
              <Label className="pb-0 pl-1 flex text-muted-foreground">
                Nome da Loja Aa 🛍️
              </Label>
            )}

            <Label className="pb-0 pl-1 flex text-muted-foreground">
              Nome da Loja 🛍️
            </Label>
            <Input
              placeholder="Insira o novo nome da sua loja"
              {...register("name")}
              className="w-full bg-blue-400/10 text-blue-500"
            />
          </CardContent>
          <div className="flex items-center justify-end gap-4 mb-4 pr-6">
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

            <Button type="submit" className="bg-green-500 text-white">
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </Card>
      </div>
    </form>
  );
};
