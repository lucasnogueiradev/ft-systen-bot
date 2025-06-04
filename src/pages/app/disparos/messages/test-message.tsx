import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import axios from "axios";

interface IMensage {
  message: string;
}

export const TestMessage = ({ message }: IMensage) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [internalText, setInternalText] = useState(message);

  useEffect(() => {
    setInternalText(message);
  }, [message]);

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

  const handleTestMessage = async () => {
    if (!phoneNumber.trim()) {
      setStatus("Por favor, digite um número válido.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await axios.post("http://localhost:3000/send-message", {
        number: phoneNumber,
        message: previewText,
        imageUrl:
          "https://a-static.mlcdn.com.br/800x560/kit-3-mamadeiras-petala-3-0-125-260-330ml-philips-avent/mikakids/scd838-29-all-kit-petala-incolor/e6ec4f85dc8b9ac9a2460322ea52fc7e.jpeg",
      });

      if (response.data?.success) {
        setStatus("✅ Mensagem enviada com sucesso!");
      } else {
        setStatus("⚠️ Falha ao enviar mensagem.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Erro ao conectar com a API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-secondary rounded-md shadow-md w-full max-w-md">
      <h2 className="text-lg font-semibold">Testar Mensagem</h2>

      <Input
        placeholder="Digite o número com DDD (ex: 11999999999)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        disabled={loading}
      />

      <Button
        onClick={handleTestMessage}
        className="bg-blue-500 text-white"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Testar Mensagem"}
      </Button>

      {status && <p className="text-sm text-gray-700">{status}</p>}
    </div>
  );
};
