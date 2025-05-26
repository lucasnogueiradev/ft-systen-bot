import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FcShop } from "react-icons/fc";

import { CreateProfile } from "./create-profile";
import { CardProfile } from "./card-profile";
import { useAuth } from "../../../contexts/AuthContext";

export const Profiles = () => {
  const { user, setUser } = useAuth();
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const updateUsername = async (username: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3333/user/username", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensagem || "Erro desconhecido");
      }

      const data = await response.json();

      setUser((prevUser: any) => ({
        ...prevUser,
        username: data.username,
      }));

      return data;
    } catch (error: any) {
      throw new Error(error.message || "Erro na requisição");
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <Helmet title="Meus Perfis" />

      <h1 className="text-2xl font-500 tracking-tight text-foreground font-semibold flex-row items-center gap-2 flex">
        <span>Meus Perfis</span>
        <FcShop />
      </h1>

      <div className="rounded-md bg-card p-6 overflow-y-auto h-screen">
        {(Array?.isArray(user) ? user : [user]).map((item) => (
          <div key={item?._id} className="mb-6">
            {/* Só mostra o Card se não estiver editando esse item */}
            {editandoId !== item?._id && (
              <CardProfile
                username={item?.username}
                onEditar={() => setEditandoId(item?._id)}
              />
            )}

            {/* Mostra o formulário se estiver editando */}
            {editandoId === item?._id && (
              <CreateProfile
                username={item?.username}
                onDataChange={async (data) => {
                  await updateUsername(data.username);
                  setEditandoId(null);
                }}
                onCancelar={() => setEditandoId(null)}
                currentStep={1}
                setCurrentStep={() => {}}
                setFormData={() => {}}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
