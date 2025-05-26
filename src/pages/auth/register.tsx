import { Helmet } from "react-helmet-async";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import capa from "../../assets/chat-fundo2.jpg";
import Loggo from "../../assets/icon.png";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// 🛡️ Schema com verificação da confirmação de senha
const signUpFormSchema = z
  .object({
    // username: z.string().min(1, "O nome de usuário é obrigatório."),
    email: z.string().email("E-mail inválido."),
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
    confirmPassword: z.string().min(6, "Confirmação de senha é obrigatória."),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpFormSchema>;

export const SignUp = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenhaR, setMostrarSenhaR] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  });

  async function handleRegister(data: SignUpForm) {
    try {
      const response = await fetch(
        "https://bk-divulgadorpro-git-main-lucasnogueiradevs-projects.vercel.app/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // nome: data.username,
            email: data.email,
            telefone: data.phone,
            senha: data.password,
          }),
        }
      );

      const responseData = await response.json();
      console.log("data", responseData);

      if (!response.ok) {
        toast.error(responseData.mensagem || "Erro ao criar conta.");
        return;
      }
      navigate("/auth/signIn");
      toast.success("Conta criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao conectar com o servidor.");
      console.error("Erro no cadastro:", error);
    }
  }

  return (
    <div className="h-screen w-[100%] bg-blue-300">
      <Helmet title="Criar Conta" />
      <div
        className="flex flex-col m-auto items-center justify-end  h-full bg-green-800"
        style={{ backgroundImage: `url(${capa})` }}
      >
        <article className="flex items-center -mt-8 mb-4">
          <img src={Loggo} className="w-30 h-10 pr-4" />
          <h2 className="font-geist text-lg text-green-600">
            Divulgador <span className="text-foreground font-bold">Pro</span>
          </h2>
        </article>
        <div className="flex flex-col bg-white w-full rounded-tl-[100px] items-center justify-center p-10 h-[90%]">
          <div className="py-4 w-full -mt-24 justify-start items-start flex">
            <h1 className="text-2xl font-semibold text-accent">Criar conta </h1>
          </div>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="w-full gap-x-4"
          >
            {/* <div className="space-y-1">
            <Label>Nome de usuário</Label>
            <Input
              id="username"
              type="text"
              placeholder="Digite seu nome de usuário"
              {...register("username")}
              className="py-6"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div> */}

            <div className="flex flex-col w-full gap-2 p-2">
              <Label className="text-accent">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                {...register("email")}
                className="py-6 flex bg-white text-accent"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2 p-2">
              <Label className="text-accent">Senha</Label>

              <div className="relative w-full">
                <Input
                  id="password"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                  {...register("password")}
                  className="py-6 pr-12 bg-white text-muted-foreground w-full"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
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

            <div className="flex flex-col w-full gap-2 p-2">
              <Label className="text-accent">Repetir Senha</Label>
              <div className="relative w-full">
                <Input
                  id="confirmPassword"
                  type={mostrarSenhaR ? "text" : "password"}
                  placeholder="Repita sua senha"
                  {...register("confirmPassword")}
                  className="py-6 pr-12 bg-white text-muted-foreground w-full"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setMostrarSenhaR((prev) => !prev)}
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

            <div className="flex flex-col w-full gap-2 p-2">
              <Label className="text-accent">Número WhatsApp (opcional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(xx) xxxxx-xxxx"
                {...register("phone")}
                className="py-6 flex bg-white text-accent"
              />
            </div>

            <div className="p-4 flex mt-4">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-green-600 text-lg font-bold text-white hover:bg-green-700 py-6 rounded-lg "
              >
                Criar Conta
              </Button>
            </div>

            <span className="text-sm text-muted-foreground justify-center flex">
              Já tem uma conta?{" "}
              <a
                href="/auth/signIn"
                className="text-blue-500 hover:text-blue-600 pl-1"
              >
                Entrar
              </a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
