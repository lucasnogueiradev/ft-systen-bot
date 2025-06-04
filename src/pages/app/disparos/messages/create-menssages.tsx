import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";

import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import { Label } from "../../../../components/ui/label";
import { MdOutlineEmojiEmotions, MdOutlineFormatBold } from "react-icons/md";
import { CgFormatItalic } from "react-icons/cg";

import { GoStrikethrough } from "react-icons/go";
import { CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { useTextFormatting } from "../../../../components/utils/useTextFormatting";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import WhatsAppPreview from "./whatsapp-preview";
import { VariableDropdown } from "./variable-dropdown";
import EmojiPicker from "emoji-picker-react";
import { TestMessage } from "./test-message";
import axios from "axios";
import { toast } from "sonner";
import { CreateMessageProps } from "../../../../types";

// Define your schema here
const ModelSchema = z.object({
  content: z.object({
    text: z.string().min(1, "O texto é obrigatório"),
    baseboard: z.string().optional(),
  }),
  name: z.string().min(1, "O campo não pode estar vazio."),
});

type FormValues = z.infer<typeof ModelSchema>;

export function CreateMensages({
  currentStep,
  setCurrentStep,
}: CreateMessageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>("");
  const [variables, setVariables] = useState<{ [key: string]: string }>({});
  const [counter, setCounter] = useState(1);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(ModelSchema),
    mode: "onChange",
  });

  const {
    addBoldFormatting,
    addItalicFormatting,
    addStrikethroughFormatting,
    addEmoji,
    handleInputChange,
    handleTextChange,
  } = useTextFormatting({
    textareaRef,
    text,
    setText,
    variables,
    setVariables,
    counter,
    setCounter,
    selectedValues,
    setSelectedValues,
  });

  const [savedMessages, setSavedMessages] = useState<string[]>(() => {
    const saved = localStorage.getItem("savedMessages");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSaveMessage = () => {
    if (text.trim()) {
      // Adiciona a nova mensagem ao início da lista
      const newMessages = [text, ...savedMessages];
      setSavedMessages(newMessages);
      setText("");

      // Atualiza o localStorage
      localStorage.setItem("savedMessages", JSON.stringify(newMessages));
    }
  };
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!token) return;
    try {
      const response = await axios.post(
        "https://bk-divulgadorpro-git-main-lucasnogueiradevs-projects.vercel.app/create-message",
        {
          name: data.name,
          content: data.content.text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        toast.success("Mensagem criada com sucesso");
        handleSaveMessage();
        handleBack();
      }
    } catch (error: any) {
      throw new Error(error.message || "Erro na requisição");
    } finally {
      setIsLoading(false);
    }
  };

  // Atualiza o texto com a última mensagem salva sempre que savedMessages mudar
  useEffect(() => {
    if (savedMessages.length > 0) {
      setText(savedMessages[0]);
    } else {
      // Defina um valor padrão caso não haja mensagens salvas
      setText(
        "🛍️ {{produto}}\n\n~de {{preco_original}}~\n💸 *{{preco}}* 🚨🚨\n💳 {{parcelamento}}\n\n👉Link {{seu_link_afiliado}}\n\nPromoção sujeita a alteração a qualquer momento"
      );
    }
  }, [savedMessages]);

  const handleVariableSelect = (variable: string) => {
    setText((prevText) => prevText + variable);
  };

  const handleBack = () => {
    if (currentStep && setCurrentStep) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <>
      <Helmet title="Disparos de promoções" />
      <section className="flex flex-col gap-4 overflow-hidden">
        <div>
          <h1 className="text-2xl font-500 tracking-tight text-foreground font-semibold flex-row items-center gap-2 flex">
            <span>Criar mensagem personalizada</span>
          </h1>
        </div>
        {/* {loading && <AppLoader fullscreen={loading} />} */}
        <div className="rounded-md bg-card px-2 overflow-auto h-screen">
          <div className="box-border rounded-md bg-card min-h-[160vh]">
            <article className="flex w-full flex-col gap-y-2 pt-2 pb-16 bg-red">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-4">
                  <Label className="py-4 ">Noma da mensagem</Label>
                </div>
                <Input
                  id="name"
                  type="name"
                  {...register("name")}
                  className="py-6 flex bg-white"
                  placeholder="Der um nome a sua mensagem"
                />
                <div className="py-4">
                  <Label className="py-4 ">Mensagem</Label>
                </div>
                <Textarea
                  // ref={textareaRef}
                  placeholder="Inserir texto"
                  className="h-[300px] w-full"
                  value={text}
                  {...register("content.text")}
                  ref={(el: HTMLTextAreaElement | null) => {
                    textareaRef.current = el;
                    register("content.text").ref(el);
                  }}
                  onChange={(e) => {
                    const newText = e.target.value;
                    handleTextChange(newText);
                    setValue("content.text", newText);
                  }}
                />

                <div className="flex flex-row justify-end pr-0 p-2 gap-2 w-full">
                  <div className="w-full flex py-2 gap-2">
                    <button
                      onClick={() => setShowEmojiPicker((prev) => !prev)}
                      className="p-2 bg-amber-400 rounded-sm h-[35px] text-black"
                      type="button"
                    >
                      <MdOutlineEmojiEmotions />
                      {showEmojiPicker && (
                        <div className="absolute top-48">
                          <EmojiPicker onEmojiClick={addEmoji} />
                        </div>
                      )}
                    </button>
                    <button
                      onClick={addBoldFormatting}
                      className="p-2 bg-blue-400 rounded-sm h-[35px] text-black"
                      type="button"
                    >
                      <MdOutlineFormatBold />
                    </button>
                    <button
                      onClick={addItalicFormatting}
                      className="p-2 bg-blue-400 rounded-sm h-[35px] text-black"
                      type="button"
                    >
                      <CgFormatItalic />
                    </button>
                    <button
                      onClick={addStrikethroughFormatting}
                      className="p-2 bg-blue-400 rounded-sm h-[35px] text-black"
                      type="button"
                    >
                      <GoStrikethrough />
                    </button>
                  </div>
                  <div className="flex flex-row justify-end py-2 gap-2 w-full text-black">
                    <VariableDropdown onSelect={handleVariableSelect} />
                  </div>
                </div>

                <div className="pb-6">
                  {Object.keys(variables).length > 0 && (
                    <CardTitle className="flex flex-col text-sm">
                      Corpo
                    </CardTitle>
                  )}
                  {Object.keys(variables).map((key) => {
                    return (
                      <>
                        {text.includes(`{{${key}}}`) ? (
                          <div className="g-4 flex flex-row items-center">
                            <Label className="p-4 text-muted-foreground">{`{{${key}}}`}</Label>
                            <Input
                              value={variables[key]}
                              onChange={(e) => {
                                handleInputChange(key, e.target.value);
                              }}
                              placeholder={`Digite o valor para ${key}`}
                            />
                          </div>
                        ) : null}
                      </>
                    );
                  })}
                </div>
                <div className="flex w-full mb-4">
                  <WhatsAppPreview text={text} />
                </div>

                <div>
                  <TestMessage message={text} />
                </div>

                <div className="flex items-center justify-end gap-4 my-6 mx-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="text-blue-500 bg-transparent"
                  >
                    Voltar 2
                  </Button>

                  <Button
                    isLoading={isLoading}
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-green-400 text-lg font-bold text-white hover:bg-green-700 py-6 rounded-lg "
                  >
                    Salvar mensagem
                  </Button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
