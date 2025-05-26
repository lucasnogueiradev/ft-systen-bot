import { Helmet } from "react-helmet-async";
import { Button } from "../../../components/ui/button";
import { FaTelegramPlane } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

export interface ProfileData {
  fluxo: {
    name: string;
  };
}

export const Divulgador = () => {
  const { user } = useAuth();
  const userId = user?._id;

  const [loading, setLoading] = useState(false); // ← estado de carregamento

  const handleClick = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const urlTelegram = `https://t.me/divugadorpro011_bot?start=${userId}`;

    // Abre o link primeiro
    window.location.href = urlTelegram;

    try {
      await fetch(
        "https://bk-divulgadorpro-git-main-lucasnogueiradevs-projects.vercel.app/telegram-start",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Erro ao comunicar com backend:", error);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <section className="flex flex-col gap-4">
      <Helmet title="Meus Perfis" />

      <h1 className="md:text-2xl text-lg font-500 tracking-tight text-foreground font-semibold flex-row items-center gap-2 flex">
        <span>Criador de Ofertas</span>
        <FaTelegramPlane color="#1581fc" />
      </h1>

      <div className="rounded-md bg-card p-6 h-[80vh]">
        <Button
          onClick={handleClick}
          disabled={loading}
          className={`flex items-center font-semibold text-lg md:px-9 p-2 rounded-sm text-white gap-2
            ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-800"
            }`}
        >
          <FaTelegramPlane color="#ffffff" />
          {loading
            ? "Abrindo no Telegram..."
            : "Abrir criador de oferta no Telegram"}
        </Button>
      </div>
    </section>
  );
};
