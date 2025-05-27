import { Helmet } from "react-helmet-async";
import React, { useState } from "react";

type SiteCustomization = {
  backgroundColor: string;
  titleText: string;
  textColor: string;
};
// import { AppLoader } from "../../../components/ui/loading";

export default function SiteCustomizer() {
  const [customization, setCustomization] = useState<SiteCustomization>({
    backgroundColor: "#f3f4f6", // cinza claro
    titleText: "Meu Site de Produtos",
    textColor: "#111827", // preto escuro
  });
  // Função para atualizar campos do form
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setCustomization((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <>
      <Helmet title="Configurar seu site" />
      <section className="flex flex-col md:gap-4 w-full">
        <div>
          <h1 className="md:text-2xl text-lg my-4 font-500 tracking-tight text-foreground font-semibold flex-row items-center gap-2 flex">
            <span>Configurar seu site (Em desenvolvimento)</span>
          </h1>
        </div>
        {/* {loading && <AppLoader fullscreen={loading} />} */}
        <div className="rounded-md bg-primary-foreground h-[83vh] overflow-y-auto overflow-x-hidden flex items-center justify-center">
          <div className="rounded-md p-6 md:h-[80vh] h-full m-auto">
            <div className="p-6 max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold mb-4">Personalize seu site</h1>

              <form className="mb-6 space-y-4">
                <div>
                  <label className="block mb-1 font-medium" htmlFor="titleText">
                    Título do site
                  </label>
                  <input
                    type="text"
                    id="titleText"
                    name="titleText"
                    value={customization.titleText}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label
                    className="block mb-1 font-medium"
                    htmlFor="backgroundColor"
                  >
                    Cor de fundo
                  </label>
                  <input
                    type="color"
                    id="backgroundColor"
                    name="backgroundColor"
                    value={customization.backgroundColor}
                    onChange={handleChange}
                    className="w-16 h-10 p-0 border-0"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium" htmlFor="textColor">
                    Cor do texto
                  </label>
                  <input
                    type="color"
                    id="textColor"
                    name="textColor"
                    value={customization.textColor}
                    onChange={handleChange}
                    className="w-16 h-10 p-0 border-0"
                  />
                </div>
              </form>

              <div
                className="p-10 rounded shadow-md"
                style={{
                  backgroundColor: customization.backgroundColor,
                  color: customization.textColor,
                }}
              >
                <h2 className="text-3xl font-semibold">
                  {customization.titleText}
                </h2>
                <p>Esse é um preview do seu site personalizado.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
