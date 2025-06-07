import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { RiGroup2Line } from "react-icons/ri";
import { useAuth } from "../../../contexts/AuthContext";
import { AppLoader } from "../../../components/ui/loading";

type Group = {
  _id?: string; // se tiver id único no seu backend, use aqui
  groupName: string;
  groupLink: string;
};

export default function GroupManager() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupLink, setGroupLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const { user } = useAuth();
  const userId = user?._id;
  const [error, setError] = useState<string | null>(null);
  const API_URL = "http://localhost:8082";
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/webhook/list-groups?userId=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar os grupos");
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        setGroups(data.groups);
        console.log("groups", data.groups);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddGroup = async () => {
    if (!groupName || !groupLink) {
      setStatus("Preencha todos os campos");
      return;
    }

    const inviteCodeMatch = groupLink.match(/chat\.whatsapp\.com\/(\S+)/);
    if (!inviteCodeMatch) {
      setStatus("Link inválido, não foi possível extrair o inviteCode.");
      return;
    }
    const inviteCode = inviteCodeMatch[1];

    setLoading(true);
    setStatus("");

    try {
      const joinRes = await fetch("http://localhost:3000/join-group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteCode }),
      });

      if (!joinRes.ok) {
        const errorData = await joinRes.json();
        setStatus(
          `Erro ao entrar no grupo: ${errorData.error || joinRes.statusText}`
        );
        setLoading(false);
        return;
      }

      const joinData = await joinRes.json();
      const API_URL = "http://localhost:8082";
      const webhookRes = await fetch(`${API_URL}/webhook/update-grupo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId: joinData.groupId,
          groupName,
          groupLink,
          timestamp: new Date().toISOString(),
          userId,
        }),
      });

      if (!webhookRes.ok) {
        setStatus("Erro ao enviar evento para webhook.");
        setLoading(false);
        return;
      }

      setGroups((prev) => [
        ...prev,
        { groupName: groupName, groupLink: groupLink },
      ]);
      setGroupName("");
      setGroupLink("");
      setStatus("Grupo adicionado com sucesso!");
      setModalOpen(false);
    } catch (error) {
      setStatus("Erro inesperado: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet title="Disparos de promoções" />
      <section className="">
        <h1 className="md:text-2xl text-lg my-4 font-semibold tracking-tight text-foreground flex items-center gap-2">
          <span>Meus grupos</span>
        </h1>

        <div className="rounded-md bg-primary-foreground h-[83vh] overflow-y-auto overflow-x-hidden w-full flex justify-center">
          <div className="rounded-md p-6 md:h-[80vh] h-full m-auto max-w-xl w-full flex flex-col gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
            >
              + Adicionar grupo
            </button>

            {loading && <AppLoader fullscreen={loading} />}
            {error && <p className="text-red-600">Erro: {error}</p>}

            {!loading && !error && (
              <div className="w-full max-w-xl space-y-4">
                {groups.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    Nenhum grupo cadastrado ainda.
                  </p>
                ) : (
                  groups?.map((group, index) => (
                    <div
                      key={group._id || index}
                      className="flex items-center gap-4 border p-4 rounded bg-secondary shadow"
                    >
                      <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-xl font-bold text-muted-foreground truncate">
                        {group?.groupName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold">{group?.groupName}</h3>
                        <p className="text-sm text-blue-600 truncate w-52">
                          {group?.groupLink}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {modalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-primary-foreground p-6 rounded-lg w-[90%] border-2 mb-24 max-w-md">
                  <h2 className="text-xl font-bold mb-4 flex justify-center items-center gap-x-2">
                    Adicionar novo grupo <RiGroup2Line />
                  </h2>

                  <input
                    type="text"
                    placeholder="Nome do grupo"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="border p-3 rounded-md w-full mb-3 bg-secondary"
                  />
                  <input
                    type="text"
                    placeholder="Link do grupo WhatsApp"
                    value={groupLink}
                    onChange={(e) => setGroupLink(e.target.value)}
                    className="border p-3 rounded-md w-full mb-3 bg-secondary"
                  />

                  {status && (
                    <p
                      className={`text-sm mb-2 ${
                        status.includes("Erro")
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {status}
                    </p>
                  )}

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 rounded text-blue-600 hover:bg-gray-400"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={handleAddGroup}
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
