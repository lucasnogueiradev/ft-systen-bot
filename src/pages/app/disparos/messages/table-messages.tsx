import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { MessagesTableRow } from "./messages-row";
import { MessageTableRowSkeleton } from "./row-skeleton";
import { toast } from "sonner";
import { PaginationTable } from "../../../../components/paginations";

// interface da mensagem
interface IMessage {
  _id: string;
  name: string;
  content: string;
  createdAt: string;
}

export function TableMenssagens() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 8;
  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const paginatedMessage = messages?.slice(startIndex, endIndex);

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          "https://bk-divulgadorpro-git-main-lucasnogueiradevs-projects.vercel.app/messages",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Erro ao buscar mensagens");

        const data = await res.json();
        console.log("data", data);

        if (Array.isArray(data.mensagens) && data.mensagens.length > 0) {
          const messagesData = data?.mensagens.map((item: any) => item);
          console.log("refundsData", messagesData);
          setMessages(messagesData);
          toast.success("Reembolsos encontrados!");
        }
      } catch (err) {
        console.error("Erro ao buscar mensagens:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  return (
    <>
      <Helmet title="Mensagens salvas" />
      <section className="flex flex-col gap-4">
        <div className="space-y-2.5">
          <div className="rounded-md border bg-card overflow-y-auto h-[60vh]">
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
              <TableBody>
                {isLoading ? (
                  Array.from({ length: perPage }).map((_, i) => (
                    <MessageTableRowSkeleton key={i} />
                  ))
                ) : paginatedMessage.length === 0 ? (
                  <TableRow>
                    <TableHead
                      colSpan={6}
                      className="py-6 text-center text-muted-foreground"
                    >
                      Nenhuma solicitação de reembolso encontrada.
                    </TableHead>
                  </TableRow>
                ) : (
                  messages.map((message) => (
                    <MessagesTableRow key={message?._id} message={message} />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <PaginationTable
            pageIndex={currentPage}
            totalCount={messages.length}
            perPage={perPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </section>
    </>
  );
}
