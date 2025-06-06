import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IMenssage {
  text: string;
}

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

const WhatsAppPreview = ({ text }: IMenssage) => {
  const [internalText, setInternalText] = useState(text);

  useEffect(() => {
    setInternalText(text);
  }, [text]);

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
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center p-4 bg-green-500">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-6 h-6 mr-2"
        />
        <span className="text-white font-semibold">WhatsApp</span>
      </div>

      <div className="whitespace-pre-wrap break-words p-4 bg-white border border-gray-300 rounded-md shadow-sm text-muted-foreground [&_a]:text-blue-600 [&_a]:underline">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{previewText}</ReactMarkdown>
      </div>
    </div>
  );
};

export default WhatsAppPreview;
