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

// Define your schema here
const ModelSchema = z.object({
  content: z.object({
    text: z.string().min(1, "O texto é obrigatório"),
    baseboard: z.string().optional(),
  }),
});

type FormValues = z.infer<typeof ModelSchema>;

export function FluxosWhatsApp() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // const [text, setText] = useState<string>(
  //   "🛍️ {{produto}}\n\n~de {{preco_original}}~\n💸 *{{preco}}* 🚨🚨\n💳 {{parcelamento}}\n\n👉Link {{seu_link_afiliado}}\n\nPromoção sujeita a alteração a qualquer momento"
  // );
  const [text, setText] = useState<string>("");
  // const [text, setText] = useState<string>("");
  const [variables, setVariables] = useState<{ [key: string]: string }>({});
  const [counter, setCounter] = useState(1);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(ModelSchema),
    mode: "onChange",
  });

  // const setValue = (key: string, value: any) => {
  //   // lógica para salvar valor (ex: react-hook-form)
  //   console.log(`${key}: ${value}`);
  // };

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
  const onSubmit = (data: any) => {
    console.log(data);
  };
  // const handleTextChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setText(e.target.value);
  // };

  const [savedMessages, setSavedMessages] = useState<string[]>(() => {
    // Recupera as mensagens salvas do localStorage, se existirem
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

  //   const mensagemPadrao = `
  // 🛍️ {{produto}}

  // ~de {{preco_original}}~
  // 💸 **{{preco}}** 🚨🚨
  // 💳 {{parcelamento}}

  // 👉Link {{seu_link_afiliado}}

  // Promoção sujeita a alteração a qualquer momento
  // `;

  // const [text3, setText3] = useState(mensagemPadrao);
  // const handleTextChange3 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setText3(event.target.value);
  // };

  const handleVariableSelect = (variable: string) => {
    setText((prevText) => prevText + variable);
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
          <div className="box-border rounded-md bg-card min-h-[150vh]">
            <article className="flex w-full flex-col gap-y-2 pt-2">
              <form onSubmit={handleSubmit(onSubmit)}>
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
                  onChange={(e) => handleTextChange(e.target.value)}
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

                    {/* <button
                    onClick={addCodeFormatting}
                    className="p-2 bg-blue-400 rounded-sm"
                    type="button"
                  >
                    <IoCodeSlashOutline />
                  </button> */}
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
              </form>
              <div className="pb-6">
                {Object.keys(variables).length > 0 && (
                  <CardTitle className="flex flex-col text-sm">Corpo</CardTitle>
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
              {/* <h2>Mensagens Salvas</h2>
              <ul className="message-list">
                {savedMessages.map((message, index) => (
                  <li key={index} className="message-item">
                    {message}
                  </li>
                ))}
              </ul> */}
              {/* <div className="g-4 flex flex-row items-center flex-col">
                <Label className="pb-2 pl-1">Exemplo</Label>
                <Textarea
                  // ref={textareaRef}
                  placeholder="Inserir texto"
                  className="h-32 w-full"
                  value={text}
                  {...register("content.text")}
                  ref={(el: HTMLTextAreaElement | null) => {
                    textareaRef.current = el;
                    register("content.text").ref(el);
                  }}
                  onChange={(e: { target: { value: string } }) =>
                    handleTextChange(e.target.value)
                  }
                />
              </div> */}
              <Button
                onClick={handleSaveMessage}
                className="bg-green-600 text-white"
              >
                Salvar
              </Button>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
