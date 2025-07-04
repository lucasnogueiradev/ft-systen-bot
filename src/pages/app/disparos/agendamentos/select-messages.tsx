import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { PaginationTable } from "../../../../components/paginations";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { MessageTableRowSkeleton } from "../messages/row-skeleton";
import { MessagesTableRow } from "./messages-row";

export interface IMessage {
  _id: string;
  name: string;
  content: string;
  createdAt: string;
}

export function SelectMessage({
  currentStep,
  setCurrentStep,
  onSelectMessage,
  onDataChange,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onSelectMessage?: (messageId: string) => void;
  onDataChange?: (data: any) => void;
}) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const perPage = 2;

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          `https://bk-divulgadorpro-git-main-lucasnogueiradevs-projects.vercel.app/messages?page=${
            pageIndex + 1
          }&limit=${perPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Erro ao buscar mensagens");

        const data = await res.json();
        console.log("data", data);

        if (Array.isArray(data.mensagens)) {
          setMessages(data.mensagens);
          setTotalCount(data.totalCount || 0);
        }
      } catch (err) {
        console.error("Erro ao buscar mensagens:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, [pageIndex]);

  const handleNext = () => {
    if (!selectedMessage) {
      toast.error("Selecione uma mensagem.");
      return;
    }
    if (onSelectMessage) {
      onSelectMessage(selectedMessage);
    }

    // Aqui, pega a mensagem selecionada inteira e chama onDataChange
    if (onDataChange) {
      const message = messages.find((m) => m._id === selectedMessage);
      if (message) {
        onDataChange(message);
      }
    }

    setCurrentStep(currentStep + 1);
  };

  const handleSelect = (id: string) => {
    setSelectedMessage((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <Helmet title="Selecionar mensagem" />
      <section className="flex flex-col gap-4 h-full">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Selecionar mensagem
          </h1>
          <p className="text-muted-foreground">
            Escolha qual modelo de mensagem deseja disparar.
          </p>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col space-y-2.5">
          <div className="rounded-md border bg-card overflow-y-auto flex-1">
            <Table className="w-full table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-foreground">
                    Nome
                  </TableHead>
                  <TableHead className="text-foreground w-[200px]">
                    Mensagem
                  </TableHead>
                  <TableHead className="w-[100px] text-foreground">
                    Criado em
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="h-[200px]  block">
                {loading ? (
                  Array.from({ length: perPage }).map((_, i) => (
                    <MessageTableRowSkeleton key={i} />
                  ))
                ) : messages.length === 0 ? (
                  <TableRow>
                    <TableHead
                      colSpan={3}
                      className="py-6 text-center text-muted-foreground"
                    >
                      Nenhuma mensagem encontrada.
                    </TableHead>
                  </TableRow>
                ) : (
                  messages.map((message) => (
                    <MessagesTableRow
                      key={message._id}
                      message={message}
                      isSelected={selectedMessage === message._id}
                      onSelect={handleSelect}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <PaginationTable
          pageIndex={pageIndex + 1}
          totalCount={totalCount}
          perPage={perPage}
          onPageChange={(page) => setPageIndex(page - 1)}
        />

        <div className="flex gap-2 justify-end">
          <Button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-4 py-2 text-blue-600 hover:bg-gray-200 rounded"
          >
            Voltar
          </Button>
          <Button
            onClick={handleNext}
            className="px-4 py-2 rounded bg-green-500 text-white"
          >
            Avançar
          </Button>
        </div>
      </section>
    </>
  );
}
