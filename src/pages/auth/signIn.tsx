import { Helmet } from "react-helmet-async";

import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const singInForm = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof singInForm>;

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>();

  // const { mutateAsync: authenticate } = useMutation({
  //   mutationFn: signIn,
  // });
  async function handleSignIn(data: SignInForm) {
    try {
      // await authenticate({ email: data.email });
      toast.success("Login realizado com sucesso");
    } catch {}
  }

  return (
    <div className="">
      <Helmet title="Loggin" />
      <div className="p-8">
        <div className="flex w-[300px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-muted-foreground">
              Login
            </h1>
            <p className="text-sm text-muted-foreground">Acessar</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div className="space-y-2">
            <Label>Seu e-mail</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full">
            Acessar
          </Button>
        </form>
      </div>
    </div>
  );
};
