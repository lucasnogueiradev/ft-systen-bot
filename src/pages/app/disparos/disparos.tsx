import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { RiGroup2Line } from "react-icons/ri";

export default function GroupManager() {
  const [groups, setGroups] = useState<{ name: string; link: string }[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupLink, setGroupLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleAddGroup = () => {
    if (!groupName || !groupLink) {
      setStatus("Preencha todos os campos");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setGroups((prev) => [...prev, { name: groupName, link: groupLink }]);
      setGroupName("");
      setGroupLink("");
      setStatus("Grupo adicionado com sucesso!");
      setLoading(false);
      setModalOpen(false);
    }, 1000);
  };

  return (
    <>
      <Helmet title="Disparos de promoções" />
      <section className="">
        <h1 className="md:text-2xl text-lg my-4 font-semibold tracking-tight text-foreground flex items-center gap-2">
          <span>Disparos de promoções (Em desenvolvimento)</span>
        </h1>

        {/* Botão para abrir modal */}
        <div className="rounded-md bg-primary-foreground h-[83vh] overflow-y-auto overflow-x-hidden w-full flex justify-center">
          <div className="rounded-md p-6 md:h-[80vh] h-full m-auto max-w-xl w-full flex flex-col gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
            >
              + Adicionar grupo
            </button>

            {/* Lista de grupos */}
            <div className="w-full max-w-xl space-y-4">
              {groups.length === 0 ? (
                <p className="text-gray-500 text-center">
                  Nenhum grupo cadastrado ainda.
                </p>
              ) : (
                groups.map((group, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border p-4 rounded bg-secondary shadow"
                  >
                    <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-xl font-bold text-muted-foreground truncate">
                      {group.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold">{group.name}</h3>
                      <p className="text-sm text-blue-600 truncate w-52">
                        {group.link}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal simples */}
            {modalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-primary-foreground p-6 rounded-lg w-[90%] border-2 mb-24 max-w-md">
                  <h2 className="text-xl font-bold mb-4 flex justify-center items-center gap-x-2">
                    Adicionar novo grupo{" "}
                    <span>
                      <RiGroup2Line />
                    </span>
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
                    <p className="text-sm mb-2 text-green-600">{status}</p>
                  )}

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 rounde text-blue-600 hover:bg-gray-400"
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
