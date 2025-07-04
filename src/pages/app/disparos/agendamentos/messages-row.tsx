// import { TableRow, TableCell } from "../../../components/ui/table";

import { useEffect, useState } from "react";
import { TableCell, TableRow } from "../../../../components/ui/table";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface IMessage {
  _id: string;
  content: string;
  name: string;
  createdAt: string;
}

interface MessagesTableRowProps {
  message: IMessage;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const MessagesTableRow: React.FC<MessagesTableRowProps> = ({
  message,
  isSelected,
  onSelect,
}) => {
  function convertWhatsAppToMarkdown(text: string) {
    return (
      text
        // Negrito WhatsApp (*) para Markdown (**)
        .replace(/\*(.*?)\*/g, "**$1**")
        // Itálico WhatsApp (_) para Markdown (*)
        .replace(/_(.*?)_/g, "*$1*")
    );
    // Tachado WhatsApp (~) permanece igual no Markdown
    // Caso queira adicionar algum tratamento, faça aqui
  }
  const [internalText, setInternalText] = useState(message.content);

  useEffect(() => {
    setInternalText(message.content);
  }, [message]);

  const produto =
    "Lavadora de Roupas Consul 12kg 16 Programas de Lavagem Branca CWH12";
  const precoOriginal = "R$ 2.534,70";
  const preco = "R$ 1.841,46";
  const parcelamento = "10x de R$ 195,90 sem juros";
  const seuLinkAfiliado = "https://magazinevoce.com.br/in_2319363/p/236161000/";

  const replacedText = internalText
    .replace("{{produto}}", produto)
    .replace("{{preco_original}}", precoOriginal)
    .replace("{{preco}}", preco)
    .replace("{{parcelamento}}", parcelamento)
    .replace("{{seu_link_afiliado}}", seuLinkAfiliado);

  const previewText = convertWhatsAppToMarkdown(replacedText);
  return (
    <TableRow
      className={`transition-all min-h-[56px] px-6 ${
        isSelected ? " border-green-500" : ""
      }`}
    >
      <TableCell className="text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(message._id)}
          className="w-6 h-6 appearance-none rounded-full border-2 border-primary checked:bg-green-500 checked:border-green-500 focus:ring-2 focus:ring-primary cursor-pointer relative
                      checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-[14px]"
        />
      </TableCell>
      <TableCell className="w-[120px] text-start flex justify-start items-center">
        {message.name}
      </TableCell>
      <TableCell className="w-[200px] truncate whitespace-nowrap overflow-hidden">
        <div className="line-clamp-1">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {previewText}
          </ReactMarkdown>
        </div>
      </TableCell>

      <TableCell className="w-[120px] text-center">
        <div className="flex items-center justify-center h-full">
          {new Date(message?.createdAt).toLocaleDateString("pt-BR")}
        </div>
      </TableCell>
    </TableRow>
  );
};
