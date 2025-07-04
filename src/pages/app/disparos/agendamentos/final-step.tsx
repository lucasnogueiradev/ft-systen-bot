import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { FormDataMessage } from "../../../../types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IGroup {
  _id: string;
  groupName: string;
  userId?: string;
  groupLink?: string;
  groupId?: string;
}

interface IFinalStepProps {
  selectedGroups?: IGroup[];
  selectedMessage?: { id: string; name: string; content: string };
  onBack?: () => void;
  onSubmit?: (schedule: { date: string; time: string }) => Promise<void> | void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData?: FormDataMessage;
}

export function FinalStep({
  selectedGroups,
  selectedMessage,
  onBack,
  onSubmit,
  currentStep,
  setCurrentStep,
}: IFinalStepProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!date || !time) {
      alert("Por favor, selecione data e horário.");
      return;
    }

    if (!onSubmit) return;

    setLoading(true);
    try {
      await onSubmit({ date, time });
    } finally {
      setLoading(false);
    }
  };
  console.log("Selected Groups:", selectedGroups);

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
  const [internalText, setInternalText] = useState(
    selectedMessage?.content || ""
  );

  useEffect(() => {
    if (selectedMessage) {
      setInternalText(selectedMessage.content);
    }
  }, [selectedMessage]);

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
    <section className="max-w-3xl mx-auto p-6 rounded shadow flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Confirmar agendamento
      </h1>

      <div>
        <h2 className="font-medium text-gray-800 mb-2">Grupos selecionados:</h2>
        {!selectedGroups || selectedGroups.length === 0 ? (
          <p className="text-gray-500 italic">Nenhum grupo selecionado.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {selectedGroups.map((group) => (
              <li key={group._id}>{group.groupName}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="font-medium text-gray-800 mb-2">
          Mensagem selecionada:
        </h2>
        {selectedMessage ? (
          <div className="p-4 rounded">
            <h3 className="font-semibold">{selectedMessage.name}</h3>
            {/* <p>{selectedMessage.content}</p> */}
            <div className="line-clamp-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {previewText}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">Nenhuma mensagem selecionada.</p>
        )}
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex flex-col">
          <label htmlFor="date" className="mb-1 font-medium text-gray-700">
            Data
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="time" className="mb-1 font-medium text-gray-700">
            Horário
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          Voltar
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 text-white hover:bg-green-700"
        >
          {loading ? "Agendando..." : "Confirmar e Agendar"}
        </Button>
      </div>
    </section>
  );
}
