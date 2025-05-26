import { TableRow, TableCell } from "../../../components/ui/table";
import { Skeleton } from "../../../components/ui/skeleton";

export const ProductsTableRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 text-gray-400" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell className="font-semibold text-green-700">
        <Skeleton className="h-4" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
    </TableRow>
  );
};
