import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../../contexts/AuthContext";
import { FaExternalLinkAlt } from "react-icons/fa";

export const MySite = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [siteName, setSiteName] = useState(
    user?.lojas?.[0]?.nomePersonalizado || ""
  );
  const [primaryColor, setPrimaryColor] = useState("#2563eb"); // azul padrão do Tailwind

  const handleGoToSite = () => {
    if (user?.username) {
      navigate(`/${user.username}`);
    }
  };

  const handleSave = () => {
    // Aqui você pode salvar via API ou localStorage
    localStorage.setItem(
      "siteConfig",
      JSON.stringify({ siteName, primaryColor })
    );
    alert("Configurações salvas!");
  };

  return (
    <>
      <Helmet title="Configurar meu site" />
      <section className="flex flex-col md:gap-4 w-full">
        <div>
          <h1 className="md:text-2xl text-lg my-4 font-500 tracking-tight text-foreground font-semibold flex items-center gap-2">
            Configurar meu site
          </h1>
        </div>

        <div className="rounded-md bg-primary-foreground h-[83vh] overflow-y-auto overflow-x-hidden flex items-center justify-center">
          <div className="rounded-md p-6 md:h-[80vh] h-full m-auto w-full max-w-md space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do site:
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Digite o nome personalizado do site"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cor principal do site:
              </label>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-16 h-10 p-1 rounded cursor-pointer"
              />
            </div>

            <div className="flex gap-4 mt-4 flex-col">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Salvar configurações
              </button>
              <button
                onClick={handleGoToSite}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition flex-row flex gap-x-2  justify-center items-center"
              >
                Acessara meu site{" "}
                <span>
                  <FaExternalLinkAlt className="text-[14px] flex" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
