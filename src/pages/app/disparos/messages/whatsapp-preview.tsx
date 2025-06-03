import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IMenssage {
  text: string;
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

  const previewText = internalText
    .replace("{{produto}}", produto)
    .replace("{{preco_original}}", precoOriginal)
    .replace("{{preco}}", preco)
    .replace("{{parcelamento}}", parcelamento)
    .replace("{{seu_link_afiliado}}", seuLinkAfiliado);

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
      {/* <div className="p-4">
        <p className="text-sm text-gray-600">🛍️ {produto}</p>
        <p className="text-sm text-gray-500 line-through">{precoOriginal}</p>
        <p className="text-lg font-semibold text-red-600">💸 {preco} 🚨🚨</p>
        <p className="text-sm text-gray-600">💳 {parcelamento}</p>
        <p className="text-sm text-blue-600">
          👉{" "}
          <a
            href={seuLinkAfiliado}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Link para comprar
          </a>
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Promoção sujeita a alteração a qualquer momento
        </p>
      </div> */}
      <div className="whitespace-pre-wrap break-words p-4 bg-white border border-gray-300 rounded-md shadow-sm text-muted [&_a]:text-blue-600 [&_a]:underline">
        {/* <span>{previewText}</span> */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{previewText}</ReactMarkdown>
      </div>
    </div>
  );
};

export default WhatsAppPreview;
