import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { toast } from "sonner";
import { FormDataMessage, SelectGroups } from "../../../../types";
import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  selectedGroups: z
    .array(z.string())
    .min(1, "Selecione pelo menos um grupo. 1 ou mais grupos"),
});

export type Group = {
  _id?: string;
  groupId: string;
  groupLink: string;
  groupName: string;
  setFormData: React.Dispatch<React.SetStateAction<FormDataMessage>>;
};

type SelectGroupsProps = {
  currentStep?: number;
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
  onSelectGroups?: (groups: string[]) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormDataMessage>>;
  onDataChange?: (data: any) => void;
};

type FormValues = z.infer<typeof FormSchema>;

export function SelectGroup({
  currentStep,
  setCurrentStep,
  onSelectGroups,
  setFormData,
}: SelectGroupsProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectedGroups: [],
    },
  });
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const { user } = useAuth();
  const API_URL = "https://bk-divulgadorpro.onrender.com";

  useEffect(() => {
    if (user) getGroups(user._id);
  }, [user]);

  function getGroups(userId?: string) {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (userId) {
      fetch(`${API_URL}/groups/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao carregar os grupos");
          return res.json();
        })
        .then((data) => setGroups(data))
        .catch((err) => toast.error(err.message))
        .finally(() => setLoading(false));
    }
  }

  const handleCheckboxChange = (groupId: string) => {
    setSelectedGroups((prev) => {
      const updated = prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId];

      // Sincronizar com react-hook-form, se estiver usando:
      form.setValue("selectedGroups", updated, { shouldValidate: true });

      return updated;
    });
  };

  const onSubmit = (data: FormValues) => {
    if (data.selectedGroups.length === 0) {
      toast.error("Selecione pelo menos um grupo.");
      return;
    }

    const selectedGroupData = groups.filter((group) =>
      data.selectedGroups.includes(group.groupId)
    );

    setFormData((prev) => ({
      ...prev,
      groups: selectedGroupData,
    }));

    onSelectGroups?.(data.selectedGroups);

    toast.success("Grupos selecionados com sucesso.");

    setCurrentStep?.((prev) => (prev ?? 0) + 1);
  };

  return (
    <>
      <Helmet title="Disparos de promoções" />
      <section className="flex flex-col gap-4 overflow-hidden">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Selecionar grupos
          </h1>
          <p className="text-muted-foreground">
            Selecione os grupos que deseja usar para os disparos.
          </p>
        </div>
        <div className="rounded-md bg-primary-foreground h-[73vh] overflow-y-auto overflow-x-hidden w-full flex justify-center flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="selectedGroups"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <div className="rounded-md p-6 md:h-[80vh] h-full m-auto max-w-xl w-full flex flex-col gap-2  items-stretch justify-between">
                        <div>
                          {loading ? (
                            <p className="text-center py-4">
                              Carregando grupos...
                            </p>
                          ) : (
                            <ul className="flex flex-col gap-4">
                              {groups.map((group) => {
                                const isChecked = field.value.includes(
                                  group.groupId
                                );
                                return (
                                  <li
                                    key={group.groupId}
                                    className={`flex items-center gap-4 p-4 rounded-lg border-2 shadow-sm transition-all ${
                                      isChecked
                                        ? "border-green-500 "
                                        : "border-border bg-background"
                                    }`}
                                  >
                                    <div>
                                      <input
                                        type="checkbox"
                                        id={group.groupId}
                                        checked={isChecked}
                                        onChange={() => {
                                          console.log(
                                            "Trocando grupo",
                                            group.groupId
                                          );
                                          if (
                                            field.value.includes(group.groupId)
                                          ) {
                                            field.onChange(
                                              field.value.filter(
                                                (id) => id !== group.groupId
                                              )
                                            );
                                          } else {
                                            field.onChange([
                                              ...field.value,
                                              group.groupId,
                                            ]);
                                          }
                                        }}
                                        className="w-6 h-6 appearance-none rounded-full border-2 border-primary checked:bg-green-500 checked:border-green-500 focus:ring-2 focus:ring-primary cursor-pointer relative
                      checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-[14px]"
                                      />
                                    </div>
                                    <div className="flex flex-col">
                                      <label
                                        htmlFor={group.groupId}
                                        className="cursor-pointer text-md font-semibold text-foreground"
                                      >
                                        {group.groupName}
                                      </label>
                                      <a className="text-blue-600 hover:underline text-sm break-words max-w-[230px]">
                                        {group.groupLink}
                                      </a>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button
                            onClick={() =>
                              setCurrentStep &&
                              setCurrentStep((currentStep ?? 0) - 1)
                            }
                            disabled={loading || !form.formState.isValid}
                            className="px-4 py-2 text-blue-600 hover:bg-gray-200 rounded"
                          >
                            Voltar
                          </Button>
                          <Button
                            type="submit"
                            // disabled={!form.formState.isValid}
                            className="px-4 py-2 rounded bg-primary bg-green-500 text-muted"
                          >
                            Avançar
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}
