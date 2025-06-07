import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "../../../components/ui/button";
import { CardTitle } from "../../../components/ui/card";

export default function Disparos() {
  const [groupLink, setGroupLink] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const match = groupLink.match(/chat\.whatsapp\.com\/([a-zA-Z0-9]+)/);
    const inviteCode = match?.[1];

    if (!inviteCode) {
      setStatus("❌ Link do grupo inválido.");
      return;
    }

    // if (!message && !imageUrl) {
    //   setStatus("❌ Você deve enviar pelo menos uma mensagem ou uma imagem.");
    //   return;
    // }

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("http://localhost:3000/join-group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteCode, message, imageUrl, caption }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(`✅ Mensagem enviada para o grupo: ${data.groupId}`);
        setGroupLink("");
        setMessage("");
        setImageUrl("");
        setCaption("");
      } else {
        setStatus(`❌ Erro: ${data.error}`);
      }
    } catch (err) {
      setStatus("❌ Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet title="Disparos de promoções" />
      <section className="flex flex-col md:gap-4 w-full">
        <div>
          <h1 className="md:text-2xl text-lg my-4 font-semibold tracking-tight text-foreground flex items-center gap-2">
            <span>Disparos de promoções (Em desenvolvimento)</span>
          </h1>
        </div>
        <div className="rounded-md bg-primary-foreground h-[83vh] overflow-y-auto overflow-x-hidden flex items-center justify-center">
          <div className="rounded-md p-6 md:h-[80vh] h-full m-auto max-w-xl w-full flex flex-col gap-4">
            <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              + Adicionar grupo 2
            </Button>
            <input
              type="text"
              placeholder="Nome do grupo"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-3 rounded-md w-full resize-none text-muted-foreground bg-secondary"
            />
            <input
              type="text"
              placeholder="Link do grupo WhatsApp"
              value={groupLink}
              onChange={(e) => setGroupLink(e.target.value)}
              className="border p-3 rounded-md w-full text-muted-foreground bg-secondary"
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {loading ? "Enviando..." : "Salvar grupo"}
            </button>
            {status && <div className="text-sm mt-2 text-center">{status}</div>}
            <div>
              {/* <h4>Meus grupos cadastrados</h4> */}
              <div className="flex w-full">
                <div className="p-4 flex bg-blue-500">
                  <CardTitle className="text-base font-semibold text-muted-foreground bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center">
                    <p className="text-slate-800 text-2xl">G</p>
                  </CardTitle>
                </div>
                <div className="w-[50%] flex justify-start bg-red-500">
                  <h3>Nome: Grupo 1</h3>
                  <p>Descrição: descrição do grupo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
