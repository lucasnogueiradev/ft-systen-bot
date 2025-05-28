// import { Helmet } from "react-helmet-async";
// import React, { useState } from "react";

import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { ProductCard } from "./card-site";

import { AppLoader } from "../../../components/ui/loading";

// type SiteCustomization = {
//   backgroundColor: string;
//   titleText: string;
//   textColor: string;
// };
// // import { AppLoader } from "../../../components/ui/loading";

// export default function SiteCustomizer() {
//   const [customization, setCustomization] = useState<SiteCustomization>({
//     backgroundColor: "#f3f4f6", // cinza claro
//     titleText: "Meu Site de Produtos",
//     textColor: "#111827", // preto escuro
//   });
//   // Função para atualizar campos do form
//   function handleChange(
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) {
//     const { name, value } = e.target;
//     setCustomization((prev) => ({ ...prev, [name]: value }));
//   }
//   return (
//     <>
//       <Helmet title="Configurar seu site" />
//       <section className="flex flex-col md:gap-4 w-full">
//         <div>
//           <h1 className="md:text-2xl text-lg my-4 font-500 tracking-tight text-foreground font-semibold flex-row items-center gap-2 flex">
//             <span>Configurar seu site (Em desenvolvimento)</span>
//           </h1>
//         </div>
//         {/* {loading && <AppLoader fullscreen={loading} />} */}
//         <div className="rounded-md bg-primary-foreground h-[83vh] overflow-y-auto overflow-x-hidden flex items-center justify-center">
//           <div className="rounded-md p-6 md:h-[80vh] h-full m-auto">
//             <div className="p-6 max-w-4xl mx-auto">
//               <h1 className="text-2xl font-bold mb-4">Personalize seu site</h1>

//               <form className="mb-6 space-y-4">
//                 <div>
//                   <label className="block mb-1 font-medium" htmlFor="titleText">
//                     Título do site
//                   </label>
//                   <input
//                     type="text"
//                     id="titleText"
//                     name="titleText"
//                     value={customization.titleText}
//                     onChange={handleChange}
//                     className="w-full p-2 border border-gray-300 rounded"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     className="block mb-1 font-medium"
//                     htmlFor="backgroundColor"
//                   >
//                     Cor de fundo
//                   </label>
//                   <input
//                     type="color"
//                     id="backgroundColor"
//                     name="backgroundColor"
//                     value={customization.backgroundColor}
//                     onChange={handleChange}
//                     className="w-16 h-10 p-0 border-0"
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-1 font-medium" htmlFor="textColor">
//                     Cor do texto
//                   </label>
//                   <input
//                     type="color"
//                     id="textColor"
//                     name="textColor"
//                     value={customization.textColor}
//                     onChange={handleChange}
//                     className="w-16 h-10 p-0 border-0"
//                   />
//                 </div>
//               </form>

//               <div
//                 className="p-10 rounded shadow-md"
//                 style={{
//                   backgroundColor: customization.backgroundColor,
//                   color: customization.textColor,
//                 }}
//               >
//                 <h2 className="text-3xl font-semibold">
//                   {customization.titleText}
//                 </h2>
//                 <p>Esse é um preview do seu site personalizado.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
// SiteCustomizer.jsx

interface ISiteProducts {
  imageUrl: string;
  title: string;
  priceOriginal: string;
  priceValue: string;
}

export function SiteCustomizer() {
  const [products, setProducts] = useState<ISiteProducts[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(
          `https://bk-divulgadorpro-git-main-lucasnogueiradevs-projects.vercel.app/product?userId=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Erro ao buscar produtos");
        const data = await res.json();
        const produtos = data.products || data;
        if (Array.isArray(produtos)) {
          setProducts(produtos);

          console.log("produtos da req2", produtos);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) fetchProducts();
  }, [userId]);

  return (
    <>
      {/* Cabeçalho */}
      <header className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Minha Loja</h1>
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="px-4 py-2 rounded text-black"
          />
        </div>
      </header>

      {/* Conteúdo principal */}
      {loading && <AppLoader fullscreen={loading} />}
      <main className="max-w-7xl mx-auto p-2 h-screen">
        <h2 className="text-1xl font-semibold px-2 pt-2 mb-4 text-muted-foreground">
          Produtos em Destaque
        </h2>
        <section className="h-screen overflow-hidden">
          <div className="h-[80vh] overflow-y-scroll px-0 py-6">
            <div className="flex flex-wrap gap-1">
              {products && products.length > 0 ? (
                products.map((produto, index) => (
                  <ProductCard
                    key={index}
                    image={produto.imageUrl}
                    name={produto.title}
                    originalPrice={produto.priceOriginal}
                    price={produto.priceValue}
                  />
                ))
              ) : (
                <p className="text-gray-500 col-span-full">
                  Nenhum produto disponível.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-200 text-center text-sm p-4 mt-10">
        &copy; 2025 Minha Loja. Todos os direitos reservados.
      </footer>
    </>
  );
}
