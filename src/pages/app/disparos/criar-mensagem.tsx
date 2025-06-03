import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { RiMessage2Line } from "react-icons/ri";

export default function CreateMessage() {
  const [messages, setMessages] = useState<
    { title: string; content: string }[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleAddMessage = () => {
    if (!messageTitle || !messageContent) {
      setStatus("Preencha todos os campos");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { title: messageTitle, content: messageContent },
      ]);
      setMessageTitle("");
      setMessageContent("");
      setStatus("Mensagem adicionada com sucesso!");
      setLoading(false);
      setModalOpen(false);
    }, 1000);
  };

  return (
    <>
      <Helmet title="Disparos de promoções" />
      <section>
        <h1 className="md:text-2xl text-lg my-4 font-semibold tracking-tight text-foreground flex items-center gap-2">
          <span>Criar mensagem (Em desenvolvimento)</span>
        </h1>

        {/* Área principal */}
        <div className="rounded-md bg-primary-foreground h-[83vh] overflow-y-auto overflow-x-hidden w-full flex justify-center">
          <div className="rounded-md p-6 md:h-[80vh] h-full m-auto max-w-xl w-full flex flex-col gap-2">
            {/* Botão para abrir modal */}
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
            >
              + Adicionar mensagem
            </button>

            {/* Lista de mensagens */}
            <div className="w-full max-w-xl space-y-4">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center">
                  Nenhuma mensagem cadastrada ainda.
                </p>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 border p-4 rounded bg-secondary shadow"
                  >
                    <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-xl text-white">
                      <RiMessage2Line />
                    </div>
                    <div className="flex flex-col w-full">
                      <h3 className="font-semibold">{msg.title}</h3>

                      <p
                        className="text-sm text-muted-foreground truncate w-full"
                        title={msg.content}
                      >
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal de adicionar mensagem */}
            {modalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-primary-foreground p-6 rounded-lg w-[90%] border-2 mb-24 max-w-md">
                  <h2 className="text-xl font-bold mb-4 flex justify-center items-center gap-x-2">
                    Adicionar nova mensagem <RiMessage2Line />
                  </h2>

                  <input
                    type="text"
                    placeholder="Título da mensagem"
                    value={messageTitle}
                    onChange={(e) => setMessageTitle(e.target.value)}
                    className="border p-3 rounded-md w-full mb-3 bg-secondary"
                  />
                  <p className="text-muted-foreground pb-4 -mt-2 text-sm">
                    O titulo e apenas para organizar, não será enviada para o
                    cliente.
                  </p>
                  <textarea
                    placeholder="Conteúdo da mensagem"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    className="border p-3 rounded-md w-full mb-3 bg-secondary resize-none h-24"
                  />
                  <p className="text-muted-foreground pb-4 -mt-2 text-sm">
                    O conteudo da mensagem será enviado para o cliente.
                  </p>

                  {status && (
                    <p className="text-sm mb-2 text-green-600 text-center">
                      {status}
                    </p>
                  )}

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 text-blue-600 hover:bg-gray-200 rounded"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={handleAddMessage}
                      disabled={loading}
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {loading ? "Salvando..." : "Salvar"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
