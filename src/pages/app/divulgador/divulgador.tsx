import { Helmet } from "react-helmet-async";
import { Button } from "../../../components/ui/button";
import { FaTelegramPlane } from "react-icons/fa";

import { useAuth } from "../../../contexts/AuthContext";

export interface ProfileData {
  fluxo: {
    name: string;
  };
}

export const Divulgador = () => {
  const { user } = useAuth();
  const userId = user?._id;
  const handleClick = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        "https://bk-divulgadorpro-git-main-lucasnogueiradevs-projects.vercel.app/telegram-start",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        const urlTelegram = `https://t.me/divugadorpro011_bot?start=${userId}`;
        window.open(urlTelegram, "_blank", "noopener,noreferrer");
      } else {
        alert("Erro ao iniciar Telegram");
      }
    } catch (error) {
      console.error(error);
    }
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
          className="flex items-center bg-blue-600 font-semibold text-lg md:px-9 p-2 rounded-sm text-accent hover:bg-blue-800 gap-2"
        >
          <FaTelegramPlane color="#ffffff" />
          <span>Abrir criador de oferta no Telegram</span>
        </Button>
      </div>
    </section>
  );
};
