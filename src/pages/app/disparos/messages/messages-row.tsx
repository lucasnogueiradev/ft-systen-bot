// import { TableRow, TableCell } from "../../../components/ui/table";

import { TableCell, TableRow } from "../../../../components/ui/table";
import magalu from "../../../assets/magalu.png";

export interface IMessage {
  _id: string;
  chat_id: number;
  name: string;
  description: string;
  date: string;
}

interface MessagesTableRowProps {
  message: IMessage;
}
export const ProductsTableRow: React.FC<MessagesTableRowProps> = ({
  message,
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
          <span className="text-muted-foreground">{message.name}</span>
        </div>
      </TableCell>

      <TableCell className="w-[200px]">
        <div className="flex items-center gap-3">
          <div className="h-14 w-18 rounded-md overflow-hidden">
            <img
              src={message.description}
              alt="Produto"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-muted-foreground">{message.date}</span>
        </div>
      </TableCell>

      {/* <TableCell className="w-[140px]">{product.createdAt}</TableCell> */}
    </TableRow>
  );
};
