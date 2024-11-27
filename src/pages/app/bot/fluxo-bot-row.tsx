import { TableRow, TableCell } from "../../../components/ui/table";
import { FaRegEdit } from "react-icons/fa";

export const FluxoTableRow = () => {
  return (
    <TableRow>
      <TableCell>welcome_suporte</TableCell>
      <TableCell>Suporte</TableCell>
      <TableCell>
        Potuguês BR
        <span className="flex text-xs font-normal text-muted-foreground">
          Bom dia, sou do suporte...
        </span>
      </TableCell>
      <TableCell className="font-semibold text-green-700">
        <span className="items-center rounded-md bg-green-200 px-2 py-0">
          Ativo
        </span>
      </TableCell>

      <TableCell>1</TableCell>
      <TableCell>--</TableCell>
      <TableCell>21 de nov de 2024</TableCell>
      <TableCell>
        <FaRegEdit className="w-8 h-6 text-muted-foreground cursor-pointer" />
      </TableCell>
    </TableRow>
  );
};
