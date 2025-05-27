import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { CardLoja } from "./card-loja";
import { CreateLojas } from "./create-lojas";

import { useAuth } from "../../../contexts/AuthContext";
import { AppLoader } from "../../../components/ui/loading";

// interface LojaPersonalizada {
//   nomePersonalizado: string;
//   plataforma: string;
//   logo: string;
//   nameAffiliate: string;
// }

// interface LojasPersonalizadasResponse {
//   lojas: LojaPersonalizada[];
// }

export function Lojas() {
  const { user, updateLojas } = useAuth();
  const [loading, setLoading] = useState(false);

  const [editandoLojaId, setEditandoLojaId] = useState<string | null>(null);

  const getLojasDoUsuario = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch(
        "https://bk-divulgadorpro-git-main-lucasnogueiradevs-projects.vercel.app/user/lojas",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Lojas atualizadas do backend:", data.lojas);

        const usuarioAtualStr = localStorage.getItem("usuario");

        if (usuarioAtualStr) {
          const usuarioAtual = JSON.parse(usuarioAtualStr);
          usuarioAtual.lojas = data.lojas;
          localStorage.setItem("usuario", JSON.stringify(usuarioAtual));
        }
        console.log("loja nome atualizado", data.lojas);
        updateLojas(data.lojas);
      } else {
        console.error("Erro ao buscar lojas:", data);
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (nameAffiliate: string, lojaId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token de autenticação não encontrado.");
      return;
    }

    try {
      console.log("Atualizando loja:", lojaId);
      console.log("Atualizando loja nameAffiliate:", nameAffiliate);

      const response = await fetch(
        "https://bk-divulgadorpro-git-main-lucasnogueiradevs-projects.vercel.app/user/loja",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lojaId, // ← Nome correto
            nameAffiliate,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.error("Erro ao salvar loja:", data);
        return;
      }

      if (data.loja) {
        getLojasDoUsuario();
      } else {
        console.error("A resposta da API não contém a propriedade 'loja'.");
      }

      setEditandoLojaId(null); // Encerra a edição
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
    }
  };

  const handleEditarClick = (id: string) => {
    setEditandoLojaId(id);
  };

  return (
    <>
      <Helmet title="Configuração de Lojas" />
      <section className="flex flex-col md:gap-4 w-full">
        <div>
          <h1 className="md:text-2xl text-lg my-4 font-500 tracking-tight text-foreground font-semibold flex-row items-center gap-2 flex">
            <span>Configurar Lojas</span>
          </h1>
        </div>
        {loading && <AppLoader fullscreen={loading} />}
        <div className="rounded-md bg-primary-foreground h-[83vh] overflow-y-auto overflow-x-hidden flex items-center justify-center">
          <div className="rounded-md p-6 md:h-[80vh] h-full m-auto">
            {/* <FilterTableWhats /> */}

            <div className="flex gap-6 mt-6 flex-wrap pb-4">
              {user?.lojas?.map((loja) => {
                const lojaId = String(loja._id);
                return String(editandoLojaId) === lojaId ? (
                  <CreateLojas
                    key={loja._id}
                    logoUrl={loja.logo}
                    name={loja.nome}
                    nameAffiliate={loja.nameAffiliate}
                    onDataChange={(data) => handleSave(data.name, lojaId)}
                    onCancelar={() => setEditandoLojaId(null)}
                    loading={loading}
                  />
                ) : (
                  <CardLoja
                    key={loja._id}
                    nome={loja.nome}
                    label={loja.nomePersonalizado}
                    logoUrl={loja.logo}
                    exibirBotao={false}
                    status={loja.status}
                    nameAffiliate={loja.nameAffiliate}
                    onEditar={() => handleEditarClick(lojaId)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
