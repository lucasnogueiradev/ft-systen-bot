import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";

interface CardProfileProps {
  username: string;
  onEditar?: () => void;
}

export const CardProfile = ({ username, onEditar }: CardProfileProps) => {
  return (
    <div className="">
      <Card className="border-0 border-green-500 bg-blue-400/10 md:w-[400px]">
        <CardHeader className="flex-row justify-between">
          <CardTitle className="text-base font-semibold text-muted-foreground bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center">
            <p className="text-slate-800 text-2xl">M</p>
          </CardTitle>

          <p className="text-blue-500 cursor-pointer">
            <Button
              onClick={onEditar}
              className="flex items-center text-blue-500 bg-transparent font-bold text-1xl"
            >
              Editar
            </Button>
          </p>
        </CardHeader>
        <CardContent className="space-y-1 pt-6">
          <span className="text-1xl font-semibold tracking-tight text-">
            <Label className="pb-3 flex text-muted-foreground">
              Nome do perfil
            </Label>
            {username || ""}
          </span>
          <p className="text-xs text-muted-foreground">
            Nome que será usado no seu site
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
