import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { FaGear } from "react-icons/fa6";
import { FiAlertTriangle } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

interface CardLojaProps {
  nome: string;
  logoUrl: string;
  exibirBotao?: boolean;
  onEditar?: () => void;
  label?: string;
  status?: string;
  nameAffiliate?: string;
}

export const CardLoja = ({
  nome,
  logoUrl,
  onEditar,
  label,
  status,
  nameAffiliate,
}: CardLojaProps) => {
  console.log("nome", nome);
  const mostrarBotao = nameAffiliate !== "false";

  return (
    <>
      <Card
        className={`relative md:w-[400px] max-w-[400px] w-full flex flex-col ${
          nameAffiliate === "false"
            ? "bg-muted-foreground/10 border-0"
            : "border-green-500 bg-muted-foreground/10 border-2"
        }`}
      >
        {/* Se inativo, desativa apenas o conteúdo interno */}
        <div
          className={
            status === "inativo" ? "pointer-events-none opacity-50" : ""
          }
        >
          <CardHeader className="flex-row justify-between">
            <div className="flex flex-col items-center gap-4">
              <CardTitle className="text-base font-semibold text-muted-foreground w-[80px] h-[80px] rounded-full flex items-center justify-center flex-col">
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="rounded-full p-[1px] w-full object-cover"
                />
              </CardTitle>

              <Label className="pb-3 flex text-muted-foreground text-sm font-semibold">
                {label}
              </Label>
            </div>

            {mostrarBotao && (
              <Button
                onClick={onEditar}
                className="flex items-center text-blue-500 bg-transparent font-bold text-base"
              >
                Editar
              </Button>
            )}
          </CardHeader>

          <CardContent className="pt-0">
            {nameAffiliate === "false" ? (
              <div className="flex items-center justify-between w-full h-full gap-x-6">
                <Label className="pb-3 flex text-yellow-500 text-sm font-semibold gap-2 items-center">
                  <span>Loja não configurada </span>
                  <FiAlertTriangle className="text-yellow-500" />
                </Label>
                <Button
                  className="bg-blue-600 text-white rounded-md px-4 py-1 text-sm hover:bg-blue-700"
                  onClick={onEditar}
                >
                  <FaGear /> configurar loja
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full h-full gap-x-6">
                <div className="text-lg font-bold tracking-tight">
                  {nameAffiliate}
                </div>
                <Button className="bg-green-600 text-white rounded-md px-4 py-0 text-sm pointer-events-none">
                  Loja configurada
                  <FaCheckCircle className="ml-0 text-xl text-green-200" />
                </Button>
              </div>
            )}
          </CardContent>
        </div>

        {/* 🔥 Overlay que permanece na frente e é clicável */}
        {status === "inativo" && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-md">
            <Button
              onClick={() => {
                // ação do upgrade
              }}
              className="bg-yellow-500 text-muted text-lg font-normal px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition"
            >
              🚀 Fazer upgrade de plano
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};
