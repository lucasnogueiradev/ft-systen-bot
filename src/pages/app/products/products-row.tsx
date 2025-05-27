import { TableRow, TableCell } from "../../../components/ui/table";

import magalu from "../../../assets/magalu.png";

export interface IProduct {
  _id: string;
  chat_id: number;
  title: string;
  priceValue: string;
  priceOriginal: string;
  finalUrl: string;
  imageUrl: string;
  domain: string;
  userId: string;
  platform: string;
}

interface ProductsTableRowProps {
  product: IProduct;
}
export const ProductsTableRow: React.FC<ProductsTableRowProps> = ({
  product,
}) => {
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
          <span className="text-muted-foreground">{product.platform}</span>
        </div>
      </TableCell>

      <TableCell className="w-[200px]">
        <div className="flex items-center gap-3">
          <div className="h-14 w-18 rounded-md overflow-hidden">
            <img
              src={product.imageUrl}
              alt="Produto"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-muted-foreground">{product.title}</span>
        </div>
      </TableCell>

      <TableCell className="w-[140px]">
        <span>{product.priceValue}</span>
        <s className="block text-xs text-muted-foreground">
          {product.priceOriginal}
        </s>
      </TableCell>

      <TableCell className="w-[240px]">
        <span className="block truncate text-green-700 bg-green-200 px-2 py-1 rounded-md font-semibold">
          {product.finalUrl}
        </span>
      </TableCell>

      {/* <TableCell className="w-[140px]">{product.createdAt}</TableCell> */}
    </TableRow>
  );
};
