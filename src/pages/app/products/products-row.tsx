import { TableRow, TableCell } from "../../../components/ui/table";

import magalu from "../../../assets/magalu.png";
export const ProductsTableRow = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex h-10 w-10  items-center justify-center rounded-full text-muted-foreground">
          <img
            src={magalu}
            alt="Produto"
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        <span className="text-muted-foreground">Magalu</span>
      </TableCell>
      <TableCell className="flex items-center gap-3">
        <div className="flex h-14 w-18 items-center justify-center rounded-md bg-green-500 text-white">
          <img
            src="https://a-static.mlcdn.com.br/800x560/fritadeira-eletrica-sem-oleo-air-fryer-mondial-pratic-af-35-bf-preta-35l-com-timer/magazineluiza/236479800/132767d0349df4a2b9f676d26f62505c.jpg"
            alt="Produto"
            className="h-full w-full object-cover rounded-md"
          />
        </div>

        <span className="flex items-center gap-2">Geladeira Eletrolux</span>
      </TableCell>
      <TableCell>
        R$ 2.500,00
        <s className="flex text-xs font-normal text-muted-foreground">
          R$ 3.000,00
        </s>
      </TableCell>
      <TableCell className="font-semibold text-green-700 w-max-[200px]">
        <span className="items-center rounded-md bg-green-200 px-2 py-0">
          https://www.magazinevoce.com.br/zeroonze/p/kh4c2c96ed/
        </span>
      </TableCell>

      <TableCell>21 de nov de 2024</TableCell>
    </TableRow>
  );
};
