import { Input } from "../ui/input";
import { IoIosSearch } from "react-icons/io";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Button } from "../ui/button";

export const FilterTableWhats = () => {
  return (
    <form className="flex items-center flex-col flex-wrap w-full">
      {/* <span className="text-sm font-semibold">Filtros:</span> */}
      <div className="flex items-center justify-between w-full">
        <Input placeholder="Pesquisar" className="h-8 w-[240px]" />
        <IoIosSearch />
      </div>

      {/* <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px] px-3">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="utilidade">Utilidade</SelectItem>
        </SelectContent>
      </Select> */}

      {/* <Button
        type="button"
        variant="outline"
        size="sm"
        className="font-normal text-muted-foreground"
      >
        <IoMdClose className="mr-2 h-4 w-4" />
        Remover Filtros
      </Button> */}
    </form>
  );
};
