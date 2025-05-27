import { Helmet } from "react-helmet-async";

import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loggo from "../../assets/logo-divulgadorpro.png";
import capa from "../../assets/chat-fundo2.jpg";

const singInForm = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Senha é obrigatória"),
});

type SignInForm = z.infer<typeof singInForm>;

export const SignIn = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redireciona se já estiver logado
    }
  }, [navigate]);
  async function handleSignIn(data: SignInForm) {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://bk-divulgadorpro-git-main-lucasnogueiradevs-projects.vercel.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            senha: data.password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.mensagem || "Erro ao fazer login");
        return;
      }

      // console.log("result", result.usuario.plan.planId);
      // setPlanId(result.usuario.plan.planId);

      console.log("response", response);

      toast.success("Login realizado com sucesso");

      // Aqui você pode salvar o token ou usuário no contexto ou localStorage
      localStorage.setItem("usuario", JSON.stringify(result.usuario));
      localStorage.setItem("token", result.token);
      // Redireciona para a página inicial ou dashboard
      navigate("/");
    } catch (error) {
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-[100%] bg-blue-300">
      <Helmet title="Login" />

      {/* Container principal com largura total */}
      <div
        className="flex flex-col m-auto items-center justify-end  h-full bg-green-800"
        style={{ backgroundImage: `url(${capa})` }}
      >
        {/* Logo e título */}
        <article className="flex md:hidden items-center -mt-8 mb-6">
          <img src={Loggo} className="w-[200px] pr-4" />
          {/* <h2 className="font-geist text-lg text-green-600">
            Divulgador <span className="text-foreground font-bold">Pro</span>
          </h2> */}
        </article>

        <div className="flex flex-col bg-white w-full rounded-tl-[100px] md:rounded-none items-center justify-center p-10 h-[90%] md:h-[100%]">
          <article className="md:flex hidden items-center -mt-8 mb-2">
            <img src={Loggo} className="w-30 h-10 pr-4" />
            <h2 className="font-geist text-lg text-green-600">
              Divulgador <span className="text-foreground font-bold">Pro</span>
            </h2>
          </article>
          {/* Título de página */}
          <div className="py-4 w-full -mt-24 justify-start items-start flex">
            <h1 className="text-3xl font-semibold text-accent">Login</h1>
          </div>

          {/* Formulário */}
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="w-full gap-x-4"
          >
            <div className="flex flex-col w-full gap-2 p-2">
              <Label className="text-accent">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="py-6 flex bg-white text-accent"
                placeholder="Digite seu email"
              />
            </div>

            <div className="flex flex-col w-full gap-2 p-2">
              <Label className="text-accent">Senha</Label>

              <div className="relative w-full">
                <Input
                  id="password"
                  type={mostrarSenha ? "text" : "password"}
                  {...register("password")}
                  placeholder="Digite sua senha"
                  className="py-6 pr-12 bg-white text-accent w-full"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((prev) => !prev)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {mostrarSenha ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between w-full text-sm text-accent px-2">
              <div />
              <a href="#" className="text-blue-500 hover:underline">
                Esqueci minha senha?
              </a>
            </div>
            <div className="p-4 flex mt-4">
              <Button
                isLoading={isLoading}
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-green-600 text-lg font-bold text-white hover:bg-green-700 py-6 rounded-lg "
              >
                Acessar
              </Button>
            </div>

            <div className="flex justify-center text-sm text-accent">
              Não tem uma conta?
              <a
                href="/auth/register"
                className="text-blue-500 hover:text-blue-600 pl-1"
              >
                Crie uma conta grátis.
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
