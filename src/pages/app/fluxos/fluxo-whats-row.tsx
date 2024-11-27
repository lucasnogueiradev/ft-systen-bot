import { TableRow, TableCell } from "../../../components/ui/table";

export const FluxoTableRow = () => {
  return (
    <TableRow>
      <TableCell>welcome_suporte</TableCell>
      <TableCell>Utilidade</TableCell>
      <TableCell>
        Potuguês BR
        <span className="flex text-xs font-normal text-muted-foreground">
          Bom dia, sou do suporte da lega...
        </span>
      </TableCell>
      <TableCell className="font-semibold text-green-700">
        <span className="items-center rounded-md bg-green-200 px-2 py-0">
          Ativo - Qualidade Pendente
        </span>
      </TableCell>

      <TableCell>1</TableCell>
      <TableCell>0%</TableCell>
      <TableCell>--</TableCell>
      <TableCell>21 de nov de 2024</TableCell>
    </TableRow>
  );
};
