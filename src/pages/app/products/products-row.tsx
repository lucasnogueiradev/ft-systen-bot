import { TableRow, TableCell } from "../../../components/ui/table";

import magalu from "../../../assets/magalu.png";
export const ProductsTableRow = () => {
  return (
    <TableRow>
      <TableCell className="w-[140px]">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 flex items-center justify-center rounded-full">
            <img
              src={magalu}
              alt="Produto"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <span className="text-muted-foreground">Magalu</span>
        </div>
      </TableCell>

      <TableCell className="w-[200px]">
        <div className="flex items-center gap-3">
          <div className="h-14 w-18 rounded-md overflow-hidden">
            <img
              src="https://a-static.mlcdn.com.br/800x560/fritadeira-eletrica-sem-oleo-air-fryer-mondial-pratic-af-35-bf-preta-35l-com-timer/magazineluiza/236479800/132767d0349df4a2b9f676d26f62505c.jpg"
              alt="Produto"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-muted-foreground">Geladeira Eletrolux</span>
        </div>
      </TableCell>

      <TableCell className="w-[140px]">
        <span>R$ 2.500,00</span>
        <s className="block text-xs text-muted-foreground">R$ 3.000,00</s>
      </TableCell>

      <TableCell className="w-[240px]">
        <span className="block truncate text-green-700 bg-green-200 px-2 py-1 rounded-md font-semibold">
          https://www.magazinevoce.com.br/zeroonze/p/kh4c2c96ed/
        </span>
      </TableCell>

      <TableCell className="w-[140px]">21 de nov de 2024</TableCell>
    </TableRow>
  );
};
